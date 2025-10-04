import { prisma } from '../config/prisma.config';
import supabase from '../config/supabase.config';
import type { Event, EventFilters, EventData } from '../types/event.types';

// export const createEvent = async (eventData: EventData, userId: string) => {
//   const { data, error } = await supabase
//     .from('events')
//     .insert([{ ...eventData, event_creator_id: userId }])
//     .select()
//     .single();

//   if (error) throw error;
//   return data as Event;
// };

export const createEvent = async (eventData : EventData , userId : number) => {
    return await prisma.event.create({
        data : {
            ...eventData,
            event_creator_id : userId
        },
    })
}

export const getEvents = async (filters: EventFilters = {}): Promise<Event[]> => {
  let query = supabase.from('events').select('*');

  if (filters.type) query = query.eq('event_type', filters.type);
  if (filters.department) query = query.eq('department', filters.department);
  if (filters.category) query = query.eq('category', filters.category);

  const { data, error } = await query;
  if (error) throw error;
  return data as Event[];
};

export const getEventById = async (id: number): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Event;
};

export const getHostedEvent = async ( userId : number) : Promise<Event[]> =>{
  const { data , error } = await supabase
  .from('event')
  .select('*')
  
}

export const getCurrentUserEvents = async (userId: number): Promise<Event[]> => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('event_creator_id', userId);

  if (error) throw error; 
  return data as Event[];
};

export const updateEvent = async (id: number, eventData: Partial<EventData>, userId: number): Promise<Event> => {
  const { data, error } = await supabase
    .from('events')
    .update(eventData)
    .eq('id', id)
    .eq('event_creator_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data as Event;
};

export const deleteEvent = async (id: number, userId: number) => {
  const { error } = await supabase
    .from('events')
    .delete()
    .eq('id', id)
    .eq('event_creator_id', userId);

  if (error) throw error;
  return { success: true };
};

export const getEventParticipationCount = async (eventId: number) => {
  const { count, error } = await supabase
    .from('team_members')
    .select('*', { head: true, count: 'exact' })
    .eq('event_id', eventId);

  if (error) throw error;
  return count ?? 0;
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