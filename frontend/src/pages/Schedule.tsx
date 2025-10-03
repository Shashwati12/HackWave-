"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  Users,
  Ticket,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Background } from "../components/ShootingStar";

// Event Data
const eventsData = {
  "2025-10-05": [
    {
      id: 1,
      title: "Design Conference 2025",
      time: "09:00 AM - 05:00 PM",
      location: "Convention Center",
      attendees: 1247,
      tickets: "892 sold",
      status: "Published",
      color: "from-[#36C1F6] to-[#657FFF]",
      iconBg: "bg-[#36C1F6]/20",
      iconColor: "text-[#36C1F6]",
    },
  ],
  "2025-10-08": [
    {
      id: 2,
      title: "Tech Summit",
      time: "10:00 AM - 04:00 PM",
      location: "Tech Hub",
      attendees: 450,
      tickets: "380 sold",
      status: "Published",
      color: "from-[#657FFF] to-[#36C1F6]",
      iconBg: "bg-[#657FFF]/20",
      iconColor: "text-[#657FFF]",
    },
  ],
  "2025-10-12": [
    {
      id: 3,
      title: "Workshop Series",
      time: "02:00 PM - 06:00 PM",
      location: "Innovation Lab",
      attendees: 120,
      tickets: "98 sold",
      status: "Published",
      color: "from-[#16D3AC] to-[#36C1F6]",
      iconBg: "bg-[#16D3AC]/20",
      iconColor: "text-[#16D3AC]",
    },
    {
      id: 4,
      title: "Networking Mixer",
      time: "07:00 PM - 10:00 PM",
      location: "Rooftop Lounge",
      attendees: 85,
      tickets: "72 sold",
      status: "Published",
      color: "from-[#657FFF] to-[#16D3AC]",
      iconBg: "bg-[#657FFF]/20",
      iconColor: "text-[#657FFF]",
    },
  ],
  "2025-10-15": [
    {
      id: 5,
      title: "Product Launch Event",
      time: "11:00 AM - 03:00 PM",
      location: "Grand Ballroom",
      attendees: 680,
      tickets: "545 sold",
      status: "Published",
      color: "from-[#36C1F6] to-[#16D3AC]",
      iconBg: "bg-[#36C1F6]/20",
      iconColor: "text-[#36C1F6]",
    },
  ],
  "2025-10-20": [
    {
      id: 6,
      title: "Music Festival",
      time: "12:00 PM - 11:00 PM",
      location: "City Park",
      attendees: 2500,
      tickets: "2100 sold",
      status: "Selling Fast",
      color: "from-[#16D3AC] to-[#657FFF]",
      iconBg: "bg-[#16D3AC]/20",
      iconColor: "text-[#16D3AC]",
    },
  ],
};

export default function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 9, 1));
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const firstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDate(null);
  };

  const formatDateKey = (year: number, month: number, day: number) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;

  const hasEvents = (day: number) => {
    const dateKey = formatDateKey(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return eventsData[dateKey] && eventsData[dateKey].length > 0;
  };

  const getEventCount = (day: number) => {
    const dateKey = formatDateKey(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    return eventsData[dateKey] ? eventsData[dateKey].length : 0;
  };

  const handleDateClick = (day: number) => {
    const dateKey = formatDateKey(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(dateKey);
  };

  const renderCalendar = () => {
    const days = daysInMonth(currentDate);
    const firstDay = firstDayOfMonth(currentDate);
    const cells: JSX.Element[] = [];
    const today = new Date();
    const isCurrentMonth =
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear();

    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={`empty-${i}`} className="p-4" />);
    }

    for (let day = 1; day <= days; day++) {
      const dateKey = formatDateKey(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const isSelected = selectedDate === dateKey;
      const hasEvent = hasEvents(day);
      const eventCount = getEventCount(day);
      const isToday = isCurrentMonth && today.getDate() === day;

      cells.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          className={`relative p-4 rounded-xl transition-all duration-300 group ${
            isSelected
              ? "bg-gradient-to-br from-[#36C1F6] to-[#657FFF] text-white shadow-lg shadow-[#36C1F6]/30 scale-105"
              : isToday
              ? "bg-white/10 text-white ring-2 ring-[#16D3AC]"
              : hasEvent
              ? "bg-white/5 hover:bg-white/10 text-white hover:scale-105 hover:shadow-lg"
              : "text-[#B0B3C0] hover:bg-white/5 hover:text-white"
          }`}
        >
          <span
            className={`text-lg font-semibold block mb-1 ${
              isSelected ? "text-white" : ""
            }`}
          >
            {day}
          </span>

          {hasEvent && (
            <div className="flex items-center justify-center gap-1">
              {eventCount === 1 ? (
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-white" : "bg-[#16D3AC]"
                  } group-hover:scale-125 transition-transform`}
                />
              ) : (
                <div className="flex gap-0.5">
                  {[...Array(Math.min(eventCount, 3))].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 h-1 rounded-full ${
                        isSelected ? "bg-white" : "bg-[#16D3AC]"
                      } group-hover:scale-125 transition-transform`}
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {isSelected && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
          )}
        </button>
      );
    }

    return cells;
  };

  const selectedEvents = selectedDate ? eventsData[selectedDate] : null;

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      {/* Background Component */}
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 py-12">
        
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#36C1F6] to-[#657FFF] flex items-center justify-center shadow-lg shadow-[#36C1F6]/30">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#36C1F6] to-[#657FFF] bg-clip-text text-transparent">
              Event Schedule
            </h1>
          </div>
          <p className="text-xl text-[#B0B3C0] leading-relaxed">
            View and manage all your upcoming events in one place
          </p>
        </div>

        {/* Calendar Card */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 mb-8">
          
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <p className="text-[#B0B3C0] text-sm">Click on a date to view events</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={previousMonth}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 group"
              >
                <ChevronLeft className="w-5 h-5 text-white group-hover:text-[#16D3AC] transition-colors" />
              </button>
              <button
                onClick={nextMonth}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 hover:scale-110 group"
              >
                <ChevronRight className="w-5 h-5 text-white group-hover:text-[#16D3AC] transition-colors" />
              </button>
            </div>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-3 mb-4">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
              <div key={day} className="text-center text-[#B0B3C0] text-sm font-semibold p-3">
                {day.slice(0, 3)}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-3">
            {renderCalendar()}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#16D3AC] shadow-lg shadow-[#16D3AC]/50" />
              <span className="text-sm text-[#B0B3C0]">Has Events</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full ring-2 ring-[#16D3AC]" />
              <span className="text-sm text-[#B0B3C0]">Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#36C1F6] to-[#657FFF] shadow-lg shadow-[#36C1F6]/50" />
              <span className="text-sm text-[#B0B3C0]">Selected</span>
            </div>
          </div>
        </div>

        {/* Event Cards */}
        {selectedEvents && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </h3>
                <p className="text-[#B0B3C0]">{selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''} scheduled</p>
              </div>
              <Sparkles className="w-8 h-8 text-[#16D3AC]" />
            </div>
            
            {selectedEvents.map((event, index) => (
              <div
                key={event.id}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 hover:from-white/15 hover:to-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-[#36C1F6]/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Calendar className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-[#16D3AC] transition-colors">
                        {event.title}
                      </h4>
                      <div className="flex flex-wrap gap-4 text-[#B0B3C0]">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-1.5 bg-[#16D3AC]/20 rounded-lg border border-[#16D3AC]/30">
                    <span className="text-[#16D3AC] text-xs font-medium">{event.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${event.iconBg} flex items-center justify-center`}>
                        <Users className={`w-5 h-5 ${event.iconColor}`} />
                      </div>
                      <div>
                        <div className="text-white text-xl font-bold">{event.attendees}</div>
                        <div className="text-[#B0B3C0] text-xs">Total Attendees</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${event.iconBg} flex items-center justify-center`}>
                        <Ticket className={`w-5 h-5 ${event.iconColor}`} />
                      </div>
                      <div>
                        <div className="text-white text-xl font-bold">{event.tickets}</div>
                        <div className="text-[#B0B3C0] text-xs">Tickets Sold</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button className="flex-1 px-6 py-3 bg-[#16D3AC] text-black font-semibold rounded-xl hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#16D3AC]/30">
                    View Details
                  </button>
                  <button className="px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20">
                    Edit Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedDate && !selectedEvents && (
          <div className="text-center py-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-white/10 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-[#B0B3C0]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No Events Scheduled</h3>
            <p className="text-[#B0B3C0] mb-6">There are no events on this date</p>
            <button className="px-6 py-3 bg-[#16D3AC] text-black font-semibold rounded-xl hover:bg-white transition-all duration-300 hover:scale-105">
              Create New Event
            </button>
          </div>
        )}

        {!selectedDate && (
          <div className="text-center py-20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#36C1F6] to-[#657FFF] flex items-center justify-center shadow-lg shadow-[#36C1F6]/30 animate-pulse">
              <Calendar className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Select a Date</h3>
            <p className="text-[#B0B3C0]">Click on any date with events to view detailed information</p>
          </div>
        )}

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}