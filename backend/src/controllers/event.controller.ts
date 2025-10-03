import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import * as eventService from '../services/event.service';
import { uploadImage } from '../utils/imageUtils';
import type { Event, EventFilters, EventData } from '../types/event.types';

// Create Event
export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) throw new Error('User not authenticated');

  let imageUrl: string | undefined;
  if (req.file) {
    imageUrl = await uploadImage(req.file);
  }

  const eventData: EventData = { ...req.body, image_url: imageUrl };
  const event: Event = await eventService.createEvent(eventData, req.user.id);
  res.status(201).json(event);
});

// Get Events with Filters
export const getEvents = asyncHandler(async (req: Request, res: Response) => {
  const filters: EventFilters = {
    type: req.query.type as string | undefined,
    department: req.query.department as string | undefined,
    category: req.query.category as string | undefined,
  };
  const events: Event[] = await eventService.getEvents(filters);
  res.json(events);
});

// Get Event by ID
export const getEventById = asyncHandler(async (req: Request, res: Response) => {
  const event: Event = await eventService.getEventById(req.params.id);
  res.json(event);
});

// Get Events for Current User
export const getEventsForCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) throw new Error('User not authenticated');
  const events: Event[] = await eventService.getCurrentUserEvents(req.user.id);
  res.json(events);
});

// Update Event
export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) throw new Error('User not authenticated');
  const event: Event = await eventService.updateEvent(req.params.id, req.body, req.user.id);
  res.json(event);
});

// Delete Event
export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user?.id) throw new Error('User not authenticated');
  await eventService.deleteEvent(req.params.id, req.user.id);
  res.json({ message: 'Event deleted' });
});

// Get Event Participation Count
export const getEventParticipationCount = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error('Event ID is required');
  }

  const count: number = await eventService.getEventParticipationCount(id);
  res.status(200).json({ count });
});
