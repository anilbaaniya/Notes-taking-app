import express from "express";
import {
  forgotPassword,
  login,
  protect,
  resetPassword,
  signup,
  updatePassword,
} from "../controllers/authController.js";
import {
  deleteMe,
  getAllUsers,
  getUser,
  updateMe,
} from "../controllers/userController.js";

export const userRoute = express.Router();

userRoute.route("/signup").post(signup);
userRoute.route("/login").post(login);

userRoute.route("/forgotPassword").post(forgotPassword);
userRoute.route("/resetPassword/:token").patch(resetPassword);
userRoute.route("/updateMyPassword").patch(protect, updatePassword);

userRoute.route("/updateMe").patch(protect, updateMe);
userRoute.route("/deleteMe").patch(protect, deleteMe);

userRoute.route("/").get(protect, getAllUsers);
userRoute.route("/:id").get(protect, getUser);
