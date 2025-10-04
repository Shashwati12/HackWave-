import express from 'express';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { handleConnection } from './ws/connection';

const app =  express();
const server = createServer(app);
const wss = new WebSocketServer({server});

wss.on('connection',handleConnection);

export default server