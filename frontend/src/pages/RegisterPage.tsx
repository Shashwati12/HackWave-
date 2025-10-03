"use client";

import React, { useState } from "react";
import { FaFemale, FaMale, FaTransgender, FaGenderless, FaCheck } from "react-icons/fa";

interface CandidateDetails {
  email: string;
  mobile: string;
  firstName: string;
  lastName: string;
  gender?: string;
  organization: string;
  domain?: string;
  graduationYear?: string;
  location?: string;
}

interface TeamMember {
  name: string;
  email: string;
  role?: string;
}

const RegisterPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [candidate, setCandidate] = useState<CandidateDetails>({
    email: "",
    mobile: "",
    firstName: "",
    lastName: "",
    organization: "",
  });
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "" });

  const genders = [
    { label: "Female", icon: <FaFemale /> },
    { label: "Male", icon: <FaMale /> },
    { label: "Transgender", icon: <FaTransgender /> },
    { label: "Others", icon: <FaGenderless /> },
  ];

  const domains = ["Management", "Engineering", "Arts & Science", "Medicine", "Law", "Others"];
  const graduationYears = ["2026", "2027", "2028", "2029"];
  const locations = ["Mumbai", "Pune", "Delhi", "Bangalore"];

  const handleCandidateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleSelect = (field: keyof CandidateDetails, value: any) => {
    setCandidate({ ...candidate, [field]: value });
  };

  const addTeamMember = () => {
    if (!newMember.name || !newMember.email || !newMember.role || team.length >= 3) return;
    setTeam([...team, { ...newMember }]);
    setNewMember({ name: "", email: "", role: "" });
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-6">
      <div className="w-full max-w-4xl backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl p-10 space-y-8 border border-white/20">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute top-4 left-0 right-0 h-1 bg-white/20 rounded-full">
            <div
              className="h-1 bg-gradient-to-r from-[#16D3AC] to-[#36C1F6] rounded-full transition-all"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            ></div>
          </div>
          {[1, 2, 3].map((s) => (
            <div key={s} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                  step >= s ? "bg-[#16D3AC] text-black shadow-lg" : "bg-white/20 text-gray-400"
                }`}
              >
                {step > s ? <FaCheck /> : s}
              </div>
              <span className="text-sm mt-2">{s === 1 ? "Personal" : s === 2 ? "Education" : "Team"}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#36C1F6] to-[#657FFF]">
              Candidate Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                value={candidate.firstName}
                onChange={handleCandidateChange}
                className="p-4 rounded-xl border border-white/30 bg-white/5 placeholder-[#B0B3C0] text-white focus:ring-2 focus:ring-[#36C1F6] transition"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={candidate.lastName}
                onChange={handleCandidateChange}
                className="p-4 rounded-xl border border-white/30 bg-white/5 placeholder-[#B0B3C0] text-white focus:ring-2 focus:ring-[#36C1F6] transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={candidate.email}
                onChange={handleCandidateChange}
                className="p-4 rounded-xl border border-white/30 bg-white/5 placeholder-[#B0B3C0] text-white focus:ring-2 focus:ring-[#36C1F6] transition"
                required
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile *"
                value={candidate.mobile}
                onChange={handleCandidateChange}
                className="p-4 rounded-xl border border-white/30 bg-white/5 placeholder-[#B0B3C0] text-white focus:ring-2 focus:ring-[#36C1F6] transition"
                required
              />
            </div>

            <p className="font-semibold">Gender *</p>
            <div className="flex flex-wrap gap-3">
              {genders.map((g) => (
                <button
                  key={g.label}
                  type="button"
                  onClick={() => handleSelect("gender", g.label)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/30 transition-all ${
                    candidate.gender === g.label
                      ? "bg-[#16D3AC] text-black shadow-lg"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {g.icon} {g.label}
                </button>
              ))}
            </div>

            <button
              onClick={nextStep}
              className="mt-6 w-full md:w-auto px-8 py-4 rounded-2xl bg-[#16D3AC] text-black font-bold hover:scale-105 transition"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Education Info */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#36C1F6] to-[#657FFF]">
              Education & Organization
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="organization"
                placeholder="Organization / Institute *"
                value={candidate.organization}
                onChange={handleCandidateChange}
                className="p-4 rounded-xl border border-white/30 bg-white/5 placeholder-[#B0B3C0] text-white focus:ring-2 focus:ring-[#36C1F6] transition col-span-2"
                required
              />
              <select
                name="domain"
                value={candidate.domain || ""}
                onChange={handleCandidateChange}
                className="p-4 rounded-xl border border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-[#36C1F6] transition col-span-2"
              >
                <option value="">Select Domain *</option>
                {domains.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              <select
                name="graduationYear"
                value={candidate.graduationYear || ""}
                onChange={handleCandidateChange}
                className="p-4 rounded-xl border border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-[#36C1F6] transition"
              >
                <option value="">Graduation Year</option>
                {graduationYears.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <select
                name="location"
                value={candidate.location || ""}
                onChange={handleCandidateChange}
                className="p-4 rounded-xl border border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-[#36C1F6] transition col-span-2"
              >
                <option value="">Location</option>
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="px-8 py-4 rounded-2xl bg-white/20 hover:bg-white/30 transition"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="px-8 py-4 rounded-2xl bg-[#16D3AC] text-black font-bold hover:scale-105 transition"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Team Members */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#36C1F6] to-[#657FFF]">
              Team Members
            </h2>

            {/* Team list */}
            {team.length > 0 && (
              <div className="space-y-3">
                {team.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/20 shadow-sm"
                  >
                    <div>
                      <p className="text-white font-semibold">{member.name}</p>
                      <p className="text-[#B0B3C0] text-sm">{member.email}</p>
                      {member.role && <p className="text-[#B0B3C0] text-sm">Role: {member.role}</p>}
                    </div>
                    <FaCheck className="text-[#16D3AC]" />
                  </div>
                ))}
              </div>
            )}

            {/* Add new member */}
            {team.length < 3 && (
              <div className="flex flex-col md:flex-row gap-3 mt-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="flex-1 p-4 rounded-xl border border-white/30 bg-white/5 placeholder-[#B0B3C0] text-white focus:ring-2 focus:ring-[#36C1F6] transition"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="flex-1 p-4 rounded-xl border border-white/30 bg-white/5 placeholder-[#B0B3C0] text-white focus:ring-2 focus:ring-[#36C1F6] transition"
                />
                <select
                  value={newMember.role || ""}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  className="flex-1 p-4 rounded-xl border border-white/30 bg-white/5 text-white focus:ring-2 focus:ring-[#36C1F6] transition"
                >
                  <option value="">Select Role</option>
                  <option value="Lead">Lead</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                </select>
                <button
                  type="button"
                  onClick={addTeamMember}
                  className="px-6 py-4 rounded-2xl bg-[#16D3AC] text-black font-bold hover:scale-105 transition"
                >
                  Add
                </button>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button
                onClick={prevStep}
                className="px-8 py-4 rounded-2xl bg-white/20 hover:bg-white/30 transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => {
                  if (team.length === 0) {
                    alert("Add at least one team member!");
                    return;
                  }
                  alert("Registration Completed!");
                }}
                className="px-8 py-4 rounded-2xl bg-[#16D3AC] text-black font-bold hover:scale-105 transition"
              >
                Submit
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RegisterPage;