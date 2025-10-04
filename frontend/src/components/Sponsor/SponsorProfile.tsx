import { useState } from "react";
import { User, Mail, Save, X, Camera, Award, DollarSign, TrendingUp, Building, Phone, Globe, Edit } from "lucide-react";
import { Background } from "../ShootingStar";
interface SponsorData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Sponsor";
  company_name: string;
  sponsorship_tier: string;
  website: string;
  date_joined: string;
  image_url: string;
}

export default function SponsorProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [sponsorData, setSponsorData] = useState<SponsorData>({
    id: "4",
    name: "Jennifer Wilson",
    email: "jennifer.wilson@techcorp.com",
    phone: "+1 (555) 987-6543",
    role: "Sponsor",
    company_name: "TechCorp Industries",
    sponsorship_tier: "Gold",
    website: "https://techcorp.com",
    date_joined: "2023-01-10",
    image_url: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400",
  });

  const [editedData, setEditedData] = useState(sponsorData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(sponsorData);
  };

  const handleSave = () => {
    setSponsorData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(sponsorData);
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const stats = [
    { label: "Events Sponsored", value: "32", icon: Award, color: "from-[#A855F7] to-[#EC4899]" },
    { label: "Total Investment", value: "$125K", icon: DollarSign, color: "from-[#EC4899] to-[#F59E0B]" },
    { label: "Brand Reach", value: "50K+", icon: TrendingUp, color: "from-[#F59E0B] to-[#A855F7]" },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden overflow-y-auto">
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-[#A855F7] to-[#EC4899] bg-clip-text text-transparent mb-2">
                Sponsor Dashboard
              </h1>
              <p className="text-xl text-[#B0B3C0]">Manage your sponsorships and partnerships</p>
            </div>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#A855F7]/30 transition-all duration-300 hover:scale-105"
              >
                <Edit className="w-5 h-5" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-[#F59E0B] text-black font-semibold rounded-xl hover:bg-white transition-all duration-300 hover:scale-105"
                >
                  <Save className="w-5 h-5" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-[#B0B3C0] text-sm">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#EC4899] flex items-center justify-center shadow-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Sponsor Information</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-gradient-to-br from-[#A855F7] to-[#EC4899] shadow-2xl shadow-[#A855F7]/30">
                  <img
                    src={editedData.image_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <button className="absolute inset-0 bg-black/60 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-8 h-8 text-white" />
                  </button>
                )}
              </div>
              <div className="text-center">
                <div className="px-6 py-2 bg-gradient-to-r from-[#A855F7] to-[#EC4899] rounded-lg inline-flex items-center gap-2">
                  <Award className="w-4 h-4 text-white" />
                  <span className="text-white font-bold text-sm">{sponsorData.sponsorship_tier} Sponsor</span>
                </div>
                <p className="text-[#B0B3C0] text-sm mt-3">Premium Partnership</p>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#B0B3C0] mb-2">
                    <User className="w-4 h-4 text-[#A855F7]" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#A855F7] focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium">
                      {sponsorData.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#B0B3C0] mb-2">
                    <Building className="w-4 h-4 text-[#EC4899]" />
                    Company Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="company_name"
                      value={editedData.company_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium">
                      {sponsorData.company_name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#B0B3C0] mb-2">
                    <Mail className="w-4 h-4 text-[#F59E0B]" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                      {sponsorData.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#B0B3C0] mb-2">
                    <Phone className="w-4 h-4 text-[#A855F7]" />
                    Phone Number
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={editedData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#A855F7] focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                      {sponsorData.phone}
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#B0B3C0] mb-2">
                    <Award className="w-4 h-4 text-[#EC4899]" />
                    Sponsorship Tier
                  </label>
                  {isEditing ? (
                    <select
                      name="sponsorship_tier"
                      value={editedData.sponsorship_tier}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent transition-all appearance-none"
                    >
                      <option value="Bronze" className="bg-[#0a0a1a]">Bronze</option>
                      <option value="Silver" className="bg-[#0a0a1a]">Silver</option>
                      <option value="Gold" className="bg-[#0a0a1a]">Gold</option>
                      <option value="Platinum" className="bg-[#0a0a1a]">Platinum</option>
                      <option value="Diamond" className="bg-[#0a0a1a]">Diamond</option>
                    </select>
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                      {sponsorData.sponsorship_tier}
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#B0B3C0] mb-2">
                    <Globe className="w-4 h-4 text-[#F59E0B]" />
                    Website
                  </label>
                  {isEditing ? (
                    <input
                      type="url"
                      name="website"
                      value={editedData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                      {sponsorData.website}
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-[#B0B3C0] mb-2">
                      <Camera className="w-4 h-4 text-[#A855F7]" />
                      Profile Image URL
                    </label>
                    <input
                      type="url"
                      name="image_url"
                      value={editedData.image_url}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#A855F7] focus:border-transparent transition-all"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}