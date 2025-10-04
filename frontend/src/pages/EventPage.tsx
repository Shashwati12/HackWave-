import { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaSearch,
  FaShareAlt,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Background } from "../components/ShootingStar";
import RegisterPage from "./RegisterPage";

type EventType = "Hackathon" | "Workshop" | "Cultural" | "Sports" | "Seminar";

// Event interface must match your backend schema
interface Event {
  id: number;
  name: string;
  type: EventType;
  date: string;
  venue: string;
  description: string;
  image_url: string;
  registrationOpen: boolean;
  registrationLink?: string;
  popular?: boolean;
  newEvent?: boolean;
  aiSuggested?: boolean;
  attendees?: number;
  moreDetails?: string;
  teamSize?: number;
}

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<EventType | "All">("All");
  const [sortByPopularity, setSortByPopularity] = useState<"all" | "popular">(
    "all"
  );
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<Event | null>(null);
  const [countdowns, setCountdowns] = useState<{ [key: number]: string }>({});
  const [openRegistration, setRegistrationform] = useState(false);

  // ✅ Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/events"); // change to your backend route
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();

if (Array.isArray(data)) {
  setEvents(data);
} else if (data.events) {
  setEvents(data.events);
} else if (data.data) {
  setEvents(data.data);
} else {
  console.error("Unexpected backend response:", data);
  setEvents([]);
}
 // backend must return { events: [...] }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // ✅ Live countdowns
  useEffect(() => {
    if (!events.length) return;

    const interval = setInterval(() => {
      const newCountdowns: { [key: number]: string } = {};
      events.forEach((event) => {
        const diff = new Date(event.date).getTime() - Date.now();
        if (diff <= 0) newCountdowns[event.id] = "Event Passed";
        else
          newCountdowns[event.id] = `${Math.floor(
            diff / (1000 * 60 * 60 * 24)
          )} days left`;
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);

  const filteredEvents = events
    .filter(
      (event) =>
        event.name.toLowerCase().includes(search.toLowerCase()) &&
        (filterType === "All" || event.type === filterType)
    )
    .filter((event) => sortByPopularity === "all" || event.popular);

  const copyEventLink = (id: number) => {
    navigator.clipboard.writeText(`${window.location.href}#event-${id}`);
    alert("Event link copied!");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white">
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Failed to load events: {error}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden p-6">
      {/* Background */}
      <Background />

      <h1
        style={{ fontFamily: "Nippo, sans-serif" }}
        className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#36C1F6] to-[#657FFF] mb-8 relative z-10"
      >
        Events
      </h1>

      {/* Search + Filter  */}
      <div className="flex flex-wrap gap-4 mb-8 relative z-10">
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

        {["All", "Hackathon", "Workshop", "Cultural", "Sports", "Seminar"].map(
          (type) => (
            <button
              key={type}
              onClick={() => setFilterType(type as EventType | "All")}
              className={`px-4 py-2 rounded-full font-semibold ${
                filterType === type
                  ? "bg-[#16D3AC] text-black"
                  : "bg-white/10 text-[#B0B3C0] backdrop-blur-sm"
              } transition`}
            >
              {type}
            </button>
          )
        )}

        <button
          onClick={() =>
            setSortByPopularity(sortByPopularity === "all" ? "popular" : "all")
          }
          className={`px-4 py-2 rounded-full font-semibold ${
            sortByPopularity === "popular"
              ? "bg-[#16D3AC] text-black"
              : "bg-white/10 text-[#B0B3C0] backdrop-blur-sm"
          } transition`}
        >
          Popular
        </button>
      </div>

      {/* Event Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="relative w-full h-80 perspective cursor-pointer"
            onClick={() =>
              setSelectedEvent(selectedEvent?.id === event.id ? null : event)
            }
          >
            <div
              className={`relative w-full h-full duration-700 transform-style-3d ${
                selectedEvent?.id === event.id ? "rotate-y-180" : ""
              }`}
            >
              {/* Front */}
              <div className="absolute w-full h-full backface-hidden bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20 flex flex-col">
                <img
                  src={event.image_url}
                  alt={event.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h2 className="text-xl font-semibold text-white">
                    {event.name}
                  </h2>
                  <p className="text-[#B0B3C0] text-sm mt-2">
                    {event.description.slice(0, 50)}...
                  </p>
                  <div className="flex justify-between items-center text-[#B0B3C0] mt-6 text-sm">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt /> {event.date}
                    </div>
                    <span>Attendees: {event.attendees || 0}</span>
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt /> {event.venue}
                    </div>
                  </div>
                </div>
              </div>

              {/* Back */}
              <div
                className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-black/60 to-[#0a0a1a]/70 backdrop-blur-xl rounded-2xl border border-white/20 p-4 flex flex-col justify-between cursor-pointer overflow-y-auto"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedEvent(event);
                }}
              >
                <h2 className="text-2xl font-bold text-[#36C1F6] mb-2">
                  {event.name}
                </h2>
                <p className="text-[#B0B3C0]">{event.description}</p>
                <p className="text-[#B0B3C0] mt-2 text-sm">
                  {event.moreDetails}
                </p>
                <div className="flex justify-between items-center text-sm text-[#B0B3C0] mt-4">
                  <span>Attendees: {event.attendees || 0}</span>
                  <span>{countdowns[event.id]}</span>
                </div>
                <p className="text-sm text-[#B0B3C0] mt-1">
                  👥 Team Size: {event.teamSize || "N/A"}
                </p>
                <p className="text-xs text-[#B0B3C0] mt-2">
                  Click to expand full info
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Modal */}
      {expandedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="relative bg-gradient-to-br from-[#0f172a]/80 to-black/70 backdrop-blur-2xl rounded-2xl p-6 max-w-4xl w-full overflow-y-auto max-h-[90vh] border border-white/20 shadow-2xl">
            <button
              onClick={() => setExpandedEvent(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white text-3xl"
            >
              <IoClose />
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={expandedEvent.image_url}
                className="md:w-1/2 w-full rounded-lg shadow-lg"
              />
              <div className="flex-1 flex flex-col gap-2">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#36C1F6] to-[#657FFF]">
                  {expandedEvent.name}
                </h2>
                <p className="text-[#B0B3C0]">{expandedEvent.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-white/10 backdrop-blur-sm text-[#B0B3C0] px-3 py-1 rounded-full text-sm">
                    📅 Date: {expandedEvent.date}
                  </span>
                  <span className="bg-white/10 backdrop-blur-sm text-[#B0B3C0] px-3 py-1 rounded-full text-sm">
                    📍 Venue: {expandedEvent.venue}
                  </span>
                  <span className="bg-white/10 backdrop-blur-sm text-[#B0B3C0] px-3 py-1 rounded-full text-sm">
                    👥 Team Size: {expandedEvent.teamSize || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => copyEventLink(expandedEvent.id)}
                className="bg-[#16D3AC] text-black px-4 py-2 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <FaShareAlt /> Share
              </button>
              <button
                onClick={() => {
                  setRegistrationform(true);
                }}
                className="bg-[#657FFF] text-white px-4 py-2 rounded-xl font-semibold hover:scale-105 transition-transform"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flip Card Styles */}
      <style>{`
        .perspective { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .duration-700 { transition: transform 0.7s; }
      `}</style>

      {openRegistration && expandedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-[100] p-4">
          <RegisterPage eventId={String(expandedEvent.id)} />
        </div>
      )}
    </div>
  );
};

export default EventsPage;
