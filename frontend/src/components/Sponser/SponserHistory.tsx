// SponsorHistoryPage.tsx
"use client";

import React, { useMemo, useState } from "react";
import {
  Search,
  DollarSign,
  Users,
  Star,
  Award,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * SponsorHistoryPage
 *
 * Single-file TSX: Sponsor dashboard with practical features:
 * - KPIs
 * - ROI mini-chart (contribution vs reach)
 * - Event-type donut (SVG)
 * - Interactive timeline with logo hover
 * - Impact metrics & progress bars
 * - Recognition carousel
 * - Loyalty badges
 * - Export Report (opens print-ready popup)
 *
 * Styling: TailwindCSS classes (dark base, teal accents #16D3AC)
 */

/* ---------- Types ---------- */
type Sponsorship = {
  id: string;
  event: string;
  host: string;
  type: "Hackathon" | "Cultural" | "Seminar" | "Workshop" | "Other";
  date: string; // ISO
  contributionType: "Cash" | "In-kind" | "Tech" | "Media";
  amount: number; // INR or generic currency
  reach: number; // participants/reach metric
  impressions?: number; // social impressions
  engagement?: number; // percent 0-100
  logo?: string; // optional logo URL
  recognition?: string[]; // certificate/posters URLs
  notes?: string;
};

/* ---------- Mock Data (replace with real API) ---------- */
const MOCK_SPONSORSHIPS: Sponsorship[] = [
  {
    id: "s1",
    event: "Intercollege Hackathon 2025",
    host: "LPU Tech Society",
    type: "Hackathon",
    date: "2025-08-14",
    contributionType: "Cash",
    amount: 200000,
    reach: 420,
    impressions: 3200,
    engagement: 85,
    logo: "", // optional: "/logos/company1.png"
    recognition: ["/images/cert1.jpg", "/images/poster1.jpg"],
    notes: "Stage logo + mentor booth",
  },
  {
    id: "s2",
    event: "Campus Cultural Fest 2024",
    host: "LPU Arts Club",
    type: "Cultural",
    date: "2024-12-18",
    contributionType: "In-kind",
    amount: 100000,
    reach: 980,
    impressions: 5200,
    engagement: 72,
    logo: "",
    recognition: ["/images/cert2.jpg"],
    notes: "Main banner + stall",
  },
  {
    id: "s3",
    event: "Guest Lecture: AI Ethics",
    host: "AI Dept",
    type: "Seminar",
    date: "2025-06-02",
    contributionType: "Cash",
    amount: 50000,
    reach: 150,
    impressions: 600,
    engagement: 64,
    logo: "",
    recognition: [],
    notes: "Guest honorarium, logo on slides",
  },
  {
    id: "s4",
    event: "Web Dev Workshop",
    host: "Dev Club",
    type: "Workshop",
    date: "2025-04-02",
    contributionType: "Tech",
    amount: 25000,
    reach: 120,
    impressions: 900,
    engagement: 78,
    logo: "",
    recognition: ["/images/cert3.jpg"],
    notes: "Provided cloud credits + swag",
  },
];

/* ---------- Helpers ---------- */
const formatCurrency = (n: number) =>
  n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${n.toLocaleString()}`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });

const loyaltyTier = (count: number) => {
  if (count >= 10) return { name: "Platinum", color: "text-[#b98cff]" };
  if (count >= 6) return { name: "Gold", color: "text-[#FFD166]" };
  if (count >= 3) return { name: "Silver", color: "text-[#C0C0C0]" };
  return { name: "Bronze", color: "text-[#E8B988]" };
};

/* ---------- Small visual components ---------- */
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-md p-4 ${className}`}
    >
      {children}
    </div>
  );
}

function Kpi({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-12 h-12 rounded-xl bg-[#16D3AC]/10 text-[#16D3AC] flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-sm text-[#A0A2A8]">{label}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}

/* ---------- SVG Charts (small & lightweight) ---------- */

/* ROI Bars: contribution vs reach (normalized) */
function RoiBars({ items }: { items: Sponsorship[] }) {
  // normalize amounts and reach to a max width (0..1)
  const maxAmount = Math.max(...items.map((i) => i.amount), 1);
  const maxReach = Math.max(...items.map((i) => i.reach), 1);

  return (
    <div className="space-y-3">
      {items.map((it) => {
        const aRatio = Math.min(1, it.amount / maxAmount);
        const rRatio = Math.min(1, it.reach / maxReach);
        return (
          <div key={it.id} className="flex items-center gap-3">
            <div className="w-36 text-sm">{it.event}</div>
            <div className="flex-1 space-y-1">
              <div className="h-2 bg-zinc-800 rounded overflow-hidden">
                <div
                  className="h-2 rounded"
                  style={{
                    width: `${Math.max(8, aRatio * 100)}%`,
                    background: "linear-gradient(90deg,#16D3AC, #36C1F6)",
                    opacity: 0.85,
                  }}
                  title={`Contribution: ${formatCurrency(it.amount)}`}
                />
              </div>
              <div className="h-2 bg-zinc-800 rounded overflow-hidden">
                <div
                  className="h-2 rounded"
                  style={{
                    width: `${Math.max(8, rRatio * 100)}%`,
                    background: "#657FFF",
                    opacity: 0.7,
                  }}
                  title={`Reach: ${it.reach}`}
                />
              </div>
            </div>
            <div className="w-24 text-right text-sm text-[#A0A2A8]">
              {formatCurrency(it.amount)} • {it.reach}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* Donut for event type split */
function Donut({ items }: { items: Sponsorship[] }) {
  const counts = items.reduce<Record<string, number>>((acc, cur) => {
    acc[cur.type] = (acc[cur.type] || 0) + 1;
    return acc;
  }, {});
  const total = items.length || 1;
  const colors: Record<string, string> = {
    Hackathon: "#16D3AC",
    Cultural: "#657FFF",
    Seminar: "#36C1F6",
    Workshop: "#8BD3FF",
    Other: "#9CA3AF",
  };

  // build arcs
  let start = 0;
  const arcs = Object.entries(counts).map(([k, v]) => {
    const portion = v / total;
    const end = start + portion;
    const path = donutArcPath(start, end);
    const stroke = colors[k] ?? "#9CA3AF";
    start = end;
    return { key: k, v, path, stroke, portion };
  });

  return (
    <div className="flex items-center gap-4">
      <svg width="120" height="120" viewBox="-1 -1 2 2" className="rounded-full">
        <g transform="rotate(-90)">
          {arcs.map((a, i) => (
            <path
              key={i}
              d={a.path}
              stroke={a.stroke}
              strokeWidth={0.3}
              fill="none"
              strokeLinecap="butt"
            />
          ))}
        </g>
      </svg>

      <div className="text-sm">
        {arcs.map((a) => (
          <div key={a.key} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded" style={{ background: a.stroke }} />
            <span className="text-[#A0A2A8]">{a.key}</span>
            <span className="ml-2 font-semibold">{Math.round(a.portion * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* tiny donut arc generator (svg path in normalized coord system) */
function donutArcPath(startPort: number, endPort: number) {
  const r = 0.9;
  const inner = 0.6;
  const startAngle = startPort * Math.PI * 2;
  const endAngle = endPort * Math.PI * 2;
  const x1 = Math.cos(startAngle) * r;
  const y1 = Math.sin(startAngle) * r;
  const x2 = Math.cos(endAngle) * r;
  const y2 = Math.sin(endAngle) * r;
  const large = endPort - startPort > 0.5 ? 1 : 0;
  // outer arc
  const outer = `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  // inner arc back
  const x3 = Math.cos(endAngle) * inner;
  const y3 = Math.sin(endAngle) * inner;
  const x4 = Math.cos(startAngle) * inner;
  const y4 = Math.sin(startAngle) * inner;
  const innerArc = `L ${x3} ${y3} A ${inner} ${inner} 0 ${large} 0 ${x4} ${y4} Z`;
  return `${outer} ${innerArc}`;
}

/* ---------- Main Component ---------- */
export default function SponsorHistoryPage() {
  const [items] = useState<Sponsorship[]>(MOCK_SPONSORSHIPS);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(items[0]?.id ?? null);
  const selected = items.find((i) => i.id === selectedId) ?? null;

  /* KPIs */
  const kpis = useMemo(() => {
    const totalEvents = items.length;
    const totalAmount = items.reduce((s, i) => s + i.amount, 0);
    const totalReach = items.reduce((s, i) => s + i.reach, 0);
    const avgRoi = Math.round((totalReach / Math.max(1, totalAmount)) * 1000) / 100; // arbitrary normalized
    const repeatCount = items.length; // simple placeholder; if sponsor repeats across many events, compute separately
    return { totalEvents, totalAmount, totalReach, avgRoi, repeatCount };
  }, [items]);

  /* Filtered list */
  const filtered = useMemo(
    () =>
      items.filter(
        (it) =>
          it.event.toLowerCase().includes(query.toLowerCase()) ||
          it.host.toLowerCase().includes(query.toLowerCase())
      ),
    [items, query]
  );

  /* Loyalty */
  const tier = loyaltyTier(items.length);

  /* Export (print-friendly) */
  const exportReport = () => {
    const popup = window.open("", "_blank", "width=900,height=700");
    if (!popup) return;
    const html = `
      <html>
      <head>
        <title>Sponsorship Report</title>
        <style>
          body { font-family: Inter, system-ui, -apple-system, sans-serif; background: #0b0b0c; color: #fff; padding: 24px;}
          .card { background:#0f1720; border:1px solid #222; padding:16px; border-radius:10px; margin-bottom:12px;}
          h1 { color:#16D3AC; }
          table { width:100%; border-collapse: collapse; margin-top:8px;}
          th, td { border-bottom:1px solid #222; padding:8px; text-align:left; color:#c9ccd1; }
        </style>
      </head>
      <body>
        <h1>Sponsorship Report</h1>
        <div class="card">
          <div>Total sponsored events: ${kpis.totalEvents}</div>
          <div>Total contribution: ${formatCurrency(kpis.totalAmount)}</div>
          <div>Total reach: ${kpis.totalReach}</div>
          <div>Avg ROI: ${kpis.avgRoi}</div>
        </div>
        ${items
          .map(
            (it) => `<div class="card">
          <strong>${it.event}</strong> — ${formatDate(it.date)}<br/>
          Host: ${it.host}<br/>
          Contribution: ${it.contributionType} • ${formatCurrency(it.amount)}<br/>
          Reach: ${it.reach} • Engagement: ${it.engagement || "—"}%<br/>
          Notes: ${it.notes || "—"}
        </div>`
          )
          .join("")}
        <div style="color:#888;font-size:12px;margin-top:20px;">Generated: ${new Date().toLocaleString()}</div>
      </body></html>
    `;
    popup.document.write(html);
    popup.document.close();
    // auto-invoke print
    popup.focus();
    setTimeout(() => popup.print(), 600);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Sponsor History</h1>
          <div className="text-sm text-[#A0A2A8] mt-1">
            Track contributions, visibility and real impact — export a report for stakeholders.
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-zinc-800 rounded-xl px-3 py-2 bg-zinc-900/60">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="ml-2 bg-transparent outline-none placeholder:text-[#7f8287]"
              placeholder="Search events or hosts..."
            />
          </div>
          <button
            onClick={exportReport}
            className="px-3 py-2 rounded-lg bg-[#16D3AC] text-black font-semibold hover:opacity-95"
          >
            Export Report
          </button>
        </div>
      </header>

      {/* Top KPIs + loyalty */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <GlassCard>
          <Kpi label="Total Sponsored Events" value={String(kpis.totalEvents)} icon={<Star size={18} />} />
        </GlassCard>

        <GlassCard>
          <Kpi label="Total Contribution" value={formatCurrency(kpis.totalAmount)} icon={<DollarSign size={18} />} />
        </GlassCard>

        <GlassCard>
          <Kpi label="Total Reach" value={String(kpis.totalReach)} icon={<Users size={18} />} />
        </GlassCard>

        <GlassCard>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#16D3AC]/10 text-[#16D3AC] flex items-center justify-center">
              <Award size={18} />
            </div>
            <div>
              <div className="text-sm text-[#A0A2A8]">Loyalty</div>
              <div className="text-lg font-semibold flex items-center gap-2">
                <span className={tier.color}>{tier.name}</span>
                <span className="text-sm text-[#A0A2A8]">({items.length} events)</span>
              </div>
              <div className="text-xs mt-1 text-[#8f9398]">Avg ROI: {kpis.avgRoi}</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Middle: ROI chart + Donut + small top events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-[#A0A2A8]">Contribution vs Reach</div>
              <div className="text-lg font-semibold">ROI Overview</div>
            </div>
            <div className="text-sm text-[#8f9398]">Last {items.length} events</div>
          </div>

          <RoiBars items={items.slice(0, 6)} />
        </GlassCard>

        <GlassCard>
          <div className="mb-2">
            <div className="text-sm text-[#A0A2A8]">Event Type Split</div>
            <div className="text-lg font-semibold">Distribution</div>
          </div>
          <Donut items={items} />
        </GlassCard>
      </div>

      {/* Main area: timeline & selected details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Timeline */}
        <div className="lg:col-span-2">
          <GlassCard>
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-[#A0A2A8]">Sponsorship Timeline</div>
                <div className="text-lg font-semibold">All sponsored events</div>
              </div>
              <div className="text-sm text-[#8f9398]">Hover a logo for preview • click to open details</div>
            </div>

            <ol className="space-y-4 relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-zinc-800/60" />

              {filtered.map((sp) => (
                <li key={sp.id} className="relative pl-12">
                  <div className="absolute left-0 top-2 w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center group">
                    {/* Logo placeholder - if logo exists show; else initials */}
                    <div
                      className="w-10 h-10 rounded-md bg-gradient-to-br from-[#0b0b0b]/0 to-transparent flex items-center justify-center text-xs text-[#A0A2A8] hover:scale-105 transition"
                      title={sp.event}
                    >
                      {sp.logo ? (
                        <img src={sp.logo} alt="logo" className="w-full h-full object-contain rounded-md" />
                      ) : (
                        <div className="font-semibold">{sp.host.split(" ").slice(0, 2).map(s => s[0]).join("")}</div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedId(sp.id)}
                    className={`block w-full text-left p-4 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:bg-zinc-900/60 transition`}
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="font-semibold">{sp.event}</div>
                        <div className="text-sm text-[#A0A2A8]">
                          {sp.host} • {sp.type} • {formatDate(sp.date)}
                        </div>
                        <div className="text-xs text-[#8f9398] mt-1">{sp.notes}</div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm">{sp.contributionType} • {formatCurrency(sp.amount)}</div>
                        <div className="text-xs text-[#A0A2A8] mt-1">Reach: {sp.reach}</div>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ol>
          </GlassCard>
        </div>

        {/* Selected detail / Impact */}
        <div>
          <GlassCard>
            <div className="mb-3">
              <div className="text-sm text-[#A0A2A8]">Impact Panel</div>
              <div className="text-lg font-semibold">Sponsor Impact</div>
            </div>

            {selected ? (
              <>
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{selected.event}</div>
                      <div className="text-sm text-[#A0A2A8]">{selected.host} • {formatDate(selected.date)}</div>
                    </div>
                    <div className="text-sm text-[#8f9398]">{selected.contributionType} • {formatCurrency(selected.amount)}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-[#A0A2A8]">Engagement</div>
                    <div className="w-full h-3 bg-zinc-800 rounded mt-1 overflow-hidden">
                      <div
                        className="h-3 rounded"
                        style={{ width: `${selected.engagement || 0}%`, background: "linear-gradient(90deg,#16D3AC,#36C1F6)" }}
                      />
                    </div>
                    <div className="text-xs mt-1 text-[#8f9398]">{selected.engagement || 0}% participants engaged</div>
                  </div>

                  <div>
                    <div className="text-xs text-[#A0A2A8]">Reach vs Impressions</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 text-sm">
                        <div className="text-xs text-[#8f9398]">Reach: {selected.reach}</div>
                        <div className="h-2 bg-zinc-800 rounded mt-1">
                          <div className="h-2 rounded bg-[#657FFF]" style={{ width: `${Math.min(100, (selected.reach / Math.max(...items.map(i => i.reach))) * 100)}%` }} />
                        </div>
                      </div>

                      <div className="flex-1 text-sm">
                        <div className="text-xs text-[#8f9398]">Impressions: {selected.impressions || 0}</div>
                        <div className="h-2 bg-zinc-800 rounded mt-1">
                          <div className="h-2 rounded bg-[#16D3AC]" style={{ width: `${Math.min(100, (selected.impressions || 0) / Math.max(1, ...items.map(i => i.impressions || 0)) * 100)}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-[#A0A2A8]">Recognition / Certificates</div>
                    {selected.recognition && selected.recognition.length ? (
                      <div className="flex gap-2 mt-2 overflow-x-auto pb-2">
                        {selected.recognition.map((r, i) => (
                          <div key={i} className="w-36 h-24 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-800/40">
                            <img src={r} alt="recognition" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-[#8f9398] mt-2">No certificates uploaded</div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-[#8f9398]">Select an event from the timeline to view details & impact</div>
            )}
          </GlassCard>
        </div>
      </div>

      {/* Recognition gallery (carousel) */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm text-[#A0A2A8]">Certificates & Recognition</div>
            <div className="text-lg font-semibold">Gallery</div>
          </div>
          <div className="text-sm text-[#8f9398]">Proof of acknowledgment — posters, certificates, social screenshots</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 overflow-x-auto hide-scrollbar flex gap-4 py-2">
            {items.flatMap((s) => (s.recognition || []).map((img, idx) => ({
              id: `${s.id}-${idx}`,
              src: img,
              title: s.event
            }))).length === 0 ? (
              <div className="text-[#8f9398]">No recognition assets available</div>
            ) : (
              items.flatMap((s) => (s.recognition || []).map((img, idx) => (
                <div key={`${s.id}-${idx}`} className="flex-none w-64 h-40 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900/40 transform hover:scale-105 transition">
                  <img src={img} alt="recognition" className="w-full h-full object-cover" />
                  <div className="p-2 text-xs bg-gradient-to-t from-black/60 to-transparent text-[#A0A2A8]">{s.event}</div>
                </div>
              )))
            )}
          </div>
        </div>
      </div>

      {/* small footer */}
      <div className="text-xs text-[#6f7378]">Tip: Click Export Report to open a print-ready summary for stakeholders.</div>
    </div>
  );
}
