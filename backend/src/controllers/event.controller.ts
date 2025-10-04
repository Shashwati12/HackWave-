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

  if (!req.userId) throw new ApiError('User not authenticated', 401);
  const userId = req.userId;
  
  let imageUrl: string | undefined;

  if( !req.file) throw new ApiError("FIle not found" , 400);

  if (req.file) {
    imageUrl = await uploadImage(supabase, req.file, 'events');
  }

  const eventData: EventData = { ...req.body.eventData, image_url: imageUrl };

  const event = await eventService.createEvent(eventData, userId);

  res.status(201).json(event);
});

export const getEvents = asyncHandler(async (req: Request, res: Response) => {

        const event = await eventService.getEvents();
        res.status(200).json(event);

});


export const getEventById = asyncHandler(async (req: Request, res: Response) => {

  if (!req.params?.eventId) throw new ApiError('Event ID is required', 400);

  const id  = parseInt(req.params.eventId);

  const event = await eventService.getEventById(id);
  res.json(event);
});


export const getEventsForCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) throw new ApiError('User not authenticated', 401);

  const id = (req.userId)

  const events = await eventService.getCurrentUserEvents(id);
  res.json(events);
});

export const getHostedEvent = asyncHandler( async ( req : Request , res : Response) => {

  if(!req.userId) throw new ApiError('User not found' , 401);
  const id = ( req.userId);

  const HostedEvent  = await eventService.getHostedEvent(id);
  res.json(HostedEvent);
})

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) throw new ApiError('User not authenticated', 401);
  const id = parseInt(req.user.id);
  if (!req.params.id) throw new ApiError('Event ID is required', 400);

  const eventId = parseInt(req.params.id);

  let imageUrl: string | undefined;
  if (req.file) {
    
    const existingEvent: Event = await eventService.getEventById(eventId);
    if (existingEvent.image_url) {

      imageUrl = await uploadImage(supabase, req.file, 'events', existingEvent.image_url);
    } else {
      imageUrl = await uploadImage(supabase, req.file, 'events');
    }
    req.body.image_url = imageUrl;
  }

  const event: Event = await eventService.updateEvent(eventId, req.body, id);
  res.json(event);
});


export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.userId) throw new ApiError('User not authenticated', 401);
  const userId = (req.userId);

  if (!req.params.eventId) throw new ApiError('Event ID is required', 400);
  const eventId = parseInt(req.params.eventId);

  const existingEvent = await eventService.getEventById(eventId);

  if( !existingEvent) throw new ApiError("Event not Found" , 404);

  if (existingEvent.image_url) {
    await deleteImage(supabase, existingEvent.image_url);
  }

  await eventService.deleteEvent(userId, eventId);
  res.json({ message: 'Event and associated image deleted successfully' });
});


export const getEventParticipationCount = asyncHandler(async (req: Request, res: Response) => {
 
  if (!req.params.eventId) throw new ApiError('Event ID is required', 400);

  const eventId = parseInt(req.params.eventId);

  const count: number = await eventService.getEventParticipationCount(eventId);
  res.status(200).json({ count });
});


