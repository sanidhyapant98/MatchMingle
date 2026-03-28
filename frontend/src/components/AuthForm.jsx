// src/components/AuthForm.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";

export default function AuthForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div className="w-full max-w-[400px] bg-white/65 backdrop-blur-xl border border-white/30 shadow-lg rounded-2xl p-8">

      {/* Tabs */}
      <div className="flex border-b mb-8">
        <button className="flex-1 pb-4 border-b-2 border-primary text-primary font-semibold">
          Log In
        </button>
        <button className="flex-1 pb-4 text-gray-400 hover:text-black">
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Work Email</label>
          <input
            type="email"
            placeholder="you@company.com"
            className="w-full h-12 mt-1 px-3 rounded-lg border bg-[#FDFBF7]"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between">
            <label className="text-sm font-medium">Password</label>
            <span className="text-primary text-sm cursor-pointer">
              Forgot?
            </span>
          </div>

          <input
            type="password"
            placeholder="••••••••"
            className="w-full h-12 mt-1 px-3 rounded-lg border bg-[#FDFBF7]"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full h-12 bg-primary text-white rounded-lg font-semibold"
        >
          {loading ? "Loading..." : "Access Network →"}
        </button>
      </form>

      {/* Divider */}
      <div className="mt-6 flex items-center">
        <div className="grow border-t"></div>
        <span className="mx-3 text-sm text-gray-400">
          Or continue with
        </span>
        <div className="grow border-t"></div>
      </div>

      {/* Social */}
      <div className="flex gap-3 mt-5">
        <button className="flex-1 h-11 border rounded-lg">
          Google
        </button>
        <button className="flex-1 h-11 border rounded-lg">
          Apple
        </button>
      </div>
    </div>
  );
}