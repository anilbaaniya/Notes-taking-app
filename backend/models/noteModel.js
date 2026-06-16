import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A note must have title."],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "A note must have content."],
      trim: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Note must belong to user"],
    },
  },
  { timestamps: true },
);

export const Note = mongoose.model("Notes", noteSchema);
