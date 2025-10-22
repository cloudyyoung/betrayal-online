import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { LobbyClient } from 'boardgame.io/client'
import { BETRAYAL_GAME_NAME } from '../game';

interface Auth0ContextType {
    accessToken: string | null;
    userMetadata: any;
    isLoadingMetadata: boolean;
    refreshMetadata: () => Promise<void>;
    getMetadata: (matchID: string) => Promise<any>;
    updateMetadata: (matchID: string, playerID: string, credentials: string) => Promise<void>;
    deleteMetadata: (matchID: string) => Promise<void>;
}

const Auth0Context = createContext<Auth0ContextType | undefined>(undefined);

const lobbyClient = new LobbyClient({
    server: `http://${window.location.hostname}:8000`,
})

export const Auth0ContextProvider = ({ children }: { children: ReactNode }) => {
    const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [userMetadata, setUserMetadata] = useState<any>(null);
    const [isLoadingMetadata, setIsLoadingMetadata] = useState(false);

    const loadTokenAndMetadata = async () => {
        if (!isAuthenticated || !user?.sub) {
            setAccessToken(null);
            setUserMetadata(null);
            return;
        }

        try {
            setIsLoadingMetadata(true);
            const token = await getAccessTokenSilently();
            setAccessToken(token);

            const res = await fetch(`https://cloudyyoung.auth0.com/api/v2/users/${encodeURIComponent(user.sub)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setUserMetadata(data.user_metadata);
        } catch (error) {
            console.error('Failed to load Auth0 token or metadata:', error);
        } finally {
            setIsLoadingMetadata(false);
        }
    };

    useEffect(() => {
        loadTokenAndMetadata();
        refreshLobbyPlayerMetadata();
    }, [isAuthenticated, user?.sub]);

    const refreshMetadata = async () => {
        await loadTokenAndMetadata();
        await refreshLobbyPlayerMetadata();
    };

    const getMetadata = (matchID: string) => {
        if (!accessToken || !user?.sub || !userMetadata) {
            return null
        }

        return userMetadata[`match|${matchID}`];
    }

    const updateMetadata = async (matchID: string, playerID: string, credentials: string) => {
        if (!accessToken || !user?.sub) {
            throw new Error('Not authenticated');
        }

        try {
            const res = await fetch(`https://cloudyyoung.auth0.com/api/v2/users/${encodeURIComponent(user.sub)}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_metadata: {
                        [`match|${matchID}`]: {
                            playerID,
                            credentials
                        }
                    }
                })
            });

            const data = await res.json();
            setUserMetadata(data.user_metadata);
        } catch (error) {
            console.error('Failed to update metadata:', error);
            throw error;
        }
    };

    const deleteMetadata = async (matchID: string) => {
        if (!accessToken || !user?.sub) {
            throw new Error('Not authenticated');
        }

        try {
            const res = await fetch(`https://cloudyyoung.auth0.com/api/v2/users/${encodeURIComponent(user.sub)}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_metadata: {
                        [`match|${matchID}`]: undefined
                    }
                })
            });

            const data = await res.json();
            setUserMetadata(data.user_metadata);
        } catch (error) {
            console.error('Failed to delete metadata:', error);
            throw error;
        }
    }

    const refreshLobbyPlayerMetadata = async () => {
        if (!user || !userMetadata) return;

        const updatePlayerMetadataRequests = []
        for (const userMetadataKey in userMetadata) {
            if (!userMetadataKey.startsWith('match|')) continue
            const matchID = userMetadataKey.replace('match|', '');
            const { playerID, credentials } = userMetadata[userMetadataKey];
            updatePlayerMetadataRequests.push(
                async () => {
                    try {
                        await lobbyClient.updatePlayer(BETRAYAL_GAME_NAME, matchID, {
                            playerID,
                            credentials,
                            data: {
                                sub: user.sub,
                                picture: user.picture,
                            }
                        })
                    } catch (error) {
                        deleteMetadata(matchID);
                    }
                }
            )
        }

        await Promise.all(updatePlayerMetadataRequests)
    }

    return (
        <Auth0Context.Provider
            value={{
                accessToken,
                userMetadata,
                isLoadingMetadata,
                refreshMetadata,
                getMetadata,
                updateMetadata,
                deleteMetadata,
            }}
        >
            {children}
        </Auth0Context.Provider>
    );
};

export const useAuth0Context = () => {
    const context = useContext(Auth0Context);
    if (context === undefined) {
        throw new Error('useAuth0Context must be used within Auth0ContextProvider');
    }
    return context;
};
