import LoginHeader from "../features/login/LoginHeader";
import LoginForm from "../features/login/LoginForm";
import { NavLink } from "react-router";

export default function Login() {
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-10 border border-gray-100">
          {/* Header */}
          <LoginHeader />
          {/* Form */}
          <LoginForm />

          <div className="mt-6 text-center text-sm text-gray-600">
            <p className="inline">Don&apos;t have an account? </p>
            <NavLink
              to="/signup"
              className="text-amber-600 font-semibold  hover:text-amber-700 transition"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
