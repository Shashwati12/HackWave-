import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { MdEvent } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Info & image */}
      <div
        className="relative w-1/2 hidden md:flex items-start justify-start bg-cover bg-center"
        style={{ backgroundImage: "url('/your-image-path.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-16 pt-32 max-w-md text-left">
          {/* Icon */}
          <div className="mb-6 text-white text-6xl">
            <MdEvent />
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold text-white mb-4">EventOS</h1>

          {/* Shortened Description */}
          <p className="text-[#B0B3C0] text-lg mb-2">
            Centralized platform for college events – hackathons, fests,
            workshops.
          </p>
          <p className="text-[#B0B3C0] text-lg">
            Manage, track, and communicate seamlessly with real-time
            notifications.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-black relative overflow-hidden">
        {/* Floating Neon Blobs */}
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-[#36C1F6] rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-[#16D3AC] rounded-full filter blur-3xl opacity-30 animate-pulse"></div>

        <div className="relative z-10 w-96 p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-white text-center tracking-wide">
            Sign in
          </h2>

          {/* Input Fields */}
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-[#B0B3C0] focus:bg-white/20 focus:outline-none transition"
            />
            <input type="contact"
             placeholder="Contact Number"
              className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-[#B0B3C0] focus:bg-white/20 focus:outline-none transition"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-[#B0B3C0] focus:bg-white/20 focus:outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#16D3AC] hover:text-[#36C1F6] transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

  
          {/* Login Button */}
          <button className="flex items-center justify-center gap-2 bg-[#16D3AC] text-black font-bold py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition transform">
            <LogIn size={20} /> Login
          </button>

          <p className="text-xs text-[#B0B3C0] text-center">
            Don't have an account?{" "}
            <span
              className="text-[#16D3AC] hover:underline cursor-pointer"
              onClick={() => navigate("/signup")} // <-- redirect here
            >
              Sign up
            </span>
          </p>
        </div>

        {/* Extra subtle floating shapes */}
        <div className="absolute top-0 left-1/2 w-48 h-48 bg-[#657FFF] rounded-full opacity-10 blur-2xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-[#16D3AC] rounded-full opacity-10 blur-2xl animate-pulse"></div>
      </div>
    </div>
  );
}
