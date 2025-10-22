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
    const [matches, setMatches] = useState<LobbyAPI.Match[]>([])

    const loadMatches = async () => {
        const res = await lobbyClient.listMatches(BETRAYAL_GAME_NAME)
        setMatches(res.matches)
    }

    useEffect(() => {
        loadMatches()
        const interval = setInterval(loadMatches, 10000);
        return () => clearInterval(interval);
    }, [])

    return (
        <CoverContainer>
            <div className='bg-red-800/10 p-6 space-y-5 my-12'>
                <div className='flex items-center justify-between mb-6'>
                    <h1 className='text-3xl font-tomarik-brush text-red-900/85'>Available Matches</h1>
                    <Button onClick={loadMatches} className='bg-amber-700 text-white px-4 py-2 hover:bg-amber-600'>Refresh</Button>
                </div>

                {matches.length === 0 && (
                    <div className='p-6 text-amber-900'>No matches found.</div>
                )}
                {matches.map((m) => {
                    const occupied = m.players.filter(p => p.name).length
                    const capacity = m.players.length
                    return (
                        <div key={m.matchID} className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                            <div>
                                <div className='text-amber-900 font-medium'>Match {m.matchID}</div>
                                <div className='text-amber-800 text-sm'>{occupied}/{capacity} players</div>
                            </div>
                            <div className='flex items-center gap-3'>
                                <Button onClick={() => navigate(`/matches/${encodeURIComponent(m.matchID)}`)} className='bg-amber-500 text-white px-4 py-2 hover:bg-amber-600'>Details</Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </CoverContainer>
    )
}
