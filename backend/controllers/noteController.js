import { Note } from "../models/noteModel.js";

export const createNote = async (req, res) => {
  const note = await Note.create({ ...req.body, user: req.user._id });
  res.status(201).json({
    status: "success",
    data: {
      data: note,
    },
  });
};
export const getAllNote = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json({
    status: "success",
    result: notes.length,
    data: {
      data: notes,
    },
  });
};
export const getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      data: note,
    },
  });
};
export const updateNote = async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      data: note,
    },
  });
};
export const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
  });
};

export const getMyNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.status(200).json({
    status: "success",
    result: notes.length,
    data: {
      data: notes,
    },
  });
};
