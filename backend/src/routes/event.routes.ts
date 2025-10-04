import { Router } from "express";
import type { Response, Request, NextFunction} from "express";
import type { Multer } from "multer";
import { createEvent, getEventById, getEvents, getEventsForCurrentUser, deleteEvent, getEventParticipationCount, updateEvent , getHostedEvent} from "../controllers/event.controller";
import { eventSchema } from "../validations/event.validation";
import { validate } from "../middleware/validate";
import type { SupabaseClient } from "@supabase/supabase-js";

export function parseEventData(req: Request, res: Response, next: NextFunction) {
  if (req.body.eventData) {
    try {
      if (typeof req.body.eventData === "string") {
        // Only parse if it's a stringified JSON
        req.body.eventData = JSON.parse(req.body.eventData);
      }
    } catch (error) {
      console.error("EventData parsing error:", error);
      return res.status(400).json({ message: "Invalid JSON in eventData field" });
    }
  }
  next();
}

export default function eventRouter(upload: Multer, supabase : SupabaseClient) {
  const router = Router();

    router.get("/", getEvents);
    router.post("/",upload.single('image'), parseEventData, validate(eventSchema), createEvent);
    router.get("/myEvents", getEventsForCurrentUser);
    router.get("/hostEvent" , getHostedEvent)
    router.get("/:eventId", getEventById);
    router.put("/:eventId", validate(eventSchema), updateEvent);
    router.delete("/:eventId", deleteEvent);
    router.get("/:eventId/participant", getEventParticipationCount);
    router.post('/:eventId' , addmemberEvent)

  return router;
}