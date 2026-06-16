import { User } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      data: users,
    },
  });
};
export const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
};

// this function is to update the user by itself
export const updateMe = async (req, res) => {
  if (req.body.password || req.body.confirmPassword) {
    return res.status(400).json({
      status: "fail",
      message:
        "This route is not for update password. Please try this route /updatePassword",
    });
  }

  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
};

export const deleteMe = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: null,
  });
};

// This function is used to update the user by admin
export const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
};
