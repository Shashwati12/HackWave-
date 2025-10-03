import { Router } from "express";
import type { Response, Request, NextFunction} from "express";
import type { Multer } from "multer";
import { createEvent, getEventById, getEvents, getEventsForCurrentUser, deleteEvent, getEventParticipationCount} from "../controllers/event.controller";
import { updateProfile } from "../controllers/auth.controllers";
import { eventSchema } from "../validations/event.validation";
import { validate } from "uuid";

export function parseEventData(req: Request, res: Response, next: NextFunction) {
  if (req.body.eventData) {
    try {
      req.body.eventData = JSON.parse(req.body.eventData);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid JSON in achievementData field' });
    }
  }
  next();
}

export default function eventRouter(upload: Multer) {
  const router = Router();

    router.get("/", getEvents);
    router.post("/",upload.single('image'), parseEventData, validate(eventSchema), createEvent);
    router.get("/myEvents", getEventsForCurrentUser);
    router.get("/:id", getEventById);
    router.put("/:id", validate(eventSchema), updateProfile);
    router.delete("/:id", deleteEvent);
    router.get("/:id/participation-count", getEventParticipationCount);

  return router;
}