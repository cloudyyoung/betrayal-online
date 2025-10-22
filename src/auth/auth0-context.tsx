import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getAuth0UserMetadata, updateAuth0UserMetadata } from './auth0-metadata';

interface Auth0ContextType {
    accessToken: string | null;
    userMetadata: any;
    isLoadingMetadata: boolean;
    refreshMetadata: () => Promise<void>;
    updateMetadata: (matchID: string, credentials: string) => Promise<void>;
}

const Auth0Context = createContext<Auth0ContextType | undefined>(undefined);

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

            const metadata = await getAuth0UserMetadata(token, user.sub);
            setUserMetadata(metadata);
        } catch (error) {
            console.error('Failed to load Auth0 token or metadata:', error);
        } finally {
            setIsLoadingMetadata(false);
        }
    };

    useEffect(() => {
        loadTokenAndMetadata();
    }, [isAuthenticated, user?.sub]);

    const refreshMetadata = async () => {
        await loadTokenAndMetadata();
    };

    const updateMetadata = async (matchID: string, credentials: string) => {
        if (!accessToken || !user?.sub) {
            throw new Error('Not authenticated');
        }

        try {
            const updatedMetadata = await updateAuth0UserMetadata(
                accessToken,
                user.sub,
                matchID,
                credentials
            );
            setUserMetadata(updatedMetadata);
        } catch (error) {
            console.error('Failed to update metadata:', error);
            throw error;
        }
    };

    return (
        <Auth0Context.Provider
            value={{
                accessToken,
                userMetadata,
                isLoadingMetadata,
                refreshMetadata,
                updateMetadata,
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
