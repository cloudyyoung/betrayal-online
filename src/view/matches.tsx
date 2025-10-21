import { useEffect, useState } from 'react'
import { LobbyClient } from 'boardgame.io/client'
import { LobbyAPI } from 'boardgame.io'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/button'
import { BETRAYAL_GAME_NAME } from '../game'
import { CoverContainer } from '../components/cover-container'

const lobbyClient = new LobbyClient({
    server: `http://${window.location.hostname}:8000`,
})

export default function MatchesList() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [matches, setMatches] = useState<LobbyAPI.Match[]>([])
    const [nameByMatch, setNameByMatch] = useState<Record<string, string>>({})

    const loadMatches = async () => {
        setLoading(true)
        setError(null)
        try {
            const res = await lobbyClient.listMatches(BETRAYAL_GAME_NAME)
            setMatches(res.matches)
        } catch (e: any) {
            setError(e?.message ?? 'Failed to load matches')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadMatches()
    }, [])

    const joinSlot = async (m: LobbyAPI.Match) => {
        setError(null)
        const playerName = nameByMatch[m.matchID]?.trim() || 'Player'
        // Find first empty slot
        const empty = m.players.find((p) => !p.name)
        if (!empty) {
            setError('Match is full')
            return
        }
        try {
            const joinRes = await lobbyClient.joinMatch(BETRAYAL_GAME_NAME, m.matchID, {
                playerID: String(empty.id),
                playerName,
            }) as any
            const credentials: string | undefined = joinRes?.playerCredentials
            if (!credentials) throw new Error('Failed to get credentials')
            navigate(`/play?matchID=${encodeURIComponent(m.matchID)}&playerID=${empty.id}&credentials=${encodeURIComponent(credentials)}`)
        } catch (e: any) {
            setError(e?.message ?? 'Failed to join match')
        }
    }

    return (
        <CoverContainer>
            <div className='flex items-center justify-between mb-6'>
                <h1 className='text-3xl font-tomarik-brush text-yellow-900'>Available Matches</h1>
                <Button onClick={loadMatches} className='bg-amber-700 text-white px-4 py-2 hover:bg-amber-600'>Refresh</Button>
            </div>

            {error && <div className='text-sm text-red-700 mb-4'>{error}</div>}
            {loading && <div className='text-amber-900'>Loading…</div>}

            <div className='bg-white/85 rounded-lg shadow divide-y'>
                {matches.length === 0 && !loading && (
                    <div className='p-6 text-amber-900'>No matches found.</div>
                )}
                {matches.map((m) => {
                    const occupied = m.players.filter(p => p.name).length
                    const capacity = m.players.length
                    return (
                        <div key={m.matchID} className='p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                            <div>
                                <div className='text-amber-900 font-medium'>Match {m.matchID}</div>
                                <div className='text-amber-800 text-sm'>{occupied}/{capacity} players</div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <input
                                    placeholder='Your name'
                                    className='rounded border border-amber-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500'
                                    value={nameByMatch[m.matchID] ?? ''}
                                    onChange={(e) => setNameByMatch({ ...nameByMatch, [m.matchID]: e.target.value })}
                                />
                                <Button onClick={() => joinSlot(m)} className='bg-yellow-700 text-white px-4 py-2 hover:bg-yellow-600'>Join</Button>
                                <Button onClick={() => navigate(`/join/${encodeURIComponent(m.matchID)}`)} className='bg-white/90 text-amber-800 border border-amber-300 px-4 py-2 hover:bg-white'>Details</Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </CoverContainer>
    )
}
