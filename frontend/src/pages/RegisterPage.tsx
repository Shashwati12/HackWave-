"use client";

import React, { useState, useEffect } from "react";
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
  contact: string;
}

interface RegisterPageProps {
  eventId: string; // Passed from event_card when Register button clicked
}

const RegisterPage: React.FC<RegisterPageProps> = ({ eventId }) => {
  const [step, setStep] = useState(1);
  const [maxTeamSize, setMaxTeamSize] = useState(4); // default, will fetch from backend

  const [candidate, setCandidate] = useState<CandidateDetails>({
    email: "",
    mobile: "",
    firstName: "",
    lastName: "",
    organization: "",
  });

  const [team, setTeam] = useState<TeamMember[]>([]);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberContact, setNewMemberContact] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [memberLookupError, setMemberLookupError] = useState("");

  const genders = [
    { label: "Female", icon: <FaFemale /> },
    { label: "Male", icon: <FaMale /> },
    { label: "Transgender", icon: <FaTransgender /> },
    { label: "Others", icon: <FaGenderless /> },
  ];

  const domains = ["Management", "Engineering", "Arts & Science", "Medicine", "Law", "Others"];
  const graduationYears = ["2026", "2027", "2028", "2029"];
  const locations = ["Mumbai", "Pune", "Delhi", "Bangalore"];

  // Fetch max team size for this event
  useEffect(() => {
    if (!eventId) return;
    const fetchEventDetails = async () => {
      try {
        const res = await fetch(`/api/events/${eventId}`);
        if (res.ok) {
          const data = await res.json();
          // backend may return teamSize or team_size
          setMaxTeamSize(data.teamSize ?? data.team_size ?? 4);
        }
      } catch (err) {
        console.error("Failed to fetch event details", err);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  // Fetch candidate details by email
  const handleEmailBlur = async () => {
    if (!candidate.email) return;
    try {
      const res = await fetch(`/api/users/${candidate.email}`);
      if (res.ok) {
        const data = await res.json();
        setCandidate((prev) => ({ ...prev, ...data }));
      }
    } catch (err) {
      console.error("Failed to fetch user details", err);
    }
  };

  const handleCandidateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleSelect = (field: keyof CandidateDetails, value: any) => {
    setCandidate({ ...candidate, [field]: value });
  };

  // Add team member via email search
  const addTeamMember = async () => {
    setMemberLookupError("");
    if (!newMemberEmail || !newMemberContact) {
      setMemberLookupError("Email and contact are required");
      return;
    }
    if (team.length >= maxTeamSize - 1) {
      setMemberLookupError("Team is already full");
      return;
    }

    try {
      // try to use previously fetched name (from blur), otherwise fetch now
      let name = newMemberName;
      if (!name) {
        const res = await fetch(`/api/users/${newMemberEmail}`);
        if (res.ok) {
          const data = await res.json();
          name = data.firstName + " " + (data.lastName || "");
        } else {
          setMemberLookupError("No user found with this email");
          return;
        }
      }

      const newMember: TeamMember = {
        name,
        email: newMemberEmail,
        contact: newMemberContact,
      };
      setTeam((prev) => [...prev, newMember]);
      setNewMemberEmail("");
      setNewMemberContact("");
      setNewMemberName("");
    } catch (err) {
      console.error("Failed to fetch team member", err);
      setMemberLookupError("Failed to fetch member details");
    }
  };

  // lookup for new member email on blur
  const handleNewMemberEmailBlur = async () => {
    setMemberLookupError("");
    if (!newMemberEmail) return;
    try {
      const res = await fetch(`/api/users/${newMemberEmail}`);
      if (res.ok) {
        const data = await res.json();
        setNewMemberName(data.firstName + " " + (data.lastName || ""));
      } else {
        setNewMemberName("");
        setMemberLookupError("No user found with this email");
      }
    } catch (err) {
      console.error("Failed to lookup member", err);
    }
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-6">
      <div className="w-full max-w-4xl backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl p-10 space-y-8 border border-white/20">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute top-4 left-0 right-0 h-1 bg-white/20 rounded-full">
            <div
              className="h-1 bg-gradient-to-r from-[#16D3AC] to-[#36C1F6] rounded-full transition-all"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
          </div>
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                  step >= s ? "bg-[#16D3AC] text-black shadow-lg" : "bg-white/20 text-gray-400"
                }`}
              >
                {step > s ? <FaCheck /> : s}
              </div>
              <span className="text-sm mt-2">
                {s === 1 ? "Personal" : s === 2 ? "Education" : s === 3 ? "Team" : "Review"}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Candidate Info */}
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
                className="p-4 rounded-xl border border-white/30 bg-white/5 placeholder-[#B0B3C0] text-white"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={candidate.lastName}
                onChange={handleCandidateChange}
                className="p-4 rounded-xl border border-white/30 bg-white/5 placeholder-[#B0B3C0] text-white"
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={candidate.email}
                onBlur={handleEmailBlur}
                onChange={handleCandidateChange}
                className="p-4 rounded-xl border border-white/30 bg-white/5 placeholder-[#B0B3C0] text-white"
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile *"
                value={candidate.mobile}
                onChange={handleCandidateChange}
                className="p-4 rounded-xl border border-white/30 bg-white/5 placeholder-[#B0B3C0] text-white"
              />
            </div>

            <p className="font-semibold">Gender *</p>
            <div className="flex flex-wrap gap-3">
              {genders.map((g) => (
                <button
                  key={g.label}
                  type="button"
                  onClick={() => handleSelect("gender", g.label)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl border border-white/30 ${
                    candidate.gender === g.label
                      ? "bg-[#16D3AC] text-black"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {g.icon} {g.label}
                </button>
              ))}
            </div>

            <button
              onClick={nextStep}
              className="mt-6 w-full md:w-auto px-8 py-4 rounded-2xl bg-[#16D3AC] text-black font-bold"
            >
              Next
            </button>
          </div>
        )}

        {/* Step 2: Education */}
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
                className="p-4 rounded-xl border border-white/30 bg-white/5 text-white col-span-2"
              />
              <select
                name="domain"
                value={candidate.domain || ""}
                onChange={handleCandidateChange}
                className="p-4 rounded-xl border border-white/30 bg-white/5 text-white col-span-2"
              >
                <option value="">Select Domain *</option>
                {domains.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <div className="flex gap-3">
                {graduationYears.map((y) => (
                  <button
                    key={y}
                    type="button"
                    onClick={() => handleSelect("graduationYear", y)}
                    className={`px-5 py-3 rounded-xl border ${
                      candidate.graduationYear === y
                        ? "bg-[#16D3AC] text-black"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
              <select
                name="location"
                value={candidate.location || ""}
                onChange={handleCandidateChange}
                className="p-4 rounded-xl border border-white/30 bg-white/5 text-white col-span-2"
              >
                <option value="">Location</option>
                {locations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="px-8 py-4 rounded-2xl bg-white/20">Back</button>
              <button onClick={nextStep} className="px-8 py-4 rounded-2xl bg-[#16D3AC] text-black font-bold">Next</button>
            </div>
          </div>
        )}

        {/* Step 3: Team Members */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#36C1F6] to-[#657FFF]">
              Team Members
            </h2>

            {/* Leader block */}
            <div className="relative p-4 bg-white/10 rounded-xl border border-[#16D3AC]">
              <span className="absolute -top-2 -left-2 bg-[#16D3AC] text-black text-xs px-3 py-1 rounded-full">Leader</span>
              <p className="font-bold">{candidate.firstName} {candidate.lastName}</p>
              <p className="text-sm text-[#B0B3C0]">{candidate.email}</p>
              <p className="text-sm text-[#B0B3C0]">Contact: {candidate.mobile}</p>
            </div>

            {/* Members list */}
            {team.map((member, idx) => (
              <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/20">
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-[#B0B3C0]">{member.email}</p>
                <p className="text-sm text-[#B0B3C0]">Contact: {member.contact}</p>
              </div>
            ))}

            {/* Add new member */}
            {team.length < maxTeamSize - 1 && (
              <div className="flex flex-col md:flex-row gap-3 mt-2">
                <input
                  type="email"
                  placeholder="Member Email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  onBlur={handleNewMemberEmailBlur}
                  className="flex-1 p-4 rounded-xl border border-white/30 bg-white/5 text-white"
                />
                {/* show fetched name preview or error */}
                <div className="flex flex-col justify-center">
                  {newMemberName && <span className="text-sm text-[#B0B3C0]">Name: {newMemberName}</span>}
                  {memberLookupError && <span className="text-sm text-red-400">{memberLookupError}</span>}
                </div>
                <input
                  type="text"
                  placeholder="Contact Number"
                  value={newMemberContact}
                  onChange={(e) => setNewMemberContact(e.target.value)}
                  className="flex-1 p-4 rounded-xl border border-white/30 bg-white/5 text-white"
                />
                <button onClick={addTeamMember} className="px-6 py-4 rounded-2xl bg-[#16D3AC] text-black font-bold">
                  Add
                </button>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="px-8 py-4 rounded-2xl bg-white/20">Back</button>
              <button onClick={nextStep} className="px-8 py-4 rounded-2xl bg-[#16D3AC] text-black font-bold">Next</button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#36C1F6] to-[#657FFF]">
              Review & Submit
            </h2>

            {/* Leader */}
            <div className="p-4 bg-white/10 rounded-xl border border-[#16D3AC]">
              <span className="bg-[#16D3AC] text-black text-xs px-3 py-1 rounded-full">Leader</span>
              <p className="font-bold">{candidate.firstName} {candidate.lastName}</p>
              <p className="text-sm text-[#B0B3C0]">{candidate.email}</p>
              <p className="text-sm text-[#B0B3C0]">Contact: {candidate.mobile}</p>
            </div>

            {/* Members */}
            {team.map((m, i) => (
              <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/20">
                <p className="font-semibold">{m.name}</p>
                <p className="text-sm text-[#B0B3C0]">{m.email}</p>
                <p className="text-sm text-[#B0B3C0]">Contact: {m.contact}</p>
              </div>
            ))}

            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="px-8 py-4 rounded-2xl bg-white/20">Back</button>
              <button
                type="button"
                onClick={() => alert("Registration Completed!")}
                className="px-8 py-4 rounded-2xl bg-[#16D3AC] text-black font-bold"
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