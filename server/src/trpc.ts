import { initTRPC, TRPCError } from '@trpc/server';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import type { CreateWSSContextFnOptions } from '@trpc/server/adapters/ws';
import { AccountModel } from './models';
import type { Account } from './types/account';

const decodeToken = (token: string): Account | null => {
    try {
        const decoded = JSON.parse(Buffer.from(token, 'base64').toString()) as Account;
        if (!decoded.id || !decoded.name || !decoded.email) return null;
        return decoded;
    } catch {
        return null;
    }
};

const resolveAccount = async (token: string | null | undefined): Promise<Account | null> => {
    if (!token) return null;
    const account = decodeToken(token.replace(/^Bearer /, ''));
    if (!account) return null;
    await AccountModel.updateOne({ _id: account.id }, { $set: account }, { upsert: true });
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
