import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth0, Auth0Provider } from '@auth0/auth0-react';

const auth0Config = {
    domain: 'cloudyyoung.auth0.com',
    clientId: 'bRRsWWsltUM6Czuus0TP6gH6vu88ebx8',
    authorizationParams: {
        redirect_uri: window.location.origin,
        audience: `https://cloudyyoung.auth0.com/api/v2/`,
    },
    cacheLocation: 'localstorage' as const,
};


interface AuthContextType {
    accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const { user, getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchAccessToken = async () => {
            if (user) {
                const token = await getAccessTokenSilently();
                setAccessToken(token);
            }
        };
        fetchAccessToken();
    }, [user, getAccessTokenSilently]);

    return (
        <Auth0Provider
            domain={auth0Config.domain}
            clientId={auth0Config.clientId}
            authorizationParams={auth0Config.authorizationParams}
            cacheLocation={auth0Config.cacheLocation}
        >
            <AuthContext.Provider
                value={{
                    accessToken,
                }}
            >
                {children}
            </AuthContext.Provider>
        </Auth0Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
};
