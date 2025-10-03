import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as eventService from '../services/event.service';
import supabase from '../config/supabase.config';
import { uploadImage, deleteImage } from '../utils/imageUtils';
import type { Event, EventData, EventFilters } from '../types/event.types';
import { ApiError } from '../utils/appError';

const getString = (value: any): string | undefined => {
  return typeof value === 'string' ? value : undefined;
};

export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) throw new ApiError('User not authenticated', 401);

  let imageUrl: string | undefined;
  if (req.file) {
    imageUrl = await uploadImage(supabase, req.file, 'events');
  }

  const eventData: EventData = { ...req.body, image_url: imageUrl };
  const event: Event = await eventService.createEvent(eventData, req.user.id);

  res.status(201).json(event);
});

export const getEvents = asyncHandler(async (req: Request, res: Response) => {
  const filters: EventFilters = {
    type: getString(req.query.type),
    department: getString(req.query.department),
    category: getString(req.query.category),
  };

  const events: Event[] = await eventService.getEvents(filters);
  res.json(events);
});

export const getEventById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new ApiError('Event ID is required', 400);

  const event: Event = await eventService.getEventById(id);
  res.json(event);
});


export const getEventsForCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) throw new ApiError('User not authenticated', 401);

  const events: Event[] = await eventService.getCurrentUserEvents(req.user.id);
  res.json(events);
});

export const getHostedEvent = asyncHandler( async ( req : Request , res : Response) => {

  if(!req.user?.id) throw new ApiError('User not found' , 401);

  const HostedEvent : Event[] = await eventService.getHostedEvent(req.user.id);
  res.json(HostedEvent);
})

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) throw new ApiError('User not authenticated', 401);

  const { id } = req.params;
  if (!id) throw new ApiError('Event ID is required', 400);

  let imageUrl: string | undefined;
  if (req.file) {
    
    const existingEvent: Event = await eventService.getEventById(id);
    if (existingEvent.image_url) {

      imageUrl = await uploadImage(supabase, req.file, 'events', existingEvent.image_url);
    } else {
      imageUrl = await uploadImage(supabase, req.file, 'events');
    }
    req.body.image_url = imageUrl;
  }

  const event: Event = await eventService.updateEvent(id, req.body, req.user.id);
  res.json(event);
});


export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) throw new ApiError('User not authenticated', 401);

  const { id } = req.params;
  if (!id) throw new ApiError('Event ID is required', 400);

  const existingEvent: Event = await eventService.getEventById(id);

  if (existingEvent.image_url) {
    await deleteImage(supabase, existingEvent.image_url);
  }

  await eventService.deleteEvent(id, req.user.id);
  res.json({ message: 'Event and associated image deleted successfully' });
});


export const getEventParticipationCount = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) throw new ApiError('Event ID is required', 400);

  const count: number = await eventService.getEventParticipationCount(id);
  res.status(200).json({ count });
});
