import { useState } from "react";
import { User, Mail, Calendar, CreditCard as Edit, Save, X, Camera, Sparkles, TrendingUp, Users} from "lucide-react";
import { Background } from "../ShootingStar";

interface HostData {
  id: string;
  name: string;
  email: string;
  gender: string;
  role: "Host";
  date_of_birth: string;
  image_url: string;
}

export default function HostProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [hostData, setHostData] = useState<HostData>({
    id: "2",
    name: "Sarah Martinez",
    email: "sarah.martinez@example.com",
    gender: "female",
    role: "Host",
    date_of_birth: "1995-08-22",
    image_url: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400",
  });

  const [editedData, setEditedData] = useState(hostData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(hostData);
  };

  const handleSave = () => {
    setHostData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(hostData);
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const stats = [
    { label: "Events Hosted", value: "24", icon: Sparkles, color: "from-[#36C1F6] to-[#657FFF]" },
    { label: "Total Attendees", value: "2.3K", icon: Users, color: "from-[#657FFF] to-[#16D3AC]" },
    { label: "Success Rate", value: "98%", icon: TrendingUp, color: "from-[#16D3AC] to-[#36C1F6]" },
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
              <h1 className="text-5xl font-bold bg-gradient-to-r from-[#36C1F6] to-[#657FFF] bg-clip-text text-transparent mb-2">
                Host Dashboard
              </h1>
              <p className="text-xl text-[#B0B3C0]">Manage your profile and events</p>
            </div>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#36C1F6] to-[#657FFF] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#36C1F6]/30 transition-all duration-300 hover:scale-105"
              >
                <Edit className="w-5 h-5" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-[#16D3AC] text-black font-semibold rounded-xl hover:bg-white transition-all duration-300 hover:scale-105"
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#36C1F6] to-[#657FFF] flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Profile Information</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-gradient-to-br from-[#36C1F6] to-[#657FFF] shadow-2xl shadow-[#36C1F6]/30">
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
                <div className="px-6 py-2 bg-gradient-to-r from-[#16D3AC] to-[#36C1F6] rounded-lg inline-flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white font-bold text-sm">{hostData.role}</span>
                </div>
                <p className="text-[#B0B3C0] text-sm mt-3">Event Organizer</p>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#B0B3C0] mb-2">
                    <User className="w-4 h-4 text-[#36C1F6]" />
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#36C1F6] focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-medium">
                      {hostData.name}
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#B0B3C0] mb-2">
                    <Mail className="w-4 h-4 text-[#657FFF]" />
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={editedData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#657FFF] focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                      {hostData.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#B0B3C0] mb-2">
                    <User className="w-4 h-4 text-[#16D3AC]" />
                    Gender
                  </label>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={editedData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#16D3AC] focus:border-transparent transition-all appearance-none"
                    >
                      <option value="male" className="bg-[#0a0a1a]">Male</option>
                      <option value="female" className="bg-[#0a0a1a]">Female</option>
                      <option value="other" className="bg-[#0a0a1a]">Other</option>
                      <option value="prefer_not_to_say" className="bg-[#0a0a1a]">Prefer not to say</option>
                    </select>
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white capitalize">
                      {hostData.gender.replace("_", " ")}
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-[#B0B3C0] mb-2">
                    <Calendar className="w-4 h-4 text-[#36C1F6]" />
                    Date of Birth
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      name="date_of_birth"
                      value={editedData.date_of_birth}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#36C1F6] focus:border-transparent transition-all"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white">
                      {new Date(hostData.date_of_birth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-[#B0B3C0] mb-2">
                      <Camera className="w-4 h-4 text-[#657FFF]" />
                      Profile Image URL
                    </label>
                    <input
                      type="url"
                      name="image_url"
                      value={editedData.image_url}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#657FFF] focus:border-transparent transition-all"
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
