import { prisma } from '../config/prisma.config';
import type { Event, EventData, EventFilters } from '../types/event.types';

// Helper to map EventData -> Prisma fields
function mapEventData(eventData: EventData) {
  console.log(eventData.event_name);
  return {
    event_name: eventData.event_name,
    event_description: eventData.event_description,
    important_dates: eventData.important_dates ? new Date(eventData.important_dates) : undefined,
    registration_deadline: eventData.registration_deadline ? new Date(eventData.registration_deadline) : undefined,
    prizes: eventData.prizes,
    event_type: eventData.event_type,
    venue: eventData.venue,
    contact_info: eventData.contact_info,
    participation_type: eventData.participation_type,
    max_team_size: eventData.max_team_size,
    category: eventData.category,
    department: eventData.department,
    registration_fee: eventData.registration_fee,
    image_url: eventData.image_url,
    rules: eventData.rules,
    organizer: eventData.organizer,
    layer: eventData.layer,
    max_participants: eventData.max_participants,
    eligibility: eventData.eligibility,
  };
}

// ✅ Create event
export const createEvent = async (eventData: EventData, userId: number) => {
  return await prisma.event.create({
    data: {
      ...mapEventData(eventData),
      event_creator_id: userId,
    },
  });
};


export const getEvents = async () => {
  return await prisma.event.findMany({});
};

// ✅ Get single event
export const getEventById = async (id: number) => {
  return await prisma.event.findUnique({
    where: { id },
  });
};

// ✅ Get events hosted by a user
export const getHostedEvent = async (userId: number) => {
  return await prisma.event.findMany({
    where: { event_creator_id: userId },
  });
};

// ✅ Get events user is participating in
export const getCurrentUserEvents = async (userId: number) => {
  return await prisma.event.findMany({
    where: {
      eventMember: {
        some: { userId },
      },
    },
  });
};

// ✅ Update event
export const updateEvent = async (id: number, eventData: Partial<EventData>, userId: number)=> {
  return await prisma.event.update({
    where: { id },
    data: {
      ...mapEventData(eventData as EventData),
      event_creator_id: userId,
    },
  });
};

// ✅ Delete event
export const deleteEvent = async (id: number, userId: number) => {
  await prisma.event.delete({
    where: { id },
  });
  return { success: true };
};

// ✅ Count participants
export const getEventParticipationCount = async (eventId: number) => {
  const count = await prisma.eventParticipant.count({
    where: { eventId },
  });
  return count;
};

export const getVendorForEvent = async(eventId: number) => {
    return await prisma.eventVendor.findMany({
        where: {
            event_id: eventId
        },
        include: {
            vendor: true
        }
    })
}

export const getSponsorForEvent = async(eventId: number) => {
    return await prisma.eventSponsor.findMany({
        where: {
            event_id: eventId
        },
        include: {
            sponsor: true
        }
    })
}