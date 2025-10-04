import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { MdEvent } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import toast from "react-hot-toast";
import api from "../lib/api";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post("/auth/login", formData);

      if (response?.data) {
        console.log(response.data)
        login(response.data);
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid response from server.");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section: Brand Info */}
      <div
        className="relative w-1/2 hidden md:flex items-start justify-start bg-cover bg-center"
        style={{ backgroundImage: "url('/your-image-path.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 px-16 pt-32 max-w-md text-left">
          <div className="mb-6 text-white text-6xl">
            <MdEvent />
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-4">EventOS</h1>
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

      {/* Right Section: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-black relative overflow-hidden">
        {/* Animated Blobs */}
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-[#36C1F6] rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-[#16D3AC] rounded-full filter blur-3xl opacity-30 animate-pulse"></div>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-96 p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col gap-6"
        >
          <h2 className="text-3xl font-bold text-white text-center tracking-wide">
            Sign in
          </h2>

          {/* Input Fields */}
          <div className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-[#B0B3C0] focus:bg-white/20 focus:outline-none transition"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-[#B0B3C0] focus:bg-white/20 focus:outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#16D3AC] hover:text-[#36C1F6] transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`flex items-center justify-center gap-2 bg-[#16D3AC] text-black font-bold py-3 rounded-xl shadow-lg transition transform hover:scale-105 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : <><LogIn size={20} /> Login</>}
          </button>

          {/* Signup Redirect */}
          <p className="text-xs text-[#B0B3C0] text-center">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#16D3AC] hover:underline cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </form>

        {/* Floating Decorative Shapes */}
        <div className="absolute top-0 left-1/2 w-48 h-48 bg-[#657FFF] rounded-full opacity-10 blur-2xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-[#16D3AC] rounded-full opacity-10 blur-2xl animate-pulse"></div>
      </div>
    </div>
  );
}
