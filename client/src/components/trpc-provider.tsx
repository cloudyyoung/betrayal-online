import React, { createContext, useContext, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWSClient, httpBatchLink, splitLink, wsLink } from '@trpc/client';
import { trpc } from '../trpc';
import { getToken, getStoredAccount } from '../auth';

const queryClient = new QueryClient();

const HTTP_URL = 'http://localhost:4000/trpc';
const WS_URL = 'ws://localhost:4000';

const WsStatusContext = createContext<boolean>(false);

export function useWsConnected() {
    return useContext(WsStatusContext);
}

export function TrpcProvider({ children }: { children: React.ReactNode }) {
    const [wsConnected, setWsConnected] = useState(false);

    const [trpcClient] = useState(() => {
        const wsClient = createWSClient({
            url: WS_URL,
            connectionParams: () => {
                const user = getStoredAccount();
                return user ? { token: getToken(user) } : {};
            },
            onOpen: () => setWsConnected(true),
            onClose: () => setWsConnected(false),
        });

        return trpc.createClient({
            links: [
                splitLink({
                    condition: op => op.type === 'subscription',
                    true: wsLink({ client: wsClient }),
                    false: httpBatchLink({
                        url: HTTP_URL,
                        headers() {
                            const user = getStoredAccount();
                            return user ? { Authorization: `Bearer ${getToken(user)}` } : {};
                        },
                    }),
                }),
            ],
        });
    });

    return (
        <WsStatusContext.Provider value={wsConnected}>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </trpc.Provider>
        </WsStatusContext.Provider>
    );
}

export default TrpcProvider;
