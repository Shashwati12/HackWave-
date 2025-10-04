"use client";

import React, { useMemo, useState } from "react";
import { CalendarClock, Users, Star, Activity, Search, Filter } from "lucide-react";

// ---------- Types ----------
type EventStatus = "Completed" | "Cancelled" | "Draft";

type HostEvent = {
  id: string;
  name: string;
  type: string;
  date: string;
  status: EventStatus;
  participants: number;
  avgRating: number;
  banner?: string;
  team: { id: string; name: string; role: string; contributions: number }[];
  topComments?: string[];
};

// ---------- Mock Data ----------
const MOCK_EVENTS: HostEvent[] = [
  {
    id: "e1",
    name: "Intercollege Hackathon 2025",
    type: "Hackathon",
    date: "2025-08-14",
    status: "Completed",
    participants: 420,
    avgRating: 4.6,
    team: [
      { id: "t1", name: "Anushka B.", role: "Lead", contributions: 14 },
      { id: "t2", name: "Shubham K.", role: "Volunteer", contributions: 4 },
    ],
    topComments: ["Amazing organization and support!", "Loved the mentoring sessions — very helpful."],
  },
  {
    id: "e2",
    name: "Campus Cultural Fest",
    type: "Cultural",
    date: "2024-12-18",
    status: "Completed",
    participants: 980,
    avgRating: 4.2,
    team: [
      { id: "t1", name: "Anushka B.", role: "Coordinator", contributions: 7 },
      { id: "t3", name: "Riya P.", role: "Designer", contributions: 6 },
    ],
    topComments: ["Fantastic line-up", "Great vibes and execution"],
  },
  {
    id: "e3",
    name: "Guest Lecture: AI Ethics",
    type: "Seminar",
    date: "2025-06-02",
    status: "Cancelled",
    participants: 0,
    avgRating: 0,
    team: [],
    topComments: [],
  },
];

// ---------- Helpers ----------
const formatDate = (iso: string) => new Date(iso).toLocaleDateString();

const statusColor = (status: EventStatus) =>
  status === "Completed"
    ? "bg-[#16D3AC]"
    : status === "Cancelled"
    ? "bg-red-500"
    : "bg-yellow-400";

// ---------- Component ----------
export default function HostHistoryPage() {
  const [events] = useState<HostEvent[]>(MOCK_EVENTS);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | "All">("All");
  const [statusFilter, setStatusFilter] = useState<EventStatus | "All">("All");
  const [selectedEvent, setSelectedEvent] = useState<HostEvent | null>(events[0] ?? null);

  const types = useMemo(() => Array.from(new Set(events.map((e) => e.type))), [events]);

  const filtered = useMemo(() => {
    return events
      .filter((e) => (typeFilter === "All" ? true : e.type === typeFilter))
      .filter((e) => (statusFilter === "All" ? true : e.status === statusFilter))
      .filter((e) => e.name.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [events, query, typeFilter, statusFilter]);

  const kpis = useMemo(() => {
    const total = events.length;
    const avgParticipants = Math.round(
      events.reduce((s, e) => s + e.participants, 0) / Math.max(1, total)
    );
    const avgRating = Number(
      (events.reduce((s, e) => s + e.avgRating, 0) / Math.max(1, total)).toFixed(2)
    );
    return { total, avgParticipants, avgRating };
  }, [events]);

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-wide">Host History</h1>
          <p className="text-sm text-[#A0A2A8]">
            A futuristic overview of your past events, performance & insights
          </p>
        </div>
        <div className="flex gap-3 items-center flex-wrap">
          <div className="flex items-center border border-zinc-700 rounded-xl px-3 py-2 bg-zinc-900/60 backdrop-blur-md text-sm w-full sm:w-auto">
            <Search size={16} />
            <input
              aria-label="Search events"
              placeholder="Search events..."
              className="ml-2 bg-transparent outline-none text-white placeholder:text-[#8e9096] w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="px-4 py-2 rounded-xl bg-[#16D3AC] text-black font-semibold hover:bg-[#1ce1b4] transition">
            + New Event
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <KpiCard title="Total Events" value={String(kpis.total)} icon={<Activity size={20} />} />
        <KpiCard title="Avg Participants" value={String(kpis.avgParticipants)} icon={<Users size={20} />} />
        <KpiCard title="Avg Rating" value={String(kpis.avgRating)} icon={<Star size={20} />} />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 bg-zinc-900/40 backdrop-blur-lg rounded-2xl p-4 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Timeline</h2>
            <div className="flex gap-2 items-center text-sm">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-transparent outline-none border border-zinc-700 px-2 py-1 rounded-lg"
              >
                <option value="All">All Types</option>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="bg-transparent outline-none border border-zinc-700 px-2 py-1 rounded-lg"
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          <ol className="space-y-4 relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-700/60" />
            {filtered.map((ev) => (
              <li key={ev.id} className="relative pl-10">
                <button
                  onClick={() => setSelectedEvent(ev)}
                  className="block w-full p-4 rounded-xl text-left bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700 transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">{ev.name}</div>
                      <div className="text-sm text-[#A0A2A8]">
                        {ev.type} • {formatDate(ev.date)}
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div>{ev.participants} participants</div>
                      <div className="text-xs text-[#A0A2A8]">Rating: {ev.avgRating || "—"}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-[#A0A2A8]">
                    {ev.topComments?.[0] || "No highlights"}
                  </div>
                </button>
                <span
                  className={`absolute left-3 top-6 w-3 h-3 rounded-full ${statusColor(
                    ev.status
                  )}`}
                />
              </li>
            ))}
          </ol>
        </div>

        {/* Side Panel */}
        <aside className="bg-zinc-900/40 backdrop-blur-lg border border-zinc-800 rounded-2xl p-4 sticky top-6 h-[70vh] overflow-auto">
          {selectedEvent ? (
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-bold">{selectedEvent.name}</h3>
                <div className="text-sm text-[#A0A2A8]">
                  {selectedEvent.type} • {formatDate(selectedEvent.date)}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 mb-6">
                <MiniMetric label="Participants" value={String(selectedEvent.participants)} />
                <MiniMetric label="Avg Rating" value={String(selectedEvent.avgRating || "—")} />
                <MiniMetric label="Team Size" value={String(selectedEvent.team.length)} />
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">Feedback & Insights</h4>
                <div className="space-y-2 text-sm text-[#A0A2A8]">
                  {selectedEvent.topComments?.length ? (
                    selectedEvent.topComments.map((c, i) => (
                      <div
                        key={i}
                        className="p-2 bg-zinc-800/50 rounded-lg border border-zinc-700"
                      >
                        {c}
                      </div>
                    ))
                  ) : (
                    <div className="p-2 bg-zinc-800/50 rounded-lg">No feedback available</div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">Team Overview</h4>
                <div className="flex gap-2 overflow-x-auto py-2">
                  {selectedEvent.team.length ? (
                    selectedEvent.team.map((m) => (
                      <div
                        key={m.id}
                        className="flex-none p-3 bg-zinc-800/50 border border-zinc-700 rounded-lg w-48"
                      >
                        <div className="font-semibold">{m.name}</div>
                        <div className="text-sm text-[#A0A2A8]">{m.role}</div>
                        <div className="text-xs mt-2 text-[#A0A2A8]">
                          Contributions: {m.contributions}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 bg-zinc-800/50 rounded-lg">No team data</div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-lg bg-[#16D3AC] text-black font-semibold hover:bg-[#1ce1b4] transition">
                  View Analytics
                </button>
                <button className="flex-1 py-2 rounded-lg border border-zinc-700 text-sm hover:bg-zinc-800 transition">
                  Export Report
                </button>
              </div>
            </div>
          ) : (
            <div className="text-[#A0A2A8]">Select an event to see details</div>
          )}
        </aside>
      </div>

      {/* Top Highlights */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Top Event Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events
            .filter((e) => e.avgRating > 4 || e.participants > 300)
            .slice(0, 3)
            .map((ev) => (
              <div
                key={ev.id}
                className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:bg-zinc-800/60 transition flex items-center gap-4"
              >
                <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-[#16D3AC]/20 text-[#16D3AC]">
                  <CalendarClock size={22} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{ev.name}</div>
                  <div className="text-sm text-[#A0A2A8]">
                    {ev.participants} participants • Rating {ev.avgRating || "—"}
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-[#16D3AC] text-black text-sm font-semibold hover:bg-[#1ce1b4] transition">
                  View
                </button>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

// ---------- Small Components ----------
function KpiCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex items-center gap-4 hover:bg-zinc-800/60 transition backdrop-blur-md">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#16D3AC]/20 text-[#16D3AC]">
        {icon}
      </div>
      <div>
        <div className="text-sm text-[#A0A2A8]">{title}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700 flex items-center justify-between text-sm">
      <span className="text-[#A0A2A8]">{label}</span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  );
}
