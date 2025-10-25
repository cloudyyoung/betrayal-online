import { ExtendedError, Socket } from "socket.io";
import { verifyToken } from "./auth0";
import { AccountModel } from "../models";

export function createAuthMiddleware() {
    return async (socket: Socket, next: (err?: ExtendedError) => void) => {
        try {
            const token = (socket.handshake.auth && (socket.handshake.auth as any).token) ||
                (socket.handshake.headers && (socket.handshake.headers as any).authorization) || null;
            if (!token) return next(new Error('unauthorized'));

            const payload = await verifyToken(token as string);
            if (!payload) return next(new Error('unauthorized'));

            socket.data.account = payload;

            await AccountModel.updateOne({ sub: payload.sub }, payload, { upsert: true })

            next();
        } catch (err) {
            console.error('Auth error in socket connection:', err);
            next(new Error('unauthorized'));
        }
    }
}