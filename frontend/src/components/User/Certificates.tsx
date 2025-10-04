import {
  Award,
  Download,
  Share2,
  Calendar,
  MapPin,
  Trophy,
  Star,
  Sparkles,
  Medal,
  Eye,
} from "lucide-react";
import { useState } from "react";

// Define type for a certificate
type Certificate = {
  id: number;
  title: string;
  type: "participation" | "achievement";
  date: string;
  organization: string;
  location: string;
  description: string;
  color: string;
  badge: string;
  hours: string;
  score?: string; // optional because not all certificates have it
};

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Tech Innovation Summit 2024",
    type: "participation",
    date: "2024-09-15",
    organization: "Tech Summit Inc.",
    location: "Convention Center, NYC",
    description:
      "Successfully participated in the premier technology innovation conference",
    color: "#6366F1",
    badge: "Participant",
    hours: "8 hours",
  },
  {
    id: 2,
    title: "AI & Machine Learning Mastery",
    type: "achievement",
    date: "2024-08-28",
    organization: "ML Academy",
    location: "Online Event",
    description: "Completed advanced workshop series with distinction",
    color: "#10B981",
    badge: "Certified",
    hours: "40 hours",
    score: "95%",
  },
  {
    id: 3,
    title: "Web3 Developer Bootcamp",
    type: "achievement",
    date: "2024-08-22",
    organization: "Blockchain Institute",
    location: "Tech Hub, San Francisco",
    description: "Mastered blockchain development and smart contracts",
    color: "#EC4899",
    badge: "Expert",
    hours: "120 hours",
    score: "98%",
  },
  {
    id: 4,
    title: "Design Thinking Workshop",
    type: "participation",
    date: "2024-07-15",
    organization: "Creative Space",
    location: "Portland, OR",
    description: "Engaged in innovative design thinking methodologies",
    color: "#F59E0B",
    badge: "Attendee",
    hours: "6 hours",
  },
  {
    id: 5,
    title: "Startup Leadership Program",
    type: "achievement",
    date: "2024-06-10",
    organization: "Entrepreneurship Center",
    location: "Austin, TX",
    description: "Demonstrated exceptional leadership and business acumen",
    color: "#8B5CF6",
    badge: "Graduate",
    hours: "80 hours",
    score: "92%",
  },
  {
    id: 6,
    title: "Cybersecurity Fundamentals",
    type: "participation",
    date: "2024-05-20",
    organization: "Security Institute",
    location: "Online Event",
    description: "Participated in comprehensive cybersecurity training",
    color: "#14B8A6",
    badge: "Participant",
    hours: "12 hours",
  },
];

export default function CertificatePage() {
  // Type selectedCert as Certificate or null
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [filter, setFilter] = useState<"all" | "participation" | "achievement">(
    "all"
  );

  const filteredCerts =
    filter === "all"
      ? certificates
      : certificates.filter((cert) => cert.type === filter);

  const stats = {
    total: certificates.length,
    participation: certificates.filter((c) => c.type === "participation").length,
    achievement: certificates.filter((c) => c.type === "achievement").length,
    totalHours: certificates.reduce((sum, c) => {
      // Extract number from "8 hours", "120 hours", etc.
      const num = parseInt(c.hours);
      return sum + (isNaN(num) ? 0 : num);
    }, 0),
  };

  return (
    <div className="min-h-screen bg-black p-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, #8B5CF6, #EC4899)",
                boxShadow: "0 10px 40px rgba(139, 92, 246, 0.3)",
              }}
            >
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">My Certificates</h1>
              <p className="text-[#B0B3C0] text-sm mt-1">
                Your achievements and participation records
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-semibold">
              {stats.achievement} Achievements Unlocked
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        {/* ... SAME JSX as your version ... */}

        {/* Certificate Filters */}
        <div className="flex flex-wrap gap-3">
          {["all", "achievement", "participation"].map((filterType) => (
            <button
              key={filterType}
              onClick={() =>
                setFilter(
                  filterType as "all" | "participation" | "achievement"
                )
              }
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                filter === filterType
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                  : "bg-white/5 text-[#B0B3C0] hover:bg-white/10"
              }`}
            >
              {filterType === "all"
                ? "All Certificates"
                : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div key={cert.id} className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer" onClick={() => setSelectedCert(cert)}>
              <div className="h-32 relative flex items-center justify-center" style={{background: `linear-gradient(135deg, ${cert.color}40, ${cert.color}20)`}}>
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-20 h-20 border-4 border-white/30 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 border-4 border-white/30 rounded-full"></div>
                </div>
                <div className="w-20 h-20 rounded-full flex items-center justify-center relative z-10 shadow-xl" style={{background: `linear-gradient(135deg, ${cert.color}, ${cert.color}dd)`}}>
                  {cert.type === 'achievement' ? <Trophy className="w-10 h-10 text-white" /> : <Award className="w-10 h-10 text-white" />}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-opacity-90 transition-colors line-clamp-2">{cert.title}</h3>
                  <div className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap" style={{backgroundColor: `${cert.color}30`, color: cert.color}}>{cert.badge}</div>
                </div>
                <p className="text-sm text-[#B0B3C0] line-clamp-2">{cert.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-[#B0B3C0]">
                    <Calendar className="w-4 h-4" style={{color: cert.color}} />
                    <span>{cert.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#B0B3C0]">
                    <MapPin className="w-4 h-4" style={{color: cert.color}} />
                    <span className="truncate">{cert.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#B0B3C0]">
                    <Star className="w-4 h-4" style={{color: cert.color}} />
                    <span>{cert.hours}</span>
                    {cert.score && <span className="ml-auto font-semibold text-white">Score: {cert.score}</span>}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-105" style={{background: `linear-gradient(135deg, ${cert.color}, ${cert.color}dd)`, color: 'white'}} onClick={(e) => {e.stopPropagation(); alert('Downloading certificate...');}}>
                    <Download className="w-4 h-4" />Download
                  </button>
                  <button className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all" onClick={(e) => {e.stopPropagation(); alert('Sharing certificate...');}}>
                    <Share2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCerts.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-4">
              <Award className="w-10 h-10 text-[#B0B3C0]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Certificates Found</h3>
            <p className="text-[#B0B3C0]">Start attending events to earn certificates!</p>
          </div>
        )}
      </div>

      {selectedCert && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedCert(null)}>
          <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl border border-white/30 max-w-2xl w-full p-8 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all" onClick={() => setSelectedCert(null)}>
              <span className="text-white text-xl">×</span>
            </button>
            <div className="rounded-2xl p-12 mb-6 relative overflow-hidden" style={{background: `linear-gradient(135deg, ${selectedCert.color}30, ${selectedCert.color}10)`, border: `2px solid ${selectedCert.color}50`}}>
              <div className="absolute top-0 left-0 w-full h-full opacity-5">
                <div className="absolute top-4 left-4 w-32 h-32 border-8 border-white rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-24 h-24 border-8 border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-8 border-white rounded-full"></div>
              </div>
              <div className="relative z-10 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl" style={{background: `linear-gradient(135deg, ${selectedCert.color}, ${selectedCert.color}dd)`}}>
                    {selectedCert.type === 'achievement' ? <Trophy className="w-12 h-12 text-white" /> : <Award className="w-12 h-12 text-white" />}
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Certificate of {selectedCert.type === 'achievement' ? 'Achievement' : 'Participation'}</h2>
                  <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4" style={{backgroundColor: `${selectedCert.color}30`, color: selectedCert.color}}>{selectedCert.badge}</div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">{selectedCert.title}</h3>
                  <p className="text-[#B0B3C0]">{selectedCert.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-left">
                    <p className="text-xs text-[#B0B3C0] mb-1">Organization</p>
                    <p className="text-white font-semibold">{selectedCert.organization}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#B0B3C0] mb-1">Date</p>
                    <p className="text-white font-semibold">{selectedCert.date}</p>
                  </div>
                </div>
                {selectedCert.score && (
                  <div className="pt-2">
                    <p className="text-xs text-[#B0B3C0] mb-1">Final Score</p>
                    <p className="text-2xl font-bold text-white">{selectedCert.score}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105" style={{background: `linear-gradient(135deg, ${selectedCert.color}, ${selectedCert.color}dd)`, color: 'white'}} onClick={() => alert('Downloading certificate...')}>
                <Download className="w-5 h-5" />Download PDF
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all" onClick={() => alert('Sharing certificate...')}>
                <Share2 className="w-5 h-5" />Share
              </button>
              <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all" onClick={() => alert('Viewing certificate...')}>
                <Eye className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}