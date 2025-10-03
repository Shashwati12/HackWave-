// src/types.ts

export type EventType = "Hackathon" | "Workshop" | "Cultural" | "Sports" | "Seminar";

export interface Event {
  id: number;
  name: string;
  type: EventType;
  date: string;
  venue: string;
  description: string;
  banner: string;
  registrationOpen: boolean;
  registrationLink?: string;
  popular?: boolean;
  newEvent?: boolean;
  aiSuggested?: boolean;
  attendees?: number;
  moreDetails?: string;
}

// Sample events
export const sampleEvents: Event[] = [
  {
    id: 1,
    name: "AI Hackathon 2025",
    type: "Hackathon",
    date: "2025-11-20",
    venue: "Tech Lab",
    description:
      "Solve real-world AI challenges with your team and compete for prizes.",
    moreDetails:
      "This hackathon will include workshops, mentorship sessions, and a final presentation to judges. Top winners get prizes and internship opportunities.",
    banner: "https://via.placeholder.com/400x200",
    registrationOpen: true,
    registrationLink: "https://hackathon.com/register",
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
    moreDetails:
      "Participate in dance battles, singing competitions, drama skits, and enjoy food stalls and games. Open to all students.",
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
    moreDetails:
      "You will learn basic electronics, programming robots, and designing simple robotic systems. Materials will be provided.",
    banner: "https://via.placeholder.com/400x200",
    registrationOpen: true,
    attendees: 80,
  },
];
