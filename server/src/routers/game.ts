import { z } from 'zod';
import { on } from 'events';
import { router, protectedProcedure } from '../trpc';
import { GameModel } from '../models';
import { GameStatus } from '../types/game';
import { gameEvents } from '../event-emitter';

export const gameRouter = router({
    list: protectedProcedure.query(async () => {
        const mgames = await GameModel.find();
        return mgames.map(mgame => {
            const { password, _id, __v, createdAt, ...rest } = mgame.toObject() as any;
            return { ...rest, id: String(_id), isPasswordProtected: !!password, createdAt: createdAt instanceof Date ? createdAt.toISOString() : createdAt };
        });
    }),

    get: protectedProcedure
        .input(z.object({ gameId: z.string() }))
        .query(async ({ input }) => {
            const mgame = await GameModel.findById(input.gameId);
            if (!mgame) return null;
            const { password, _id, __v, createdAt, ...rest } = mgame.toObject() as any;
            return { ...rest, id: String(_id), isPasswordProtected: !!password, createdAt: createdAt instanceof Date ? createdAt.toISOString() : createdAt };
        }),

    create: protectedProcedure
        .input(z.object({ name: z.string(), password: z.string().optional() }))
        .mutation(async ({ input, ctx }) => {
            const players = { [ctx.account.id]: { isReady: false } };
            const playersOrder = [ctx.account.id];
            const state = {};
            const createdAt = new Date().toISOString();

            const mgame = new GameModel({
                name: input.name,
                password: input.password,
                status: GameStatus.WAITING,
                players,
                playersOrder,
                state,
                createdAt,
            });
            const created = await mgame.save();

            gameEvents.emit('list:updated');

            return {
                id: String(created._id),
                name: input.name,
                isPasswordProtected: !!input.password,
                status: GameStatus.WAITING,
                players,
                playersOrder,
                state,
                createdAt,
            };
        }),

    join: protectedProcedure
        .input(z.object({ gameId: z.string() }))
        .mutation(async ({ input }) => {
            gameEvents.emit('list:updated');
            gameEvents.emit(`game:${input.gameId}:updated`);
            return { gameId: input.gameId, status: GameStatus.WAITING };
        }),

    onListChange: protectedProcedure.subscription(async function* () {
        for await (const _ of on(gameEvents, 'list:updated')) {
            yield;
        }
    }),

    onGameChange: protectedProcedure
        .input(z.object({ gameId: z.string() }))
        .subscription(async function* ({ input }) {
            for await (const _ of on(gameEvents, `game:${input.gameId}:updated`)) {
                yield;
            }
        }),
});
