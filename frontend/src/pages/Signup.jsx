import { NavLink } from "react-router-dom";
import SignupHeader from "../features/signUp/SignupHeader";
import SignUpForm from "../features/signUp/SignUpForm";

export default function Signup() {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-10 border border-gray-100">
          {/* Header */}
          <SignupHeader />
          {/* Form */}
          <SignUpForm />
          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="inline">Already have an account? </p>
            <NavLink
              to="/login"
              className="text-amber-600 font-semibold hover:text-amber-700 transition"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
