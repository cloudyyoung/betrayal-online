import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWSClient, httpBatchLink, splitLink, wsLink } from '@trpc/client';
import { useAuth0 } from '@auth0/auth0-react';
import { trpc } from '../trpc';

const queryClient = new QueryClient();

const HTTP_URL = 'http://localhost:4000/trpc';
const WS_URL = 'ws://localhost:4000';

export function TrpcProvider({ children }: { children: React.ReactNode }) {
    const { getAccessTokenSilently } = useAuth0();

    const [trpcClient] = useState(() => {
        const wsClient = createWSClient({
            url: WS_URL,
            connectionParams: async () => {
                const token = await getAccessTokenSilently();
                return { token };
            },
        });

        return trpc.createClient({
            links: [
                splitLink({
                    condition: op => op.type === 'subscription',
                    true: wsLink({ client: wsClient }),
                    false: httpBatchLink({
                        url: HTTP_URL,
                        async headers() {
                            const token = await getAccessTokenSilently();
                            return { Authorization: `Bearer ${token}` };
                        },
                    }),
                }),
            ],
        });
    });

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>
    );
}

export default TrpcProvider;
