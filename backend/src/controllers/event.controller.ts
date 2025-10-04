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
  const userId = parseInt(req.user.id);

  let imageUrl: string | undefined;
  if (req.file) {
    imageUrl = await uploadImage(supabase, req.file, 'events');
  }

  const eventData: EventData = { ...req.body, image_url: imageUrl };
  const event = await eventService.createEvent(eventData, userId);

  res.status(201).json(event);
});

export const getEvents = asyncHandler(async (req: Request, res: Response) => {

        const event = await eventService.getEvents();
        res.status(200).json(event);

});


export const getEventById = asyncHandler(async (req: Request, res: Response) => {

  if (!req.params?.id) throw new ApiError('Event ID is required', 400);

  const id  = parseInt(req.params.id);

  const event: Event = await eventService.getEventById(id);
  res.json(event);
});


export const getEventsForCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) throw new ApiError('User not authenticated', 401);
  const id = parseInt(req.user.id)

  const events: Event[] = await eventService.getCurrentUserEvents(id);
  res.json(events);
});

export const getHostedEvent = asyncHandler( async ( req : Request , res : Response) => {

  if(!req.user?.id) throw new ApiError('User not found' , 401);
  const id = parseInt( req.user.id);

  const HostedEvent : Event[] = await eventService.getHostedEvent(id);
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
  if (!req.user?.id) throw new ApiError('User not authenticated', 401);
  const userId = parseInt(req.user.id);

  if (!req.params.eventId) throw new ApiError('Event ID is required', 400);
  const eventId = parseInt(req.params.eventId);

  const existingEvent: Event = await eventService.getEventById(eventId);

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

export const RequestSponsorshipAsHost = async(req: Request, res: Response) => {
    const event_id = req.userId;
    const {sponsor_id} = req.body;
    if(!sponsor_id || event_id) throw new ApiError('SponsorId or EventId missing!', 401);

    return await sponsorService.initiateRequest(event_id, sponsor_id);
}

export const RequestVendorAsHost = async(req: Request, res: Response) => {
    const event_id = req.userId;
    const {vendor_id} = req.body;
    if(!vendor_id || event_id) throw new ApiError('VendorId or EventId missing!', 401);

    return await sponsorService.initiateRequest(event_id, vendor_id);
}


export const getSponsorsForEvent = async(req: Request, res:Response) => {

    const eventId = req.params.id;

    if(!eventId) throw new ApiError("EventId missing!");
    return await eventService.getSponsorForEvent(parseInt(eventId));
}

export const getVendorsForEvent = async(req: Request, res:Response) => {

    const eventId = req.params.id;

    if(!eventId) throw new ApiError("EventId missing!");
    return await eventService.getVendorForEvent(parseInt(eventId));
}