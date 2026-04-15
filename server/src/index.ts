import dotenv from 'dotenv';
import http from 'http';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { applyWSSHandler } from '@trpc/server/adapters/ws';

import connectDB from './db';
import { appRouter } from './router';
import { createContext, createWSSContext } from './trpc';

export type { AppRouter } from './router';

dotenv.config();

const app = express();

const isLocalhost = (origin?: string) => {
    if (!origin) return false;
    return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
};

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || isLocalhost(origin) || origin === 'http://localhost:5173') return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));

app.get('/health', (_req: Request, res: Response) => res.json({ ok: true }));

app.use('/trpc', createExpressMiddleware({
    router: appRouter,
    createContext,
}));

const httpServer = http.createServer(app);

const wss = new WebSocketServer({ server: httpServer });
applyWSSHandler({ wss, router: appRouter, createContext: createWSSContext });

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 4000;

const start = async () => {
    try {
        await connectDB();
    } catch {
        console.warn('Continuing to start server despite DB connection failure');
    }

    httpServer.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
        console.log(`WebSocket listening on ws://localhost:${PORT}`);
    });
};

start();
