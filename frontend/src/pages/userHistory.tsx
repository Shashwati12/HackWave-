import { useState } from "react";
import { Calendar, MapPin, Users, Clock, Filter, Search, ChevronDown, CheckCircle, XCircle, AlertCircle, Sparkles, TrendingUp, Award } from "lucide-react";

// Shooting Star Background Component
const Background = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-black"></div>
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`,
            opacity: Math.random() * 0.7 + 0.3,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

interface EventHistory {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  status: "completed" | "cancelled" | "upcoming";
  category: string;
  host: string;
  image: string;
}

export default function UserHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const eventHistory: EventHistory[] = [
    {
      id: "1",
      title: "Tech Innovation Summit 2024",
      date: "2024-09-15",
      time: "10:00 AM",
      location: "Convention Center, San Francisco",
      attendees: 250,
      status: "completed",
      category: "Technology",
      host: "Sarah Martinez",
      image: "https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "2",
      title: "Annual Charity Gala Night",
      date: "2024-08-22",
      time: "7:00 PM",
      location: "Grand Hotel Ballroom, New York",
      attendees: 180,
      status: "completed",
      category: "Charity",
      host: "Michael Chen",
      image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "3",
      title: "Digital Marketing Workshop",
      date: "2024-07-10",
      time: "2:00 PM",
      location: "Online Event",
      attendees: 450,
      status: "completed",
      category: "Education",
      host: "Jennifer Wilson",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "4",
      title: "Summer Music Festival",
      date: "2024-06-28",
      time: "5:00 PM",
      location: "Central Park Amphitheater, LA",
      attendees: 1200,
      status: "cancelled",
      category: "Entertainment",
      host: "Sarah Martinez",
      image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "5",
      title: "Startup Networking Mixer",
      date: "2024-10-20",
      time: "6:00 PM",
      location: "Innovation Hub, Austin",
      attendees: 85,
      status: "upcoming",
      category: "Business",
      host: "Michael Chen",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "6",
      title: "AI & Machine Learning Conference",
      date: "2024-11-05",
      time: "9:00 AM",
      location: "Tech Campus, Seattle",
      attendees: 320,
      status: "upcoming",
      category: "Technology",
      host: "Jennifer Wilson",
      image: "https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "7",
      title: "Photography Exhibition Opening",
      date: "2024-05-18",
      time: "4:00 PM",
      location: "Modern Art Gallery, Chicago",
      attendees: 95,
      status: "completed",
      category: "Arts",
      host: "Sarah Martinez",
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      id: "8",
      title: "Health & Wellness Retreat",
      date: "2024-04-12",
      time: "8:00 AM",
      location: "Mountain Resort, Colorado",
      attendees: 60,
      status: "cancelled",
      category: "Health",
      host: "Michael Chen",
      image: "https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5" />;
      case "cancelled":
        return <XCircle className="w-5 h-5" />;
      case "upcoming":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-[#16D3AC]";
      case "cancelled":
        return "bg-[#657FFF]";
      case "upcoming":
        return "bg-[#36C1F6]";
      default:
        return "bg-gray-500";
    }
  };

  const filteredEvents = eventHistory.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.host.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || event.status === filterStatus;
    const matchesCategory = filterCategory === "all" || event.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const stats = [
    { 
      label: "Total Events", 
      value: eventHistory.length.toString(), 
      icon: Calendar,
      gradient: "from-[#36C1F6] to-[#657FFF]"
    },
    { 
      label: "Completed", 
      value: eventHistory.filter(e => e.status === "completed").length.toString(), 
      icon: CheckCircle,
      gradient: "from-[#16D3AC] to-[#36C1F6]"
    },
    { 
      label: "Upcoming", 
      value: eventHistory.filter(e => e.status === "upcoming").length.toString(), 
      icon: TrendingUp,
      gradient: "from-[#36C1F6] to-[#16D3AC]"
    },
    { 
      label: "Cancelled", 
      value: eventHistory.filter(e => e.status === "cancelled").length.toString(), 
      icon: Award,
      gradient: "from-[#657FFF] to-[#36C1F6]"
    },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden overflow-y-auto">
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-[#36C1F6] to-[#657FFF] bg-clip-text text-transparent mb-3">
            Event History
          </h1>
          <p className="text-xl text-[#B0B3C0]">Track your event journey and experiences</p>
        </div>

        {/* Stats Grid */}
        <div className="grid lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#36C1F6]/20 to-[#657FFF]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-black/60 backdrop-blur-sm rounded-2xl border border-[#36C1F6]/30 p-6 hover:border-[#16D3AC] transition-all duration-300">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4 shadow-lg shadow-[#36C1F6]/30`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-[#B0B3C0] text-sm font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className="relative group mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#36C1F6]/10 to-[#657FFF]/10 rounded-3xl blur-2xl"></div>
          <div className="relative bg-black/60 backdrop-blur-sm rounded-3xl border border-[#36C1F6]/30 p-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="flex-1 relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#16D3AC] z-10" />
                <input
                  type="text"
                  placeholder="Search events by name, location, or host..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-black/40 border-2 border-[#36C1F6]/30 rounded-xl text-white placeholder-[#B0B3C0] focus:outline-none focus:border-[#16D3AC] transition-all duration-300"
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#16D3AC] pointer-events-none z-10" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-12 pr-10 py-4 bg-black/40 border-2 border-[#36C1F6]/30 rounded-xl text-white focus:outline-none focus:border-[#16D3AC] transition-all appearance-none min-w-[180px] cursor-pointer"
                  >
                    <option value="all" className="bg-black">All Status</option>
                    <option value="completed" className="bg-black">Completed</option>
                    <option value="upcoming" className="bg-black">Upcoming</option>
                    <option value="cancelled" className="bg-black">Cancelled</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#16D3AC] pointer-events-none" />
                </div>

                <div className="relative">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="pl-6 pr-10 py-4 bg-black/40 border-2 border-[#36C1F6]/30 rounded-xl text-white focus:outline-none focus:border-[#16D3AC] transition-all appearance-none min-w-[180px] cursor-pointer"
                  >
                    <option value="all" className="bg-black">All Categories</option>
                    <option value="Technology" className="bg-black">Technology</option>
                    <option value="Business" className="bg-black">Business</option>
                    <option value="Education" className="bg-black">Education</option>
                    <option value="Entertainment" className="bg-black">Entertainment</option>
                    <option value="Charity" className="bg-black">Charity</option>
                    <option value="Health" className="bg-black">Health</option>
                    <option value="Arts" className="bg-black">Arts</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#16D3AC] pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#B0B3C0] mb-6">
              <Sparkles className="w-4 h-4 text-[#16D3AC]" />
              <span className="text-sm">Showing <span className="text-white font-semibold">{filteredEvents.length}</span> of <span className="text-white font-semibold">{eventHistory.length}</span> events</span>
            </div>

            {/* Event Cards */}
            <div className="space-y-6">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#36C1F6]/10 to-[#16D3AC]/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                    <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl border-2 border-[#36C1F6]/30 p-6 hover:border-[#16D3AC] transition-all duration-300">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Event Image */}
                        <div className="relative w-full lg:w-56 h-56 rounded-xl overflow-hidden border-2 border-[#36C1F6]/30 group-hover:border-[#16D3AC] transition-all duration-300">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>

                        {/* Event Details */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#36C1F6] group-hover:to-[#657FFF] group-hover:bg-clip-text transition-all duration-300">
                                {event.title}
                              </h3>
                              <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-[#36C1F6] to-[#657FFF] text-white text-sm font-semibold rounded-lg">
                                {event.category}
                              </span>
                            </div>
                            <div
                              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl ${getStatusColor(
                                event.status
                              )} text-white font-semibold shadow-lg capitalize`}
                            >
                              {getStatusIcon(event.status)}
                              {event.status}
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-5">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-[#16D3AC]/20 flex items-center justify-center border border-[#16D3AC]/30">
                                <Calendar className="w-5 h-5 text-[#16D3AC]" />
                              </div>
                              <div>
                                <div className="text-xs text-[#B0B3C0] mb-0.5">Date</div>
                                <div className="text-white font-semibold">
                                  {new Date(event.date).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-[#36C1F6]/20 flex items-center justify-center border border-[#36C1F6]/30">
                                <Clock className="w-5 h-5 text-[#36C1F6]" />
                              </div>
                              <div>
                                <div className="text-xs text-[#B0B3C0] mb-0.5">Time</div>
                                <div className="text-white font-semibold">{event.time}</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-[#16D3AC]/20 flex items-center justify-center border border-[#16D3AC]/30">
                                <MapPin className="w-5 h-5 text-[#16D3AC]" />
                              </div>
                              <div>
                                <div className="text-xs text-[#B0B3C0] mb-0.5">Location</div>
                                <div className="text-white font-semibold">{event.location}</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-[#657FFF]/20 flex items-center justify-center border border-[#657FFF]/30">
                                <Users className="w-5 h-5 text-[#657FFF]" />
                              </div>
                              <div>
                                <div className="text-xs text-[#B0B3C0] mb-0.5">Attendees</div>
                                <div className="text-white font-semibold">{event.attendees}</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-5 border-t-2 border-[#36C1F6]/20">
                            <div className="text-[#B0B3C0]">
                              Hosted by <span className="text-white font-semibold">{event.host}</span>
                            </div>
                            <button className="px-8 py-3 bg-[#16D3AC] text-black font-bold rounded-xl hover:bg-white hover:shadow-lg hover:shadow-[#16D3AC]/50 transition-all duration-300 hover:scale-105">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#36C1F6]/20 to-[#657FFF]/20 flex items-center justify-center mx-auto mb-6 border-2 border-[#36C1F6]/30">
                    <Calendar className="w-12 h-12 text-[#16D3AC]" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">No Events Found</h3>
                  <p className="text-[#B0B3C0] text-lg">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}