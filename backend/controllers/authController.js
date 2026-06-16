import jwt from "jsonwebtoken";
import crypto from "crypto";
import { promisify } from "util";
import { User } from "../models/userModel.js";
import { sendEmails } from "../email.js";

const signInToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signInToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    createSendToken(newUser, 201, res);
  } catch (error) {
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({
        status: "fail",
        message:
          "Email already exists. Please use a different email or log in.",
      });
    }
    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        status: "fail",
        message: messages.join(", "),
      });
    }
    res.status(500).json({
      status: "fail",
      message: "An error occurred during signup. Please try again.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email and password exist
    if (!email || !password) {
      return res
        .status(400)
        .json({
          status: "fail",
          message: "Please provide email and password.",
        });
    }

    // check if user exist and password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect email or password.",
      });
    }

    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "An error occurred during login. Please try again.",
    });
  }
};

export const protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "You are not logged in! Please log in to get access.",
    });
  }
  // 2)Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3)Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return res.status(401).json({
      status: "fail",
      message: "The user belonging to this token does no longer exists.",
    });
  }
  // 4) Check if user changed the password after jwt issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return res.status(401).json({
      status: "fail",
      message: "User recently changed password! Please log in again.",
    });
  }
  req.user = currentUser;
  // Grant access to protected route
  next();
};

export const forgotPassword = async (req, res) => {
  // 1) Get User based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  // console.log(user);

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "The user with this email doesn't exist.",
    });
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to the user's email
  const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to ${resetURL}.\n If you don't forgot your password simply ignore this email!`;

  try {
    await sendEmails({
      email: user.email,
      subject: "Your password reset token (valid for 10 minutes).",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    res.status(200).json({
      status: "fail",
      message: "There is an error sending the email. Please try again later!",
    });
  }
};
export const resetPassword = async (req, res) => {
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .json({ status: "fail", message: "Token is invalid or has expired!" });
  }

  // 2) If token has not expired and user exists, set the new password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();

  // 3) Update the changedPasswordAt property for the user
  // 4) Log the user in, send JWT

  createSendToken(user, 200, res);

  // const token = signInToken(user._id);

  // res.status(200).json({
  //   status: "success",
  //   token,
  // });
};

export const updatePassword = async (req, res) => {
  // Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "Please login first to update the password.",
    });
  }

  // Check if POSTed current password is correct
  const isCorrect = await user.correctPassword(
    req.body.currentPassword,
    user.password,
  );

  if (!isCorrect) {
    return res.status(401).json({
      status: "fail",
      message: "Your current password is incorrect.",
    });
  }

  // If so, update password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  await user.save();

  // Login user, send JWT
  createSendToken(user, 200, res);

  // const token = signInToken(user._id);
  // res.status(200).json({
  //   status: "success",
  //   token,
  // });
};
