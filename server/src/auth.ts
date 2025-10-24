import { ExtendedError, Socket } from "socket.io";
import { verifyToken } from "./auth0";

export default async (socket: Socket, next: (err?: ExtendedError) => void) => {
    try {
        const token = (socket.handshake.auth && (socket.handshake.auth as any).token) ||
            (socket.handshake.headers && (socket.handshake.headers as any).authorization) || null;
        if (!token) return next(new Error('unauthorized'));

        const payload = await verifyToken(token as string);
        if (!payload) return next(new Error('unauthorized'));

        socket.data.user = { sub: payload.sub as string, name: payload.name, picture: payload.picture };
        next();
    } catch (err) {
        next(new Error('unauthorized'));
    }
}