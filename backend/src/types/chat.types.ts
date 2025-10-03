import WebSocket from "ws"

export type ActiveSocket = {
    ws:WebSocket;
    room:string;
    email:string;
}

export type messageType = "JOIN" | "LEAVE" | "MESSAGE" | "TYPING" | "HISTORY";

export type ChatMessage = {
    type:messageType;
    room:string;
    email:string;
    image_url:string;
    message?:string;
    timestamp?:number;
    typing?:boolean;
    messages?:ChatMessage[];
}
