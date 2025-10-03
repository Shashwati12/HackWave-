import { useState } from "react";
import { User, Mail, Calendar, CreditCard as Edit, Save, X, Camera, Shield, Users, Activity, Settings, Lock, CheckCircle, AlertTriangle } from "lucide-react";
import { Background } from "../ShootingStar";

interface AdminData {
  id: string;
  name: string;
  email: string;
  gender: string;
  role: "User" | "Host" | "Admin";
  date_of_birth: string;
  image_url: string;
}

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState<AdminData>({
    id: "3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    gender: "male",
    role: "Admin",
    date_of_birth: "1990-03-10",
    image_url: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
  });

  const [editedData, setEditedData] = useState(adminData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(adminData);
  };

  const handleSave = () => {
    setAdminData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(adminData);
    setIsEditing(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const stats = [
    { label: "Total Users", value: "1,243", icon: Users, color: "from-[#36C1F6] to-[#657FFF]" },
    { label: "Active Events", value: "87", icon: Activity, color: "from-[#657FFF] to-[#16D3AC]" },
    { label: "System Health", value: "99.8%", icon: CheckCircle, color: "from-[#16D3AC] to-[#36C1F6]" },
    { label: "Pending Reviews", value: "12", icon: AlertTriangle, color: "from-[#36C1F6] to-[#16D3AC]" },
  ];

  const systemControls = [
    { label: "User Management", icon: Users, status: "Active" },
    { label: "Event Moderation", icon: Activity, status: "Active" },
    { label: "Security Settings", icon: Lock, status: "Configured" },
    { label: "System Configuration", icon: Settings, status: "Online" },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden overflow-y-auto">
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#36C1F6] to-[#657FFF] flex items-center justify-center shadow-lg shadow-[#36C1F6]/30">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-[#36C1F6] to-[#657FFF] bg-clip-text text-transparent">
                  Admin Control Panel
                </h1>
              </div>
              <p className="text-xl text-[#B0B3C0]">System management and administration</p>
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

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
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

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#36C1F6] to-[#657FFF] flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Administrator Profile</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  <div className="w-48 h-48 rounded-2xl overflow-hidden border-4 border-gradient-to-br from-[#36C1F6] via-[#657FFF] to-[#16D3AC] shadow-2xl shadow-[#36C1F6]/30">
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
                  <div className="px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg inline-flex items-center gap-2 shadow-lg shadow-red-500/30">
                    <Shield className="w-4 h-4 text-white" />
                    <span className="text-white font-bold text-sm">{adminData.role}</span>
                  </div>
                  <p className="text-[#B0B3C0] text-sm mt-3">System Administrator</p>
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
                        {adminData.name}
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
                        {adminData.email}
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
                        {adminData.gender.replace("_", " ")}
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
                        {new Date(adminData.date_of_birth).toLocaleDateString('en-US', {
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

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#36C1F6] to-[#657FFF] flex items-center justify-center shadow-lg">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">System Controls</h3>
            </div>
            <div className="space-y-4">
              {systemControls.map((control, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <control.icon className="w-5 h-5 text-[#36C1F6] group-hover:text-[#16D3AC] transition-colors" />
                    <span className="text-white font-medium">{control.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#16D3AC] animate-pulse"></div>
                    <span className="text-[#16D3AC] text-xs font-medium">{control.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-[#36C1F6]" />
              <h3 className="text-xl font-bold text-white">Recent Activity</h3>
            </div>
            <div className="space-y-3">
              {[
                { action: 'User account verified', time: '2 minutes ago' },
                { action: 'Event approved', time: '15 minutes ago' },
                { action: 'System backup completed', time: '1 hour ago' },
                { action: 'Security scan performed', time: '3 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white text-sm">{activity.action}</span>
                  <span className="text-[#B0B3C0] text-xs">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-[#657FFF]" />
              <h3 className="text-xl font-bold text-white">Security Overview</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Two-Factor Auth</span>
                  <CheckCircle className="w-5 h-5 text-[#16D3AC]" />
                </div>
                <p className="text-[#B0B3C0] text-xs">Enabled and active</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Last Password Change</span>
                  <Calendar className="w-5 h-5 text-[#36C1F6]" />
                </div>
                <p className="text-[#B0B3C0] text-xs">15 days ago</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Login Sessions</span>
                  <Activity className="w-5 h-5 text-[#657FFF]" />
                </div>
                <p className="text-[#B0B3C0] text-xs">2 active sessions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
