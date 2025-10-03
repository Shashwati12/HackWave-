import asyncHandler from 'express-async-handler';
import * as registrationService from '../services/registration.service';
import { ApiError } from '../utils/appError';
import type { Request, Response } from 'express';

export const registerForEvent = asyncHandler(async (req:Request, res:Response) => {
  const { event_id, team_name, member_ids } = req.body;
  if(!req.user){
    throw new ApiError("User id missing",401)
  }
  const leader_id = req.user.id;

  const team = await registrationService.registerTeamForEvent({ event_id, team_name, leader_id, member_ids });
  res.status(201).json(team);
});

export const getUserRegistrations = asyncHandler(async (req:Request, res:Response) => {
    if(!req.user){
    throw new ApiError("User id missing",401)
  }
  const userId = req.user.id;
  const registrations = await registrationService.getUserRegistrations(userId);
  res.status(200).json(registrations);
});

export const getTeamsByEvent = asyncHandler(async (req:Request, res:Response) => {
  const { eventId } = req.params;
  if(!eventId) throw new ApiError("Bad request", 401)
  const teams = await registrationService.getTeamsByEvent(eventId);
  res.status(200).json(teams);
});

export const checkUserEventRegistration = asyncHandler(async (req:Request, res:Response) => {
  const { userId, eventId } = req.params;
  if(!eventId || !userId) throw new ApiError("Bad request", 401)
  const isRegistered = await registrationService.checkUserEventRegistration(userId, eventId);
  res.status(200).json({ isRegistered });
});

