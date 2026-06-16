import { useState } from "react";
import { createMyNote } from "../api/notesApi";

export default function CreateNote({ setIsNew, setNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createNote = async (e) => {
    e.preventDefault();
    try {
      const response = await createMyNote({ title, content });
      console.log(response);
      const newNote = response.data.data.data;
      if (response.status === 201) {
        setNotes((notes) => [newNote, ...notes]);
        setIsNew(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8 md:p-10">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Create New Note
          </h1>
          <p className="text-gray-500 mt-2">
            Write down your thoughts and ideas.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={createNote}>
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              id="title"
              placeholder="Enter note title"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />
          </div>

          {/* Content Input */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              id="content"
              rows="8"
              placeholder="Write your note content here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none resize-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
}
