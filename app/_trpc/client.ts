import { createTRPCReact } from '@trpc/react-query';
import { type AppRouter } from '@/app/api/trpc/routers';

export const trpc = createTRPCReact<AppRouter>({});
