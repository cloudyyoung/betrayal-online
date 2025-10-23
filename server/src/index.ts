import express, { Request, Response } from 'express';
import http from 'http';
import { Server as IOServer, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new IOServer(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 4000;

app.get('/health', (_req: Request, res: Response) => res.json({ ok: true }));

io.on('connection', (socket: Socket) => {
    console.log(`socket connected: ${socket.id}`);

    socket.on('ping', (cb) => {
        if (typeof cb === 'function') cb({ pong: true, id: socket.id });
    });

    socket.on('disconnect', (reason) => {
        console.log(`socket disconnected: ${socket.id} (${reason})`);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
