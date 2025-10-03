// import asyncHandler from 'express-async-handler';
// import * as registrationService from '../services/registration.service';
// import { ApiError } from '../utils/appError';
// import type { Request, Response } from 'express';

// export const registerForEvent = asyncHandler(async (req:Request, res:Response) => {
//   const { event_id, team_name, member_ids } = req.body;
//   if(!req.user){
//     throw new ApiError("User id missing",401)
//   }
//   const leader_id = req.user.id;

//   const team = await registrationService.registerTeamForEvent({ event_id, team_name, leader_id, member_ids });
//   res.status(201).json(team);
// });

// export const getUserRegistrations = asyncHandler(async (req:Request, res:Response) => {
//     if(!req.user){
//     throw new ApiError("User id missing",401)
//   }
//   const userId = req.user.id;
//   const registrations = await registrationService.getUserRegistrations(userId);
//   res.status(200).json(registrations);
// });

// export const getTeamsByEvent = asyncHandler(async (req:Request, res:Response) => {
//   const { eventId } = req.params;
//   if(!eventId) throw new ApiError("Bad request", 401)
//   const teams = await registrationService.getTeamsByEvent(eventId);
//   res.status(200).json(teams);
// });

// export const checkUserEventRegistration = asyncHandler(async (req:Request, res:Response) => {
//   const { userId, eventId } = req.params;
//   if(!eventId || !userId) throw new ApiError("Bad request", 401)
//   const isRegistered = await registrationService.checkUserEventRegistration(userId, eventId);
//   res.status(200).json({ isRegistered });
// });


import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { ApiError } from "../utils/appError";
import * as registrationService from "../services/registration.service";

export const registerForEvent = asyncHandler(async (req: Request, res: Response) => {
  const { event_id, team_name, member_ids } = req.body;

  if (!req.user) {
    throw new ApiError("User not authenticated",401);
  }

  if (!event_id || !team_name || !Array.isArray(member_ids)) {
    throw new ApiError("Invalid request payload", 400);
  }

  const leader_id = req.user.id;

  const result = await registrationService.registerTeamForEvent({
    event_id: Number(event_id),
    team_name,
    leader_id: Number(leader_id),
    member_ids: member_ids.map(Number),
  });

  if (!result.event) {
    throw new ApiError("Event not found", 404);
  }

  if (!result.team) {
    throw new ApiError("Failed to create team",500);
  }

  res.status(201).json({
    success: true,
    message: "Team registered successfully",
    data: result.team,
  });
});


export const getUserRegistrations = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new ApiError("User ID missing", 401);
  }

  const userId = req.user.id;

  const registrations = await registrationService.getUserRegistrations(Number(userId));

  if (!registrations) {
    throw new ApiError("No registrations found for this user", 404);
  }

  res.status(200).json({
    success: true,
    message: "Registrations fetched successfully",
    data: registrations,
  });
});


export const getTeamsByEvent = asyncHandler(async (req: Request, res: Response) => {
  const eventIdParam = req.params.eventId;

  if (!eventIdParam) {
    throw new ApiError("Event ID is required", 400);
  }

  const eventId = Number(eventIdParam);
  if (isNaN(eventId)) {
    throw new ApiError("Invalid Event ID", 400);
  }

  const teams = await registrationService.getTeamsByEvent(eventId);

  res.status(200).json({
    success: true,
    message: "Teams fetched successfully",
    data: teams,
  });
});

export const checkUserEventRegistration = asyncHandler(async (req: Request, res: Response) => {
  const { userId, eventId } = req.params;

  if (!userId || !eventId) {
    throw new ApiError("User ID and Event ID are required", 400);
  }

  const userIdNum = Number(userId);
  const eventIdNum = Number(eventId);

  if (isNaN(userIdNum) || isNaN(eventIdNum)) {
    throw new ApiError("Invalid User ID or Event ID", 400);
  }

  const isRegistered = await registrationService.checkUserEventRegistration(userIdNum, eventIdNum);

  res.status(200).json({
    success: true,
    isRegistered,
  });
});




