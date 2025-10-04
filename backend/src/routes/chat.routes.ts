import { Router } from "express";

import {getChatRoom,getMessageByChatRoom} from "../controllers/chat.controllers"

export default function chatRoute() {
  const router = Router();

   router.get('/getChatRoom',getChatRoom);
   router.get('/getMessage',getMessageByChatRoom)

  return router;
} 