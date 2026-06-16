import { useEffect, useState } from "react";
import { updateMyNote } from "../api/notesApi";
export default function CreateNote({
  noteId,
  setIsUpdate,
  setNotes,
  currentTitle,
  currentContent,
}) {
  const [title, setTitle] = useState(currentTitle);
  const [content, setContent] = useState(currentContent);

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const response = await updateMyNote({ title, content }, noteId);
      console.log(response);
      const updatedNote = response.data.data.data;
      if (response.status === 200) {
        setNotes((notes) =>
          notes.map((note) => (note._id === noteId ? updatedNote : note)),
        );
        setIsUpdate(false);
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
            Update Your Note
          </h1>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={updateNote}>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none resize-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
          >
            Update Note
          </button>
        </form>
      </div>
    </div>
  );
}
