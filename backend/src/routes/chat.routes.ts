import { Router } from "express";

import {getChatRoom,getMessageByChatRoom} from "../controllers/chat.controllers"

export default function chatRoute() {
  const router = Router();

   router.use('/getChatRoom',getChatRoom);
   router.use('/getMessage',getMessageByChatRoom)

  return router;
} 