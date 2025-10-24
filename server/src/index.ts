import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

import connectDB from './db';
import authMiddleware from './auth';
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from './types';
import matchesHandlers from './matches';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 4000;

app.get('/health', (_req: Request, res: Response) => res.json({ ok: true }));

io.on('connection', (socket: Socket) => {
    console.log(`socket connected: ${socket.id}`);

    matchesHandlers(io, socket);

    socket.on('disconnect', (reason) => {
        console.log(`socket disconnected: ${socket.id} (${reason})`);
    });
});

io.use(authMiddleware);

const start = async () => {
    try {
        await connectDB();
    } catch (err) {
        console.warn('Continuing to start server despite DB connection failure');
    }

    server.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
};

start();
