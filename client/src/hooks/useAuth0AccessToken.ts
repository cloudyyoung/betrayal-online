import { useCallback, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

/**
 * Hook: useAuth0AccessToken
 *
 * Returns the current access token (if available) and a helper to (re)fetch it.
 * It attempts to get the token silently and falls back to a popup if necessary.
 *
 * Usage:
 * const { accessToken, getAccessToken, isAuthenticated } = useAuth0AccessToken(audience)
 */
export function useAuth0AccessToken(audience?: string, scope?: string) {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()
    const [accessToken, setAccessToken] = useState<string | null>(null)

    const getAccessToken = useCallback(
        async (opts?: { forceRefresh?: boolean }) => {
            const tokenResponse = await getAccessTokenSilently({
                audience,
                scope,
                ...(opts?.forceRefresh ? { ignoreCache: true } : {}),
            } as any)

            const token = tokenResponse.access_token

            setAccessToken(token)
            return token
        },
        [audience, scope, getAccessTokenSilently],
    )

    useEffect(() => {
        if (isAuthenticated) {
            void getAccessToken()
        } else if (!isAuthenticated) {
            setAccessToken(null)
        }
    }, [isAuthenticated, getAccessToken])

    return {
        accessToken,
        getAccessToken,
        isAuthenticated,
    } as const
}

export default useAuth0AccessToken
