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
  ClipboardList,
} from "lucide-react";
import { Background } from "../ShootingStar";
import api from "../../lib/api";

interface FormData {
  event_name: string;
  event_description: string;
  event_type: string;
  category: string;
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
    event_name: "",
    event_description: "",
    event_type: "",
    category: "",
    venue: "",
    important_dates: "",
    registration_deadline: "",
    prizes: "",
    contact_info: "",
    participation_type: "individual",
    max_team_size: "",
    department: "",
    registration_fee: "",
    image: "",
    rules: "",
    organizer: "",
    layer: "",
    max_participants: "",
    eligibility: "",
  });

  

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      setFormData((prev) => ({ ...prev, image_url: file.name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log("Submitting Event Data:", formData);

    try {
      const response = await api.post("/event", formData);

      if (!response) throw new Error("Failed to create event");

      alert(" Event created successfully!");
      setFormData({
        event_name: "",
        event_description: "",
        event_type: "",
        category: "",
        venue: "",
        important_dates: "",
        registration_deadline: "",
        prizes: "",
        contact_info: "",
        participation_type: "individual",
        max_team_size: "",
        department: "",
        registration_fee: "",
        image: "",
        rules: "",
        organizer: "",
        layer: "",
        max_participants: "",
        eligibility: "",
      });
      setPreview(null);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden overflow-y-auto">
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 py-12 mt-20">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#16D3AC] to-[#36C1F6] flex items-center justify-center shadow-lg shadow-[#16D3AC]/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#16D3AC] to-[#36C1F6] bg-clip-text text-transparent">
            Host an Event
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: Basic Info */}
          <Section title="Basic Information" icon={<ClipboardList className="w-5 h-5 text-[#16D3AC]" />}>
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Event Name *" name="event_name" value={formData.event_name} onChange={handleChange} />
              <Input label="Category" name="category" value={formData.category} onChange={handleChange} />
              <Input label="Event Type" name="event_type" value={formData.event_type} onChange={handleChange} />
              <Input label="Venue" name="venue" value={formData.venue} onChange={handleChange} />
              <Input label="Layer (College / Department)" name="layer" value={formData.layer} onChange={handleChange} />
              <Input label="Department" name="department" value={formData.department} onChange={handleChange} />
            </div>

            <TextArea
              label="Event Description *"
              name="event_description"
              value={formData.event_description}
              onChange={handleChange}
              placeholder="Briefly describe your event"
            />
          </Section>

          {/* Section 2: Dates */}
          <Section title="Schedule" icon={<Calendar className="w-5 h-5 text-[#36C1F6]" />}>
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Event Date"
                name="important_dates"
                type="datetime-local"
                value={formData.important_dates}
                onChange={handleChange}
              />
              <Input
                label="Registration Deadline"
                name="registration_deadline"
                type="datetime-local"
                value={formData.registration_deadline}
                onChange={handleChange}
              />
            </div>
          </Section>

          {/* Section 3: Participation */}
          <Section title="Participation Details" icon={<Users className="w-5 h-5 text-[#16D3AC]" />}>
            <div className="grid md:grid-cols-2 gap-6">
              <Select
                label="Participation Type"
                name="participation_type"
                value={formData.participation_type}
                onChange={handleChange}
                options={[
                  { value: "individual", label: "Individual" },
                  { value: "team", label: "Team" },
                ]}
              />
              <Input label="Max Team Size" name="max_team_size" type="number" value={formData.max_team_size} onChange={handleChange} />
              <Input label="Max Participants" name="max_participants" type="number" value={formData.max_participants} onChange={handleChange} />
              <Input label="Registration Fee" name="registration_fee" type="number" value={formData.registration_fee} onChange={handleChange} />
            </div>
            <TextArea label="Eligibility Criteria" name="eligibility" value={formData.eligibility} onChange={handleChange} />
          </Section>

          {/* Section 4: Additional Info */}
          <Section title="Additional Information" icon={<Award className="w-5 h-5 text-[#36C1F6]" />}>
            <TextArea label="Prizes" name="prizes" value={formData.prizes} onChange={handleChange} />
            <TextArea label="Rules & Regulations" name="rules" value={formData.rules} onChange={handleChange} />
            <Input label="Organizer" name="organizer" value={formData.organizer} onChange={handleChange} />
            <Input label="Contact Info" name="contact_info" value={formData.contact_info} onChange={handleChange} />
          </Section>

          {/* Section 5: Image */}
          <Section title="Event Poster" icon={<ImageIcon className="w-5 h-5 text-[#657FFF]" />}>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#16D3AC]/30 hover:file:bg-[#16D3AC]/50 cursor-pointer"
              />
              {preview && (
                <div className="mt-4 relative group">
                  <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-xl border border-white/20" />
                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>
          </Section>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-10 py-4 bg-gradient-to-r from-[#16D3AC] to-[#36C1F6] text-white font-semibold text-lg rounded-xl hover:shadow-lg hover:shadow-[#16D3AC]/30 transition-transform hover:scale-105 disabled:opacity-50"
            >
              {isSubmitting ? "Creating Event..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* --- UI Subcomponents --- */
const Section = ({ title, icon, children }: any) => (
  <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">{icon}</div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const Input = ({ label, name, type = "text", value, onChange, placeholder = "" }: any) => (
  <div>
    <label className="block text-sm font-medium text-[#B0B3C0] mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#16D3AC] outline-none"
    />
  </div>
);

const TextArea = ({ label, name, value, onChange, placeholder = "" }: any) => (
  <div>
    <label className="block text-sm font-medium text-[#B0B3C0] mb-2">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white resize-none focus:ring-2 focus:ring-[#16D3AC] outline-none"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options }: any) => (
  <div>
    <label className="block text-sm font-medium text-[#B0B3C0] mb-2">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:ring-2 focus:ring-[#16D3AC] outline-none"
    >
      {options.map((opt: any) => (
        <option key={opt.value} value={opt.value} className="bg-[#0a0a1a]">
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
