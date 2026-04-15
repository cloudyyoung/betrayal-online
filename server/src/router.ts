import { router } from './trpc';
import { gameRouter } from './routers/game';
import { authRouter } from './routers/auth';

export const appRouter = router({
    auth: authRouter,
    game: gameRouter,
});

export type AppRouter = typeof appRouter;
