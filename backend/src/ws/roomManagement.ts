// src/services/chat.service.ts (Corrected roomManagement.ts)

import { WebSocket } from "ws";
import redisClient from "../config/redis.config";
import { pub, sub } from "../config/pubsub.config";
import type { UserContext } from "../types/chat.types";


const roomToSocketsMap = new Map<string, Set<WebSocket>>();
const socketToUserMap = new Map<WebSocket, { room: string; user: UserContext }>();

// Subscribe to broadcasts from Redis (this part is correct)
sub.subscribe("chat", (message) => {
  const { room, data } = JSON.parse(message);
  const socketsInRoom = roomToSocketsMap.get(room);
  if (socketsInRoom) {
    for (const ws of socketsInRoom) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(data));
      }
    }
  }
});

//user join rooom
export async function handleJoin(ws: WebSocket, room: string, user: UserContext) {
  if (!roomToSocketsMap.has(room)) roomToSocketsMap.set(room, new Set());
  roomToSocketsMap.get(room)!.add(ws);
  socketToUserMap.set(ws, { room, user });

  await redisClient.sAdd(`room_online_users:${room}`, user.id.toString());

  const [history, userCount] = await Promise.all([
    redisClient.lRange(`history:${room}`, -50, -1),
    redisClient.sCard(`room_online_users:${room}`),
  ]);

  ws.send(JSON.stringify({
    type: "HISTORY",
    messages: (history || []).map((item) => JSON.parse(item)),
  }));

  const joinMsg = { type: "JOIN", user, timestamp: Date.now() };
  await pub.publish("chat", JSON.stringify({ room, data: joinMsg }));
  await pub.publish("chat", JSON.stringify({ room, data: { type: "COUNT", count: userCount } }));

  // Automatically mark the room as read when joining.
  await handleMarkAsRead(room, user);
}

//handle incoming message
export async function handleMessage(room: string, user: UserContext, text: string) {
  const messageData = {
    type: "MESSAGE",
    room, 
    user, 
    message: text,
    timestamp: Date.now(),
  };

 
  // This sends the task to worker.ts for database persistence.
  await redisClient.lPush('message_queue', JSON.stringify(messageData));


  await redisClient.rPush(`history:${room}`, JSON.stringify(messageData));
  await pub.publish("chat", JSON.stringify({ room, data: messageData }));
}

//handle typing 
export async function handleTyping(room: string, user: UserContext, isTyping: boolean) {
  const typingMsg = { type: "TYPING", user, typing: isTyping };
  await pub.publish("chat", JSON.stringify({ room, data: typingMsg }));
}


  // This function creates the task for the worker to reset unread counts.
 
export async function handleMarkAsRead(room: string, user: UserContext) {
  // const task = {
  //   type: "RESET_UNREAD_COUNT",
  //   payload: {
  //     userId: user.id,
  //     roomId: room,
  //     // You might need more info here if your ChatParticipant schema is polymorphic
  //   },
  // };
  // await redisClient.lPush('message_queue', JSON.stringify(task));
  // console.log(`[Server] Queued task to reset unread count for user ${user.id} in room ${room}`);
}


//user leave room
export async function handleLeave(ws: WebSocket) {
  const session = socketToUserMap.get(ws);
  if (!session) return;

  const { room, user } = session;

  roomToSocketsMap.get(room)?.delete(ws);
  socketToUserMap.delete(ws);

  await redisClient.sRem(`room_online_users:${room}`, user.id.toString());
  const remainingUserCount = await redisClient.sCard(`room_online_users:${room}`);

  const leaveMsg = { type: "LEAVE", user, timestamp: Date.now() };
  await pub.publish("chat", JSON.stringify({ room, data: leaveMsg }));
  await pub.publish("chat", JSON.stringify({ room, data: { type: "COUNT", count: remainingUserCount } }));

  if (remainingUserCount === 0) {
    console.log(`Room ${room} is empty. Clearing history.`);
    await redisClient.del(`history:${room}`);
  }
}