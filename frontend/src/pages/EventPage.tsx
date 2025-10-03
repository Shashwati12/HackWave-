import { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaShareAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5"; // cross icon

type EventType = "Hackathon" | "Workshop" | "Cultural" | "Sports" | "Seminar";

interface Event {
  id: number;
  name: string;
  type: EventType;
  date: string;
  venue: string;
  description: string;
  banner: string;
  registrationOpen: boolean;
  popular?: boolean;
  newEvent?: boolean;
  aiSuggested?: boolean;
  attendees?: number;
  moreDetails?: string;
}

const sampleEvents: Event[] = [
  {
    id: 1,
    name: "AI Hackathon 2025",
    type: "Hackathon",
    date: "2025-11-20",
    venue: "Tech Lab",
    description: "Solve real-world AI challenges with your team and compete for prizes.",
    moreDetails: "This hackathon will include workshops, mentorship sessions, and a final presentation to judges. Top winners get prizes and internship opportunities.",
    banner: "https://via.placeholder.com/400x200",
    registrationOpen: true,
    popular: true,
    newEvent: true,
    attendees: 150,
  },
  {
    id: 2,
    name: "Cultural Fest",
    type: "Cultural",
    date: "2025-12-05",
    venue: "Main Auditorium",
    description: "Music, Dance & Drama performances from various colleges.",
    moreDetails: "Participate in dance battles, singing competitions, drama skits, and enjoy food stalls and games. Open to all students.",
    banner: "https://via.placeholder.com/400x200",
    registrationOpen: false,
    aiSuggested: true,
    attendees: 300,
  },
  {
    id: 3,
    name: "Robotics Workshop",
    type: "Workshop",
    date: "2025-11-28",
    venue: "Engineering Lab",
    description: "Hands-on robotics experience. Learn and build robots!",
    moreDetails: "You will learn basic electronics, programming robots, and designing simple robotic systems. Materials will be provided.",
    banner: "https://via.placeholder.com/400x200",
    registrationOpen: true,
    attendees: 80,
  },
];

const EventsPage = ({ userRole }: { userRole: "visitor" | "student" | "organizer" | "vendor" }) => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<EventType | "All">("All");
  const [sortBy, setSortBy] = useState<"date" | "popularity">("date");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<Event | null>(null);

  const filteredEvents = sampleEvents
    .filter(
      (event) =>
        event.name.toLowerCase().includes(search.toLowerCase()) &&
        (filterType === "All" || event.type === filterType)
    )
    .sort((a, b) => {
      if (sortBy === "date") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "popularity") return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      return 0;
    });

  const copyEventLink = (id: number) => {
    navigator.clipboard.writeText(`${window.location.href}#event-${id}`);
    alert("Event link copied!");
  };

  const getCountdown = (dateStr: string) => {
    const eventDate = new Date(dateStr).getTime();
    const now = Date.now();
    const diff = eventDate - now;
    if (diff <= 0) return "Event Passed";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days left`;
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden p-6">
      {/* Background Shapes */}
      <div className="absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-gradient-to-r from-[#36C1F6]/50 via-[#16D3AC]/40 to-[#657FFF]/30 filter blur-3xl opacity-50 animate-spin-slow"></div>
      <div className="absolute -bottom-48 -right-48 w-[36rem] h-[36rem] rounded-full bg-gradient-to-tr from-[#16D3AC]/50 via-[#36C1F6]/40 to-[#657FFF]/30 filter blur-3xl opacity-40 animate-spin-slow"></div>

      {/* Header */}
      <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#36C1F6] to-[#657FFF] mb-8 relative z-10">
        Events
      </h1>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 relative z-10">
        <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 flex-1 border border-white/20 hover:shadow-lg transition duration-300">
          <FaSearch className="text-[#16D3AC] mr-2" />
          <input
            type="text"
            placeholder="Search events..."
            className="bg-transparent outline-none w-full text-white placeholder-[#B0B3C0]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="bg-white/10 backdrop-blur-sm text-neutral-400 rounded-xl px-4 py-2 outline-none border border-white/20 hover:shadow-lg transition duration-300"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as EventType | "All")}
        >
          <option value="All">All Types</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Workshop">Workshop</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
          <option value="Seminar">Seminar</option>
        </select>
      </div>

      {/* Event Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="relative w-full h-80 perspective cursor-pointer"
            onClick={() => setSelectedEvent(selectedEvent?.id === event.id ? null : event)}
          >
            <div
              className={`relative w-full h-full duration-700 transform-style-3d ${
                selectedEvent?.id === event.id ? "rotate-y-180" : ""
              }`}
            >
              {/* Front */}
              <div className="absolute w-full h-full backface-hidden bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20 flex flex-col">
                <img src={event.banner} alt={event.name} className="w-full h-48 object-cover rounded-t-2xl" />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h2 className="text-xl font-semibold text-white">{event.name}</h2>
                  <p className="text-[#B0B3C0] text-sm mt-2">{event.description.slice(0, 50)}...</p>
                  <div className="flex justify-between items-center text-[#B0B3C0] mt-2 text-sm">
                    <div className="flex items-center gap-1"><FaCalendarAlt /> {event.date}</div>
                    <div className="flex items-center gap-1"><FaMapMarkerAlt /> {event.venue}</div>
                  </div>
                </div>
              </div>

              {/* Back */}
              <div
                className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-black/60 to-[#0a0a1a]/70 backdrop-blur-xl rounded-2xl border border-white/20 p-4 flex flex-col justify-between cursor-pointer overflow-y-auto"
                onClick={(e) => { e.stopPropagation(); setExpandedEvent(event); }}
              >
                <h2 className="text-2xl font-bold text-[#36C1F6] mb-2">{event.name}</h2>
                <p className="text-[#B0B3C0]">{event.description}</p>
                <p className="text-[#B0B3C0] mt-2 text-sm">{event.moreDetails}</p>
                <div className="flex justify-between items-center text-sm text-[#B0B3C0] mt-4">
                  <span>Attendees: {event.attendees || 0}</span>
                  <span>{getCountdown(event.date)}</span>
                </div>
                <p className="text-xs text-[#B0B3C0] mt-2">Click to expand full info</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Modal */}
      {expandedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="relative bg-gradient-to-br from-[#0f172a]/80 to-black/70 backdrop-blur-2xl rounded-2xl p-6 max-w-3xl w-full overflow-y-auto max-h-[90vh] border border-white/20 shadow-2xl">
            
            {/* Cross Icon */}
            <button
              onClick={() => setExpandedEvent(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl"
            >
              <IoClose />
            </button>

            <h2 className="text-3xl font-bold text-[#36C1F6]">{expandedEvent.name}</h2>
            <img src={expandedEvent.banner} className="mt-4 rounded-lg shadow-lg" />
            <p className="text-[#B0B3C0] mt-4">{expandedEvent.description}</p>
            <p className="text-[#B0B3C0] mt-2">{expandedEvent.moreDetails}</p>

            <div className="flex justify-between items-center mt-4 text-[#B0B3C0]">
              <span><FaCalendarAlt /> {expandedEvent.date}</span>
              <span><FaMapMarkerAlt /> {expandedEvent.venue}</span>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => copyEventLink(expandedEvent.id)}
                className="bg-[#16D3AC] text-black px-4 py-2 rounded-xl font-semibold flex items-center gap-2"
              >
                <FaShareAlt /> Share
              </button>
              {expandedEvent.registrationOpen && userRole !== "visitor" && (
                <button className="bg-[#657FFF] text-white px-4 py-2 rounded-xl font-semibold">
                  Register
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Flip Card Styles */}
      <style>
        {`
          .perspective { perspective: 1000px; }
          .transform-style-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
          .duration-700 { transition: transform 0.7s; }
        `}
      </style>
    </div>
  );
};

export default EventsPage;
