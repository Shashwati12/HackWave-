import { useState } from "react";
import { Eye, EyeOff, UserPlus, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"organizer" | "attendee" | "vendor" | "sponsor">("attendee");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    organizerDepartment: "",
    organizerID: "",
    attendeeRoll: "",
    attendeeDeptYear: "",
    vendorCompany: "",
    vendorCategory: "",
    sponsorCompany: "",
    sponsorContact: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form submitted:", { role, ...form });
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Left Side */}
      <div className="relative w-1/2 hidden md:flex items-start justify-start bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 px-16 pt-32 max-w-md text-left">
          <div className="mb-6 text-[#16D3AC] text-6xl">
            <Calendar />
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#36C1F6] to-[#657FFF] bg-clip-text text-transparent mb-4">
            EventOS
          </h1>
          <p className="text-[#B0B3C0] text-lg mb-2">
            Sign up to manage, register, or participate in college events seamlessly.
          </p>
          <p className="text-[#B0B3C0] text-lg">
            Role-based dashboards for Organizers, Attendees, Vendors, and Sponsors.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative overflow-hidden">
        {/* Floating Blobs */}
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-[#36C1F6] rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-[#16D3AC] rounded-full filter blur-3xl opacity-20 animate-pulse"></div>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-[520px] max-w-[90%] p-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col gap-6"
        >
          <h2 className="text-3xl font-bold text-center tracking-wide bg-gradient-to-r from-[#36C1F6] to-[#657FFF] bg-clip-text text-transparent">
            Create Account
          </h2>

          {/* Role Dropdown with Title */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">Select Your Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as any)}
              className="px-4 py-3 rounded-lg bg-white/10 text-neutral-400 focus:bg-white/20 focus:outline-none transition"
            >
              <option value="organizer">Organizer</option>
              <option value="attendee">Attendee</option>
              <option value="vendor">Vendor</option>
              <option value="sponsor">Sponsor</option>
            </select>
          </div>

          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-[#B0B3C0] focus:bg-white/20 focus:outline-none transition"
            required
          />

          {/* Email & Phone */}
          <div className="flex gap-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-[#B0B3C0] focus:bg-white/20 focus:outline-none transition"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-[#B0B3C0] focus:bg-white/20 focus:outline-none transition"
            />
          </div>

          {/* Password & Confirm Password */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-[#B0B3C0] focus:bg-white/20 focus:outline-none transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#16D3AC] hover:text-[#36C1F6] transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative flex-1">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder-[#B0B3C0] focus:bg-white/20 focus:outline-none transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#16D3AC] hover:text-[#36C1F6] transition"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Role-specific Fields */}
          {role === "organizer" && (
            <div className="flex flex-col gap-4 bg-white/10 p-4 rounded-xl border border-white/20">
              <input
                type="text"
                name="organizerDepartment"
                placeholder="Department / College"
                value={form.organizerDepartment}
                onChange={handleChange}
                className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-[#B0B3C0] focus:bg-white/20 focus:outline-none transition"
              />
              <input
                type="text"
                name="organizerID"
                placeholder="Staff / Faculty ID"
                value={form.organizerID}
                onChange={handleChange}
                className="px-4 py-3 rounded-lg bg-white/10 text-white placeholder-[#B0B3C0] focus:bg-white/20 focus:outline-none transition"
              />
            </div>
          )}

          {/* Sign Up Button */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#16D3AC] text-black font-bold py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition transform"
          >
            <UserPlus size={20} /> Sign Up
          </button>

          <p className="text-xs text-[#B0B3C0] text-center">
            Already have an account?{" "}
            <span
              className="text-[#16D3AC] hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
