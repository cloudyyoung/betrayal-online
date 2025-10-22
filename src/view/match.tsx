import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LobbyClient } from 'boardgame.io/client'
import type { LobbyAPI } from 'boardgame.io'
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../components/button'
import { BETRAYAL_GAME_NAME } from '../game'
import { CoverContainer } from '../components/cover-container'

const lobbyClient = new LobbyClient({
    server: `http://${window.location.hostname}:8000`,
})

export default function JoinMatch() {
    const navigate = useNavigate()
    const { user } = useAuth0();
    const { matchID } = useParams<{ matchID: string }>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [match, setMatch] = useState<LobbyAPI.Match | null>(null)

    const occupied = useMemo(() => match?.players.filter(p => p.name).length ?? 0, [match])
    const capacity = useMemo(() => match?.players.length ?? 0, [match])

    const load = async () => {
        if (!matchID) return
        setLoading(true)
        setError(null)
        try {
            const res = await lobbyClient.listMatches(BETRAYAL_GAME_NAME)
            const found = res.matches.find(m => m.matchID === matchID) ?? null
            setMatch(found)
        } catch (e: any) {
            setError(e?.message ?? 'Failed to load match')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { load() /* eslint-disable-line react-hooks/exhaustive-deps */ }, [matchID])

    const onJoin = async () => {
        if (!match || !matchID) return
        setError(null)
        setLoading(true)
        try {
            const joinRes = await lobbyClient.joinMatch(BETRAYAL_GAME_NAME, matchID, {
                playerID: user?.sub,
                playerName: user?.name || user?.given_name || user?.nickname || 'Player',
            }) as any
            const credentials: string | undefined = joinRes?.playerCredentials
            if (!credentials) throw new Error('Failed to get credentials')
            navigate(`/games/${matchID}/board`)
        } catch (e: any) {
            setError(e?.message ?? 'Failed to join match')
        } finally {
            setLoading(false)
        }
    }

    return (
        <CoverContainer>
            <div className='bg-red-800/10 p-6 space-y-5 my-12'>
                <h1 className='text-3xl font-tomarik-brush text-red-900/85 mb-6'>Join Game</h1>

                {error && <div className='text-sm text-red-700 mb-4'>{error}</div>}
                {loading && <div className='text-amber-900 mb-4'>Loading…</div>}

                {!match && !loading && (
                    <div className='bg-white/85 rounded-lg shadow p-6 text-amber-900'>Game not found.</div>
                )}

                {match && (
                    <div className='space-y-4'>
                        <div>
                            <div className='text-amber-900 font-medium'>Game {match.matchID}</div>
                            <div className='text-amber-800 text-sm'>{occupied}/{capacity} players</div>
                        </div>

                        <div className='space-y-2'>
                            <div className='text-amber-900 font-medium'>Players</div>
                            <ul className='list-disc list-inside text-amber-800'>
                                {match.players.map((p) => (
                                    <li key={p.id}>{p.name ?? <span className='italic text-amber-700'>Empty</span>}</li>
                                ))}
                            </ul>
                        </div>

                        <div className='pt-2'>
                            <Button onClick={onJoin} disabled={loading} className='bg-yellow-700 text-white px-4 py-2 hover:bg-yellow-600 disabled:opacity-50'>Join Match</Button>
                        </div>
                    </div>
                )}
            </div>
        </CoverContainer>
    )
}
