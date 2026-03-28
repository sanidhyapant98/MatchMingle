// src/pages/AuthPage.jsx
import AuthForm from "../components/AuthForm";

export default function AuthPage() {
  return (
    <div className="flex h-screen w-full bg-[#FDFBF7] font-sans">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 p-12 flex-col justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold"></h1>

        {/* Content */}
        <div>
          <h2 className="text-4xl font-bold mb-4">
            MatchMingle
          </h2>
          <p className="text-gray-500">
            Where high-signal professional networking meets modern matchmaking.
          </p>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400">
          © 2025 MatchMingle Inc.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <AuthForm />
      </div>
    </div>
  );
}