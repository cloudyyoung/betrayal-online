import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LobbyClient } from 'boardgame.io/client'
import type { LobbyAPI } from 'boardgame.io'
import { Button } from '../components/button'
import { BETRAYAL_GAME_NAME } from '../game'
import UserProfile from '../components/user-profile'

const lobbyClient = new LobbyClient({
    server: `http://${window.location.hostname}:8000`,
})

export default function JoinMatch() {
    const navigate = useNavigate()
    const { matchID } = useParams<{ matchID: string }>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [match, setMatch] = useState<LobbyAPI.Match | null>(null)
    const [playerName, setPlayerName] = useState('')

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
            if (found && !playerName) {
                // Pre-fill if there's a free slot index
                const firstEmpty = found.players.find(p => !p.name)
                if (firstEmpty) setPlayerName('Player')
            }
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
            const firstEmpty = match.players.find((p) => !p.name)
            if (!firstEmpty) throw new Error('Match is full')
            const joinRes = await lobbyClient.joinMatch(BETRAYAL_GAME_NAME, matchID, {
                playerID: String(firstEmpty.id),
                playerName: playerName.trim() || 'Player',
            }) as any
            const credentials: string | undefined = joinRes?.playerCredentials
            if (!credentials) throw new Error('Failed to get credentials')
            navigate(`/play?matchID=${encodeURIComponent(matchID)}&playerID=${firstEmpty.id}&credentials=${encodeURIComponent(credentials)}`)
        } catch (e: any) {
            setError(e?.message ?? 'Failed to join match')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-[url("/bg-light-big.webp")] bg-repeat bg-cover bg-center'>
            <div className='absolute top-6 right-6 z-10'>
                <UserProfile />
            </div>
            <div className='max-w-xl mx-auto px-6 py-10'>
                <h1 className='text-3xl font-tomarik-brush text-yellow-900 mb-6'>Join Game</h1>

                {error && <div className='text-sm text-red-700 mb-4'>{error}</div>}
                {loading && <div className='text-amber-900 mb-4'>Loading…</div>}

                {!match && !loading && (
                    <div className='bg-white/85 rounded-lg shadow p-6 text-amber-900'>Match not found.</div>
                )}

                {match && (
                    <div className='bg-white/85 rounded-lg shadow p-6 space-y-4'>
                        <div>
                            <div className='text-amber-900 font-medium'>Match {match.matchID}</div>
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

                        <div>
                            <label className='block text-sm font-medium text-amber-900 mb-1'>Your name</label>
                            <input
                                className='w-full rounded border border-amber-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500'
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder='Enter your name'
                            />
                        </div>

                        <div className='pt-2'>
                            <Button onClick={onJoin} disabled={loading || !playerName.trim()} className='bg-yellow-700 text-white px-4 py-2 hover:bg-yellow-600 disabled:opacity-50'>Join Match</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
