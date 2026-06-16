import { useState, useEffect } from "react";
import { getMyNotes } from "../api/notesApi";
import Note from "../features/notes/Note";
import NoteNavBar from "../features/notes/NoteNavBar";
import CreateNote from "./CreateNote";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await getMyNotes();
        setNotes(response.data.data.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    getNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 relative">
      {/* Main Content */}
      <div
        className={`max-w-6xl mx-auto transition-all duration-300 ${
          isNew ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        {/* Top Navbar */}
        <NoteNavBar />

        {/* Add Note Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsNew(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition duration-300"
          >
            + Add Note
          </button>
        </div>

        {/* Notes Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <Note note={note} setNotes={setNotes} key={note._id} />
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {isNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6">
            {/* Close Button */}
            <button
              onClick={() => setIsNew(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>

            {/* Create Note Component */}
            <CreateNote setIsNew={setIsNew} setNotes={setNotes} />
          </div>
        </div>
      )}
    </div>
  );
}
