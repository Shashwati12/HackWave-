import { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Image as ImageIcon,
  FileText,
  Mail,
  Award,
  Shield,
  Building,
  Sparkles,
  Upload,
  X,
} from "lucide-react";
import { Background } from "../ShootingStar";

interface FormData {
  title: string;
  event_type: string;
  venue: string;
  important_dates: string;
  registration_deadline: string;
  prizes: string;
  contact_info: string;
  participation_type: string;
  max_team_size: string;
  department: string;
  registration_fee: string;
  image_url: string;
  rules: string;
  organizer: string;
  layer: string;
  max_participants: string;
  eligibility: string;
}

export default function HostEvent() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    event_type: "",
    venue: "",
    important_dates: "",
    registration_deadline: "",
    prizes: "",
    contact_info: "",
    participation_type: "individual",
    max_team_size: "",
    department: "",
    registration_fee: "",
    image_url: "",
    rules: "",
    organizer: "",
    layer: "",
    max_participants: "",
    eligibility: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Form submitted:", formData);

    setTimeout(() => {
      setIsSubmitting(false);
      alert("Event created successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden overflow-y-auto">
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-8 py-12">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#36C1F6] to-[#657FFF] flex items-center justify-center shadow-lg shadow-[#36C1F6]/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#36C1F6] to-[#657FFF] bg-clip-text text-transparent">
              Host an Event
            </h1>
          </div>
          <p className="text-xl text-[#B0B3C0] leading-relaxed">
            Fill in the details to create and publish your event
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <div className="w-10 h-10 rounded-lg bg-[#36C1F6]/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#36C1F6]" />
              </div>
              <h2 className="text-2xl font-bold text-white">Basic Information</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#36C1F6] focus:border-transparent transition-all"
                  placeholder="Enter event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2">
                  Event Type *
                </label>
                <div className="relative">
                  <select
                    name="event_type"
                    required
                    value={formData.event_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#36C1F6] focus:border-transparent transition-all appearance-none"
                  >
                    <option value="" className="bg-[#0a0a1a]">Select event type</option>
                    <option value="technical" className="bg-[#0a0a1a]">Technical</option>
                    <option value="cultural" className="bg-[#0a0a1a]">Cultural</option>
                    <option value="sports" className="bg-[#0a0a1a]">Sports</option>
                    <option value="workshop" className="bg-[#0a0a1a]">Workshop</option>
                    <option value="seminar" className="bg-[#0a0a1a]">Seminar</option>
                    <option value="competition" className="bg-[#0a0a1a]">Competition</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2">
                  Layer *
                </label>
                <input
                  type="text"
                  name="layer"
                  required
                  value={formData.layer}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#36C1F6] focus:border-transparent transition-all"
                  placeholder="e.g., College, Department, Club"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#36C1F6]" />
                  Venue *
                </label>
                <input
                  type="text"
                  name="venue"
                  required
                  value={formData.venue}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#36C1F6] focus:border-transparent transition-all"
                  placeholder="Enter venue location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2 flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#36C1F6]" />
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#36C1F6] focus:border-transparent transition-all"
                  placeholder="Organizing department"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2">
                  Organizer Name *
                </label>
                <input
                  type="text"
                  name="organizer"
                  required
                  value={formData.organizer}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#36C1F6] focus:border-transparent transition-all"
                  placeholder="Enter organizer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#36C1F6]" />
                  Contact Information *
                </label>
                <input
                  type="text"
                  name="contact_info"
                  required
                  value={formData.contact_info}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#36C1F6] focus:border-transparent transition-all"
                  placeholder="Email or phone number"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <div className="w-10 h-10 rounded-lg bg-[#657FFF]/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#657FFF]" />
              </div>
              <h2 className="text-2xl font-bold text-white">Date & Time</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#657FFF]" />
                  Important Dates
                </label>
                <input
                  type="datetime-local"
                  name="important_dates"
                  value={formData.important_dates}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#657FFF] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#657FFF]" />
                  Registration Deadline
                </label>
                <input
                  type="datetime-local"
                  name="registration_deadline"
                  value={formData.registration_deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#657FFF] focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <div className="w-10 h-10 rounded-lg bg-[#16D3AC]/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#16D3AC]" />
              </div>
              <h2 className="text-2xl font-bold text-white">Participation Details</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2">
                  Participation Type *
                </label>
                <select
                  name="participation_type"
                  required
                  value={formData.participation_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#16D3AC] focus:border-transparent transition-all appearance-none"
                >
                  <option value="individual" className="bg-[#0a0a1a]">Individual</option>
                  <option value="team" className="bg-[#0a0a1a]">Team</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2">
                  Max Team Size
                </label>
                <input
                  type="number"
                  name="max_team_size"
                  min="1"
                  value={formData.max_team_size}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#16D3AC] focus:border-transparent transition-all"
                  placeholder="e.g., 5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#16D3AC]" />
                  Max Participants
                </label>
                <input
                  type="number"
                  name="max_participants"
                  min="1"
                  value={formData.max_participants}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#16D3AC] focus:border-transparent transition-all"
                  placeholder="Total capacity"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#16D3AC]" />
                  Registration Fee
                </label>
                <input
                  type="number"
                  name="registration_fee"
                  min="0"
                  step="0.01"
                  value={formData.registration_fee}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#16D3AC] focus:border-transparent transition-all"
                  placeholder="0.00"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#16D3AC]" />
                  Eligibility Criteria
                </label>
                <textarea
                  name="eligibility"
                  value={formData.eligibility}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#16D3AC] focus:border-transparent transition-all resize-none"
                  placeholder="Who can participate? (e.g., Open to all students, Department specific, etc.)"
                />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <div className="w-10 h-10 rounded-lg bg-[#36C1F6]/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#36C1F6]" />
              </div>
              <h2 className="text-2xl font-bold text-white">Additional Details</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#36C1F6]" />
                  Prizes
                </label>
                <textarea
                  name="prizes"
                  value={formData.prizes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#36C1F6] focus:border-transparent transition-all resize-none"
                  placeholder="List prizes and awards (e.g., 1st Prize: $1000, 2nd Prize: $500)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#36C1F6]" />
                  Rules & Regulations
                </label>
                <textarea
                  name="rules"
                  value={formData.rules}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#36C1F6] focus:border-transparent transition-all resize-none"
                  placeholder="Enter event rules and guidelines"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#B0B3C0] mb-2 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#36C1F6]" />
                  Event Image URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:ring-2 focus:ring-[#36C1F6] focus:border-transparent transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                  <Upload className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#B0B3C0]" />
                </div>
                {formData.image_url && (
                  <div className="mt-4 relative group">
                    <img
                      src={formData.image_url}
                      alt="Event preview"
                      className="w-full h-48 object-cover rounded-xl border border-white/20"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23333' width='400' height='300'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EImage not found%3C/text%3E%3C/svg%3E";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, image_url: "" }))}
                      className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-[#36C1F6] to-[#657FFF] text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-[#36C1F6]/30 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Event...
                </span>
              ) : (
                "Create Event"
              )}
            </button>
            <button
              type="button"
              className="px-8 py-4 bg-white/10 text-white font-bold text-lg rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
