import * as chatServices from "../services/chat.service"
import asyncHandler from 'express-async-handler';
import type { Request, Response } from 'express';
import { ApiError } from "../utils/appError";

export const getChatRoom = asyncHandler(async(req:Request,res:Response)=>{
    const userId = req.userId;
    const ChatRooms = await chatServices.getChatRoom(userId);
    res.status(200).json(ChatRooms);
})

export const getMessageByChatRoom = asyncHandler(async(req:Request,res:Response)=>{
    const userId = req.userId
    const roomId = req.body.roomId;
    if(!roomId || !userId){
        throw new ApiError("Room Id missing",401);
    }
    const messages = await chatServices.getChatByRoomId(userId, roomId);
    res.status(200).json(messages);
})