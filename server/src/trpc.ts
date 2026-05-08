import { initTRPC, TRPCError } from '@trpc/server';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import type { CreateWSSContextFnOptions } from '@trpc/server/adapters/ws';
import jwt from 'jsonwebtoken';
import { AccountModel, Account } from './types/account'
import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET ?? (() => { throw new Error('JWT_SECRET env variable is not set'); })();

const decodeToken = (token: string): Account | null => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as Account;
        if (!decoded.name || !decoded.email) return null;
        return decoded;
    } catch {
        return null;
    }
};

const resolveAccount = async (token: string | null | undefined): Promise<Account | null> => {
    if (!token) return null;
    const account = decodeToken(token.replace(/^Bearer /, ''));
    if (!account) return null;
    await AccountModel.updateOne({ email: account.email }, { $set: account }, { upsert: true });
    return account;
};

export const createContext = async ({ req }: CreateExpressContextOptions) => {
    const account = await resolveAccount(req.headers.authorization);
    return { account };
};

export const createWSSContext = async ({ req, info }: CreateWSSContextFnOptions) => {
    const token =
        (info.connectionParams?.['token'] as string | undefined) ??
        new URL(req.url ?? '/', 'http://localhost').searchParams.get('token') ??
        null;
    const account = await resolveAccount(token);
    return { account };
};

type Context = { account: Account | null };

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.account) throw new TRPCError({ code: 'UNAUTHORIZED' });
    return next({ ctx: { account: ctx.account } });
});

export const protectedProcedure = t.procedure.use(isAuthed);
