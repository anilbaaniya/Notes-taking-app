import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt, { hash } from "bcrypt";
import { type } from "os";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A user must have name."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "A user must have email."],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "A user must have password."],
      minLength: [8, "The length of password should be at least 8 character."],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "A user must have confirm password."],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Password are not same",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  // only run this function if password is actually modified

  if (!this.isModified("password")) return;

  // Hash the password with the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;
});

userSchema.pre("save", async function () {
  // Run only if password was modified and document is not new
  if (!this.isModified("password") || this.isNew) {
    return;
  }
  // Set changedPasswordAt slightly in the past
  this.changedPasswordAt = Date.now() - 1000;
});

userSchema.pre(/^find/, async function () {
  this.find({ active: { $ne: false } });
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTtimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp =
      parseInt(this.passwordChangedAt.getTime() / 1000, 10) - 1;
    console.log(changedTimeStamp, JWTtimeStamp);
    return changedTimeStamp > JWTtimeStamp;
  }
  return false; // if not changed
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetTokenExpires = Date.now() + 60 * 10 * 1000;

  return resetToken;
};
export const User = mongoose.model("User", userSchema);
