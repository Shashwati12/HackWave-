import { Router } from "express";
import type { Response, Request, NextFunction} from "express";
import { registerForEvent, getUserRegistrations, getTeamsByEvent, checkUserEventRegistration} from "../controllers/registration.controllers";

import type { Multer } from "multer";
import { validate } from "uuid";
import { teamSchema } from "../validations/registration.validation";

export default function registrationRouter() {
  const router = Router();

    router.post('/', validate(teamSchema), registerForEvent);
    router.get('/', getUserRegistrations);
    router.get('/:eventId', getTeamsByEvent);
    router.get('/check-user/:userId/:eventId', checkUserEventRegistration);

  return router;
}