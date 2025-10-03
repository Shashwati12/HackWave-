import { WebSocket } from "ws";
import redisclient from "../config/redis.config";
import { pub, sub } from "../config/pubsub.config";
import type { ActiveSocket } from "../types/chat.types";


sub.subscribe("chat", async (message) => {
  const { room, data } = JSON.parse(message);
  for (const client of getActiveSocket()) {
    if (client.room === room && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(JSON.stringify(data));
    }
  }
});

//add logic:  if no user is present in room delete that room


const activeSockets = new Set<ActiveSocket>();

function getActiveSocket() {
  return activeSockets;
}

export async function handleJoin(ws: WebSocket, room: string, email:string,image_url:string) {

  activeSockets.add({ ws, room, email });
  await redisclient.sAdd(`room:${room}`, email);
  const history = await redisclient.lRange(`history:${room}`, -20, -1);
  const count  = await redisclient.sCard(`room:${room}`);
  const parsedHistory = (history || []).map((item) => JSON.parse(item));
  ws.send(
    JSON.stringify({
      type: "HISTORY",
      messages: parsedHistory,
    })
  );

  const joinmsg = {
    type: "JOIN",
    email,
    image_url,
    timestamp: Date.now(),
  };

  const countmsg = {
    type:"COUNT",
    count
  }

  await pub.publish("chat", JSON.stringify({ room: room, data: joinmsg }));
  await pub.publish("chat", JSON.stringify({ room: room, data: countmsg }));
}

export async function handleMessage(room: string, email: string, image_url:string, text: string) {
  const msg = {
    type: "MESSAGE",
    email,
    image_url,
    message: text,
    timestamp: Date.now(),
  };
  await redisclient.rPush(`history:${room}`, JSON.stringify({ msg }));
  await pub.publish("chat", JSON.stringify({ room, data: msg }));
}

export async function handleTyping(room: string,email: string,image_url:string,isTyping: boolean) {
  const msg = {
    type: "TYPING",
    email,
    image_url,
    typing: isTyping,
    timestamp: Date.now(),
  };
  await pub.publish("chat", JSON.stringify({ room, data:msg }));
}

export async function handleLeave(ws: WebSocket) {
  const sock = [...activeSockets].find((s) => s.ws === ws);
  if (!sock) {
    return;
  }
  const { room, email } = sock;
  activeSockets.delete(sock);
  await redisclient.sRem(`room:${room}`, email);
  const count = await redisclient.sCard(`room:${room}`);

  if(count>0){
    const countmsg = {
      type:"COUNT",
      count
    }
    await pub.publish("chat",JSON.stringify({room,data:countmsg}));

    const leavemsg = {
      type: "LEAVE",
      email,
      timestamp: Date.now(),
    };
    await pub.publish("chat", JSON.stringify({ room, data: leavemsg }));
  }else{
    await redisclient.del(`room:${room}`)
  }




}
