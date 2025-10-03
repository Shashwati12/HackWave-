import { WebSocket } from "ws";
import jwt from "jsonwebtoken"
import type { ChatMessage } from "../types/chat.types";
import { handleJoin, handleLeave, handleMessage, handleTyping } from "./roomManagement";
import  config from "../config"

export function handleConnection(ws:WebSocket,req:any){
    // const url = new URL(req.url || '' ,`http://${req.headers.host}`);
    // const token = url.searchParams.get('token');
    // if(!token){
    //     return ws.close(4001,'missing token');
    // }

    let user:any;

    // try{
    //     user = jwt.verify(token,config.JWT_SECRET());
    // }catch{
    //     return ws.close(4002,'Invalid token');
    // }

    ws.on('message',async(raw)=>{
        try{
            const data:ChatMessage = JSON.parse(raw.toString());

            if(data.type==='JOIN'){
                await handleJoin(ws,data.room,data.email,data.image_url);
                console.log("user joined")
            }

            if(data.type==='MESSAGE'){
                await handleMessage(data.room,data.email,data.image_url,data.message as string);
            }

            if(data.type==='TYPING'){
                await handleTyping(data.room,data.email,data.image_url,data.typing||false);
            }

        }catch(err){
            console.error('message error: ',err);
        }
    })

    ws.on('close',()=>{
        handleLeave(ws);
    })

}