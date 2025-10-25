import { useCallback, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import type { ServerToClientEvents, ClientToServerEvents } from '@betrayal/shared'
import useAuth0AccessToken from './useAuth0AccessToken'

/**
 * Hook: useSocket
 *
 * Establishes a typed socket.io-client connection using the Auth0 access token
 * (when available). The hook auto-connects when the user is authenticated and
 * the token is present. It also cleans up on unmount or when the user logs out.
 *
 * Returns: { socket, connected, connecting, error, connect, disconnect }
 */
export function useSocket() {
    const { accessToken, getAccessToken, isAuthenticated } = useAuth0AccessToken()

    const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)
    const [connected, setConnected] = useState(false)
    const [connecting, setConnecting] = useState(false)
    const [error, setError] = useState<any | null>(null)

    const url = "http://localhost:4000"

    const connect = useCallback(async () => {
        if (socketRef.current && socketRef.current.connected) {
            return socketRef.current
        }

        setConnecting(true)
        setError(null)

        try {
            const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(url, {
                autoConnect: true,
                withCredentials: true,
                auth: { token: accessToken },
            })

            socketRef.current = socket

            socket.on('connect', () => {
                setConnected(true)
                setConnecting(false)
            })

            socket.on('disconnect', () => {
                setConnected(false)
            })

            socket.on('connect_error', (err) => {
                setError(err)
                setConnecting(false)
            })

            return socket
        } catch (err) {
            setError(err)
            setConnecting(false)
            return null
        }
    }, [accessToken, getAccessToken, isAuthenticated, url])

    useEffect(() => {
        const socket = socketRef.current
        if (!socket) return

        if (accessToken) {
            socket.auth = { token: `Bearer ${accessToken}` }
            socket.disconnect()
            socket.connect()
        }
    }, [accessToken])

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.disconnect()
            socketRef.current = null
        }
        setConnected(false)
        setConnecting(false)
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            void connect()
        } else {
            disconnect()
        }

        return () => { disconnect() }
    }, [isAuthenticated, connect, disconnect])

    return {
        socket: socketRef.current,
        connected,
        connecting,
        error,
        connect,
        disconnect,
    } as const
}

export default useSocket
