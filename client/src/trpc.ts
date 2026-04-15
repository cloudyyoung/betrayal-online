import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@betrayal/server';

export const trpc = createTRPCReact<AppRouter>();
