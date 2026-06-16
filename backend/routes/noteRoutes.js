import express from "express";
import {
  createNote,
  deleteNote,
  getAllNote,
  getNote,
  updateNote,
  getMyNotes,
} from "../controllers/noteController.js";
import { protect } from "../controllers/authController.js";

export const noteRoute = express.Router();

noteRoute.route("/").get(protect, getAllNote).post(protect, createNote);
noteRoute.route("/my-notes").get(protect, getMyNotes);
noteRoute
  .route("/:id")
  .get(getNote)
  .patch(protect, updateNote)
  .delete(protect, deleteNote);
