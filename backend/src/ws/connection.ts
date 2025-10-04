// src/connection.handler.ts

import { WebSocket } from "ws";
import { URL } from "url";
import { getUserFromToken } from "../utils/index"; 
import { handleJoin, handleLeave, handleMessage, handleTyping } from "./roomManagement"
import type { WebSocketMessage } from "../types/chat.types";

export async function handleConnection(ws: WebSocket, req: any) {
  try {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const token = url.searchParams.get('token');
    const roomId = url.searchParams.get('roomId');

    if (!token || !roomId) {
      return ws.close(4001, 'Missing token or roomId');
    }

    // Authenticate the user securely on the server
    const user = await getUserFromToken(token);
    if (!user) {
      return ws.close(4002, 'Invalid or expired token');
    }

    await handleJoin(ws, roomId, user);

    ws.on('message', async (rawMessage) => {
      try {
        const data: WebSocketMessage = JSON.parse(rawMessage.toString());
        
        switch (data.type) {
          case 'MESSAGE':
            await handleMessage(roomId, user, data.payload.text);
            break;
          case 'TYPING':
            await handleTyping(roomId, user, data.payload.isTyping);
            break;

        }
      } catch (err) {
        console.error('Error processing message:', err);
      }
    });

    ws.on('close', () => {
      handleLeave(ws);
    });

  } catch (err) {
    console.error('Connection handling error:', err);
    ws.close(4011, 'Internal server error');
  }
}