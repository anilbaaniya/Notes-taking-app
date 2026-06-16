import { useState } from "react";
import { deleteMyNote } from "../../api/notesApi";
import UpdateNote from "../../pages/UpdateNote";

export default function Note({ note, setNotes }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await deleteMyNote(note._id);
      if (response.status === 204) {
        console.log("Deleted");
        setNotes((notes) => notes.filter((el) => el._id !== note._id));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div
      key={note._id}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 p-6 flex flex-col"
    >
      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">
        {note.title}
      </h2>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed grow">
        {note.content}
      </p>

      {/* Date */}
      <p className="text-xs text-gray-400 mt-4">{note.date}</p>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => setIsUpdate(true)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
        >
          Update
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 py-2 rounded-lg font-medium transition"
        >
          Delete
        </button>
      </div>
      {isUpdate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6">
            {/* Close Button */}
            <button
              onClick={() => setIsUpdate(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>

            {/* Create Note Component */}
            <UpdateNote
              setNotes={setNotes}
              noteId={note._id}
              setIsUpdate={setIsUpdate}
              currentTitle={note.title}
              currentContent={note.content}
            />
          </div>
        </div>
      )}
    </div>
  );
}
