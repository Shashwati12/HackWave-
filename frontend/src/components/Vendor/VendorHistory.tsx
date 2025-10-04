import React, { useMemo, useState } from "react";
import { FaCalendarAlt, FaMoneyBillWave, FaStar, FaBox, FaFilter, FaFilePdf, FaChartBar, FaEnvelope } from "react-icons/fa";

type EventType = "Tech" | "Cultural" | "Food" | "Merch" | "Logistics";

type VendorEvent = {
  id: number;
  name: string;
  host: string;
  type: EventType;
  date: string; // ISO
  status: "Completed" | "Pending" | "Cancelled";
  revenue: number; // in INR
  units: number;
  rating?: number; // 1-5
  feedback?: string[];
  images?: string[];
};

const SAMPLE_EVENTS: VendorEvent[] = [
  { id: 1, name: "HackWave 2025 - Food Counters", host: "HackWave", type: "Food", date: "2025-03-14", status: "Completed", revenue: 45000, units: 1200, rating: 4.8, feedback: ["Excellent service", "Timely delivery", "Kids loved the menu"], images: ["/images/cert1.jpg", "/images/event1.jpg"] },
  { id: 2, name: "E-Summit Merchandise", host: "E-Summit Club", type: "Merch", date: "2025-01-21", status: "Completed", revenue: 32000, units: 450, rating: 4.6, feedback: ["Quality was top-notch", "Good packaging"], images: ["/images/cert2.jpg"] },
  { id: 3, name: "Cultural Night - Stage Setup", host: "Drama Society", type: "Logistics", date: "2025-02-10", status: "Completed", revenue: 15000, units: 1, rating: 4.4, feedback: ["Professional crew", "Sound was great"], images: ["/images/event3.jpg"] },
  { id: 4, name: "Tech Symposium - Catering", host: "Tech Club", type: "Food", date: "2024-11-05", status: "Completed", revenue: 27000, units: 650, rating: 4.5, feedback: ["Good vegan options"], images: ["/images/cert3.jpg"] },
];

const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function VendorHistory(): JSX.Element {
  const [events] = useState<VendorEvent[]>(SAMPLE_EVENTS);
  const [filterType, setFilterType] = useState<EventType | "All">("All");
  const [query, setQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (filterType !== "All" && e.type !== filterType) return false;
      if (query && !(`${e.name} ${e.host}`.toLowerCase().includes(query.toLowerCase()))) return false;
      return true;
    });
  }, [events, filterType, query]);

  // KPIs
  const totalEvents = events.length;
  const totalRevenue = events.reduce((s, e) => s + e.revenue, 0);
  const avgRating = (events.reduce((s, e) => s + (e.rating ?? 0), 0) / Math.max(1, events.filter((e) => e.rating).length)) || 0;
  const totalUnits = events.reduce((s, e) => s + e.units, 0);
  const mostFrequentType = (() => {
    const count: Record<string, number> = {};
    events.forEach((e) => (count[e.type] = (count[e.type] || 0) + 1));
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";
  })();
  const topClients = (() => {
    const count: Record<string, number> = {};
    events.forEach((e) => (count[e.host] = (count[e.host] || 0) + 1));
    return Object.entries(count).sort((a, b) => b[1] - a[1]).slice(0, 2).map((x) => x[0]);
  })();

  // Analytics data
  const revenueTrend = useMemo(() => {
    const map: Record<string, number> = {};
    events.forEach((e) => {
      const d = new Date(e.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      map[key] = (map[key] || 0) + e.revenue;
    });
    return Object.entries(map).sort().map(([k, v]) => ({ month: k, revenue: v }));
  }, [events]);

  const ratingTrend = useMemo(() => events.map((e) => ({ label: e.name, rating: e.rating ?? 0 })), [events]);

  const contactHost = (host: string) => {
    const subject = encodeURIComponent(`Inquiry about past event collaboration`);
    const body = encodeURIComponent(`Hi ${host},%0D%0A\nI would like to discuss a potential collaboration for an upcoming event.`);
    window.open(`mailto:hello@${host.replace(/\s+/g, "").toLowerCase()}.com?subject=${subject}&body=${body}`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#36C1F6] to-[#657FFF]">Vendor History</h1>
        <p className="text-[#B0B3C0] mt-2">Track your event contributions, earnings, and reputation.</p>
        <div className="w-24 h-0.5 bg-[#16D3AC] mt-4 rounded" />
      </header>

      {/* KPI Row */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <KPI label="Total Events Supplied" value={totalEvents.toString()} icon={<FaCalendarAlt />} />
        <KPI label="Total Revenue" value={formatINR(totalRevenue)} icon={<FaMoneyBillWave />} />
        <KPI label="Average Rating" value={avgRating ? avgRating.toFixed(1) : "-"} icon={<FaStar />} />
        <KPI label="Units Delivered" value={totalUnits.toString()} icon={<FaBox />} />
      </section>

      {/* Filter + Timeline */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Timeline */}
        <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-md rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Event Timeline</h3>
            <div className="flex items-center gap-2">
              <input
                className="bg-gray-800/40 backdrop-blur-sm px-3 py-1 rounded text-white placeholder:text-[#7f8288]"
                placeholder="Search event or host"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="bg-gray-800/40 backdrop-blur-sm px-3 py-1 rounded text-[#B0B3C0]"
              >
                <option value="All">All Types</option>
                <option value="Tech">Tech</option>
                <option value="Cultural">Cultural</option>
                <option value="Food">Food</option>
                <option value="Merch">Merch</option>
                <option value="Logistics">Logistics</option>
              </select>
              <button className="bg-[#16D3AC] text-black px-3 py-1 rounded hover:scale-105 transition" onClick={() => setShowFilterModal(true)}>
                <FaFilter />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filtered.length === 0 && <div className="text-[#B0B3C0]">No events match your filters.</div>}
            {filtered.map((e) => (
              <div key={e.id} className="bg-gray-900/50 backdrop-blur-md rounded-xl p-4 border border-[#16D3AC]/20 hover:border-[#16D3AC] transition">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-[#B0B3C0]">{new Date(e.date).toLocaleDateString()}</div>
                    <div className="text-lg font-semibold">{e.name}</div>
                    <div className="text-sm text-[#B0B3C0]">{e.host} • {e.type}</div>
                    <StarRow rating={e.rating} />
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{formatINR(e.revenue)}</div>
                    <div className="text-xs text-[#B0B3C0]">{e.units} units</div>
                    <div className="flex flex-col gap-2 mt-2">
                      <button onClick={() => contactHost(e.host)} className="px-3 py-1 rounded bg-[#16D3AC] text-black font-medium hover:scale-105 transition">Contact Host</button>
                      <button onClick={() => alert(`Open details for ${e.name}`)} className="px-3 py-1 rounded border border-[#222428] text-[#B0B3C0] hover:border-[#16D3AC] transition">Details</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Analytics */}
        <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-4 shadow-sm space-y-4">
          <h4 className="font-semibold mb-2">Analytics</h4>
          <div>
            <div className="text-sm text-[#B0B3C0]">Revenue Trend</div>
            <Sparkline data={revenueTrend.map((r) => r.revenue)} />
          </div>
          <div>
            <div className="text-sm text-[#B0B3C0]">Rating Trend</div>
            <MiniBarChart data={ratingTrend.map((r) => r.rating)} labels={ratingTrend.map((r) => r.label)} />
          </div>
          <div>
            <div className="text-sm text-[#B0B3C0]">Event Type Share</div>
            <TypeDistribution events={events} />
          </div>
        </div>
      </section>

      {/* Feedback & Recognition */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 space-y-4">
          <h4 className="font-semibold">Top Feedback</h4>
          {events.slice(0, 3).map((e) => (
            <div key={e.id} className="bg-gray-900/50 backdrop-blur-md rounded-xl p-4 border border-[#16D3AC]/20 hover:border-[#16D3AC] transition">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-medium">{e.host} — <span className="text-[#B0B3C0]">{e.name}</span></div>
                  <div className="text-xs text-[#B0B3C0] mt-1">{new Date(e.date).toLocaleDateString()}</div>
                  <div className="mt-2 text-sm text-[#B0B3C0]">“{(e.feedback && e.feedback[0]) || "No feedback"}”</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">{formatINR(e.revenue)}</div>
                  <div className="text-xs text-[#B0B3C0]">{e.units} units</div>
                  <StarRow rating={e.rating} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h4 className="font-semibold mb-3">Recognition</h4>
          <div className="flex gap-2 overflow-x-auto">
            {events.flatMap((e) => (e.images || [])).map((src, idx) => (
              <div key={idx} className="w-28 h-20 flex-shrink-0 rounded-xl overflow-hidden border border-[#16D3AC]/20 hover:scale-105 transition">
                <img src={src} alt="certificate" className="w-full h-full object-cover" />
              </div>
            ))}
            {events.flatMap((e) => (e.images || [])).length === 0 && <div className="text-[#B0B3C0]">No certificates uploaded yet.</div>}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row items-center justify-between gap-3 mt-4 text-sm text-[#B0B3C0]">
        <div>Updated: {new Date().toLocaleDateString()}</div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-3 py-2 rounded bg-gray-900/50 border border-[#16D3AC]/20 hover:border-[#16D3AC] transition">
            <FaFilePdf className="text-[#16D3AC]" />
            Export PDF
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded bg-[#16D3AC] text-black font-semibold hover:scale-105 transition">
            <FaChartBar />
            Compare
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded bg-gray-900/50 border border-[#16D3AC]/20 hover:border-[#16D3AC] transition" onClick={() => setShowFilterModal(true)}>
            <FaFilter className="text-[#16D3AC]" />
            Filters
          </button>
        </div>
      </footer>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="w-full max-w-md bg-gray-900/50 backdrop-blur-md rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-3">Filters</h3>
            <div className="space-y-3">
              <label className="text-sm text-[#B0B3C0]">Event Type</label>
              <select className="w-full bg-gray-800/40 backdrop-blur-sm rounded px-3 py-2" onChange={(e) => setFilterType(e.target.value as any)} value={filterType}>
                <option value="All">All</option>
                <option value="Tech">Tech</option>
                <option value="Cultural">Cultural</option>
                <option value="Food">Food</option>
                <option value="Merch">Merch</option>
                <option value="Logistics">Logistics</option>
              </select>

              <label className="text-sm text-[#B0B3C0]">Search</label>
              <input className="w-full bg-gray-800/40 backdrop-blur-sm rounded px-3 py-2" placeholder="Event or host" value={query} onChange={(e) => setQuery(e.target.value)} />

              <div className="flex justify-end gap-2 mt-4">
                <button className="px-3 py-2 rounded bg-gray-900/50 text-[#B0B3C0]" onClick={() => setShowFilterModal(false)}>Close</button>
                <button className="px-3 py-2 rounded bg-[#16D3AC] text-black" onClick={() => setShowFilterModal(false)}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------ Reusable small components ------------------ */
function KPI({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-4 flex items-center gap-3 shadow-sm">
      <div className="p-3 rounded bg-gray-800/40 text-[#16D3AC] w-12 h-12 flex items-center justify-center text-xl">{icon}</div>
      <div>
        <div className="text-sm text-[#B0B3C0]">{label}</div>
        <div className="text-lg font-semibold">{value}</div>
      </div>
    </div>
  );
}

function StarRow({ rating }: { rating?: number }) {
  const r = Math.round((rating ?? 0) * 2) / 2;
  const stars = [] as React.ReactNode[];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(r)) stars.push(<FaStar key={i} className="text-yellow-400" />);
    else if (i - 0.5 === r) stars.push(<span key={i} className="text-yellow-400">☆</span>);
    else stars.push(<FaStar key={i} className="text-[#2b2c2f]" />);
  }
  return <div className="flex items-center gap-1">{stars}</div>;
}

function Sparkline({ data }: { data: number[] }) {
  if (!data || data.length === 0) return <div className="text-sm text-[#B0B3C0]">No data</div>;
  const max = Math.max(...data);
  const points = data.map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d / max) * 100}`).join(" ");
  return <svg viewBox="0 0 100 100" className="w-full h-16 mt-2"><polyline points={points} fill="none" stroke="#16D3AC" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function MiniBarChart({ data, labels }: { data: number[]; labels?: string[] }) {
  if (!data || data.length === 0) return <div className="text-sm text-[#B0B3C0]">No data</div>;
  const max = Math.max(...data);
  return <div className="flex items-end gap-2 mt-2 h-20">{data.map((d, i) => (
    <div key={i} className="flex flex-col items-center w-6">
      <div className="w-full rounded-t" style={{ height: `${(d / max) * 100}%`, background: "linear-gradient(180deg,#16D3AC,#0ea79a)" }} />
      <div className="text-xs text-[#B0B3C0] mt-1 truncate w-16 text-center">{labels?.[i]?.slice(0, 8)}</div>
    </div>
  ))}</div>;
}

function TypeDistribution({ events }: { events: VendorEvent[] }) {
  const map: Record<string, number> = {};
  events.forEach((e) => (map[e.type] = (map[e.type] || 0) + 1));
  const total = events.length || 1;
  const colors = { Tech: "#36C1F6", Cultural: "#657FFF", Food: "#16D3AC", Merch: "#fbb13c", Logistics: "#f8e16c" } as Record<string, string>;
  return <div className="flex items-center gap-3 mt-2">{Object.entries(map).map(([k, v]) => (
    <div key={k} className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full" style={{ background: colors[k] || "#90e0ef" }} />
      <div className="text-sm text-[#B0B3C0]">{k} <span className="text-white font-semibold">{Math.round((v / total) * 100)}%</span></div>
    </div>
  ))}</div>;
}
