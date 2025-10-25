import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

import connectDB from './db';
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from '@betrayal/shared';
import gamesHandlers from './games';
import { createAuthMiddleware } from './middleware/auth';
import { createJsonOnlyMiddleware } from './middleware/jsonOnly';

dotenv.config();

const app = express();
const server = http.createServer(app);

const isLocalhost = (origin?: string) => {
    if (!origin) return false
    return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)
}

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(server, {
    cors: {
        origin: (origin, callback) => {
            // Allow empty origin (non-browser clients) or localhost dev origins
            if (!origin || isLocalhost(origin) || origin === 'http://localhost:5173') return callback(null, true)
            // For other origins, reject
            return callback(new Error('Not allowed by CORS'))
        },
        methods: ['GET', 'POST'],
        credentials: true,
        allowedHeaders: ['Authorization', 'Content-Type'],
    }
});

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 4000;

app.get('/health', (_req: Request, res: Response) => res.json({ ok: true }));

io.on('connection', (socket: Socket) => {
    console.log(`socket connected: ${socket.id}`);

    socket.use(createJsonOnlyMiddleware());

    gamesHandlers(io, socket);

    socket.on('disconnect', (reason) => {
        console.log(`socket disconnected: ${socket.id} (${reason})`);
    });
});

io.use(createAuthMiddleware());

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
