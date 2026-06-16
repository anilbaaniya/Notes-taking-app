import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
export default function NoteNavBar() {
  return (
    <div className="bg-white rounded-2xl shadow-md px-6 py-4 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* App Title */}

      <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>

      {/* User Profile + Logout */}
      <div className="flex items-center gap-4">
        {/* User Icon */}
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
          <FaUserCircle className="text-3xl text-blue-600" />
          <span className="text-gray-700 font-medium">Anil</span>
        </div>

        {/* Logout Button */}
        <button className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-full font-medium transition">
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </div>
  );
}
