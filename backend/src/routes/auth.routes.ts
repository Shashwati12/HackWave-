import { Router } from "express";
import type { Response, Request, NextFunction} from "express";
import { register, login, getProfile, getUserIdByEmail, updateProfile } from "../controllers/auth.controllers";
import type { Multer } from "multer";
import { validate } from "uuid";
import { userSchema } from "../validations/auth.validation";


export default function authRouter() {
  const router = Router();

    router.post("/register",validate(userSchema), register);
    router.post("/login", login)
    router.get('/by-email', getUserIdByEmail);
    router.get('/profile', getProfile);
    router.put('/profile', updateProfile);

  return router;
}
