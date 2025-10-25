import React, { createContext, useContext, useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'
import type { ServerToClientEvents, ClientToServerEvents } from '@betrayal/shared'
import { useAuth0 } from '@auth0/auth0-react'

type SocketContextValue = {
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
    connected: boolean
    connecting: boolean
    error: any | null
    connect: () => Promise<Socket<ServerToClientEvents, ClientToServerEvents> | null>
    disconnect: () => void
} | null

const SocketContext = createContext<SocketContextValue>(null)

export function SocketProvider({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0()

    const socketRef = useRef<Socket<ServerToClientEvents, ClientToServerEvents> | null>(null)
    const [connected, setConnected] = useState(false)
    const [connecting, setConnecting] = useState(false)
    const [error, setError] = useState<any | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)

    const url = "http://localhost:4000"

    const fetchToken = useCallback(async () => {
        try {
            const token = await getAccessTokenSilently()
            setAccessToken(token)
            return token
        } catch (err) {
            setAccessToken(null)
            return null
        }
    }, [getAccessTokenSilently])

    const connect = useCallback(async () => {
        if (socketRef.current && socketRef.current.connected) return socketRef.current

        setConnecting(true)
        setError(null)

        try {
            let token = accessToken
            if (!token && isAuthenticated) {
                token = await fetchToken()
            }

            const authPayload = token ? { token: `Bearer ${token}` } : undefined

            const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(url, {
                autoConnect: true,
                withCredentials: true,
                auth: authPayload,
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
    }, [accessToken, fetchToken, isAuthenticated, url])

    const disconnect = useCallback(() => {
        if (socketRef.current) {
            try {
                socketRef.current.disconnect()
            } catch (e) {
                // ignore
            }
            socketRef.current = null
        }
        setConnected(false)
        setConnecting(false)
    }, [])

    // Auto connect when authenticated
    useEffect(() => {
        if (isAuthenticated) void connect()
        else disconnect()

        return () => {
            disconnect()
        }
    }, [isAuthenticated, connect, disconnect])

    // If token changes while connected, update handshake and reconnect
    useEffect(() => {
        const socket = socketRef.current
        if (!socket) return
        if (accessToken) {
            try {
                socket.auth = { token: `Bearer ${accessToken}` }
                socket.disconnect()
                socket.connect()
            } catch (e) {
                // ignore
            }
        }
    }, [accessToken])

    // Fetch token when authenticated initially
    useEffect(() => {
        if (isAuthenticated) void fetchToken()
        else setAccessToken(null)
    }, [isAuthenticated, fetchToken])

    const value = useMemo(() => ({
        socket: socketRef.current,
        connected,
        connecting,
        error,
        connect,
        disconnect,
    }), [connected, connecting, error, connect, disconnect])

    return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
}

export function useSocketContext() {
    const ctx = useContext(SocketContext)
    if (!ctx) throw new Error('useSocketContext must be used within a <SocketProvider>')
    return ctx
}

export default SocketProvider
