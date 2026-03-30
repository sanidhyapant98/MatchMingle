// src/components/AuthForm.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../redux/authSlice";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "male",
  age: ""
};

export default function AuthForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState(INITIAL_FORM);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (isLogin) {
      dispatch(login({ email: form.email, password: form.password }));
    } else {
      try {
        await dispatch(signup(form)).unwrap();
        setSuccess("Account created successfully! Please log in.");
        setForm(INITIAL_FORM);
        setIsLogin(true);
      } catch (err) {
        // Error is handled by Redux
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full max-w-[450px] bg-white/65 backdrop-blur-xl border border-white/30 shadow-lg rounded-2xl p-8">

      {/* Tabs */}
      <div className="flex mb-8">
        <button
          onClick={() => {
            setIsLogin(true);
            setSuccess("");
            setForm((prev) => ({ ...prev, email: "", password: "" }));
          }}
          className={`flex-1 pb-4 border-b-2 font-semibold transition-all ${isLogin ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-black"}`}
        >
          Log In
        </button>
        <button
          onClick={() => {
            setIsLogin(false);
            setSuccess("");
          }}
          className={`flex-1 pb-4 border-b-2 font-semibold transition-all ${!isLogin ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-black"}`}
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="John"
                className="w-full h-11 mt-1 px-3 rounded-lg border bg-[#FDFBF7]"
                value={form.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                className="w-full h-11 mt-1 px-3 rounded-lg border bg-[#FDFBF7]"
                value={form.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )}

        {/* Email */}
        <div>
          <label className="text-sm font-medium">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full h-11 mt-1 px-3 rounded-lg border bg-[#FDFBF7]"
            value={form.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Password */}
        <div>
          <div className="flex justify-between">
            <label className="text-sm font-medium">Password</label>
            {isLogin && <span className="text-primary text-sm cursor-pointer">Forgot?</span>}
          </div>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className="w-full h-11 mt-1 px-3 rounded-lg border bg-[#FDFBF7]"
            value={form.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {!isLogin && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Gender</label>
              <select
                name="gender"
                className="w-full h-11 mt-1 px-3 rounded-lg border bg-[#FDFBF7]"
                value={form.gender}
                onChange={handleInputChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <input
                type="number"
                name="age"
                placeholder="21"
                min="1"
                max="120"
                className="w-full h-11 mt-1 px-3 rounded-lg border bg-[#FDFBF7]"
                value={form.age}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        )}

        {/* Error/Success */}
        {error && <p className="text-red-500 text-sm py-1">{error}</p>}
        {success && <p className="text-green-600 text-sm py-1 font-medium">{success}</p>}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full h-12 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-2"
        >
          {loading ? "Processing..." : isLogin ? "Access Network →" : "Create Account"}
        </button>
      </form>

      {/* Divider */}
      <div className="mt-6 flex items-center">
        <div className="grow border-t"></div>
        <span className="mx-3 text-sm text-gray-400">Or continue with</span>
        <div className="grow border-t"></div>
      </div>

      {/* Social */}
      <div className="flex gap-3 mt-5">
        <button className="flex-1 h-11 border rounded-lg hover:bg-gray-50 transition-colors">Google</button>
        <button className="flex-1 h-11 border rounded-lg hover:bg-gray-50 transition-colors">Apple</button>
      </div>
    </div>
  );
}