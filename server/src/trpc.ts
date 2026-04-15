import { initTRPC, TRPCError } from '@trpc/server';
import type { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import type { CreateWSSContextFnOptions } from '@trpc/server/adapters/ws';
import { verifyToken } from './middleware/auth';
import { AccountModel, MAccount } from './models';
import type { JwtPayload } from 'jsonwebtoken';

type Account = JwtPayload & MAccount;

const resolveAccount = async (token: string | null | undefined): Promise<Account | null> => {
    if (!token) return null;
    try {
        const account = await verifyToken(token);
        await AccountModel.updateOne({ sub: account.sub }, account, { upsert: true });
        return account;
    } catch {
        return null;
    }
};

export const createContext = async ({ req }: CreateExpressContextOptions) => {
    const account = await resolveAccount(req.headers.authorization ?? null);
    return { account };
};

export const createWSSContext = async ({ req, info }: CreateWSSContextFnOptions) => {
    // Try connectionParams first (sent by tRPC WS client), fall back to URL query string
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
