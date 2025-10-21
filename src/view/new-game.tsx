import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LobbyClient } from 'boardgame.io/client'
import { Button } from '../components/button'
import { BETRAYAL_GAME_NAME } from '../game'

const lobbyClient = new LobbyClient({
    server: `http://${window.location.hostname}:8000`,
})

export default function NewGame() {
    const navigate = useNavigate()
    const [playerName, setPlayerName] = useState('Player 1')
    const [numPlayers, setNumPlayers] = useState<number>(4)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const onCreate = async () => {
        setError(null)
        setLoading(true)
        try {
            const { matchID } = await lobbyClient.createMatch(BETRAYAL_GAME_NAME, {
                numPlayers,
            })

            const joinRes = await lobbyClient.joinMatch(BETRAYAL_GAME_NAME, matchID, {
                playerID: '0',
                playerName,
            }) as any

            const playerCredentials: string | undefined = joinRes?.playerCredentials
            if (!playerCredentials) {
                throw new Error('Failed to get player credentials from server')
            }

            navigate(`/play?matchID=${encodeURIComponent(matchID)}&playerID=0&credentials=${encodeURIComponent(playerCredentials)}`)
        } catch (e: any) {
            setError(e?.message ?? 'Failed to create game')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-[url("/bg-light-big.webp")] bg-repeat bg-cover bg-center'>
            <div className='max-w-xl mx-auto px-6 py-10'>
                <h1 className='text-3xl font-tomarik-brush text-yellow-900 mb-6'>Create New Game</h1>

                <div className='bg-white/85 rounded-lg shadow p-6 space-y-5'>
                    <div>
                        <label className='block text-sm font-medium text-amber-900 mb-1'>Player name</label>
                        <input
                            className='w-full rounded border border-amber-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500'
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder='Your name'
                        />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-amber-900 mb-1'>Number of players</label>
                        <select
                            className='w-full rounded border border-amber-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500'
                            value={numPlayers}
                            onChange={(e) => setNumPlayers(Number(e.target.value))}
                        >
                            {[3, 4, 5, 6].map(n => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>

                    {error && (
                        <div className='text-sm text-red-700'>{error}</div>
                    )}

                    <div className='pt-2'>
                        <Button
                            onClick={onCreate}
                            className='bg-yellow-700 text-white font-tomarik-brush text-lg px-6 py-3 hover:bg-yellow-600 disabled:opacity-50'
                            disabled={loading || !playerName.trim()}
                        >
                            {loading ? 'Creating…' : 'Create Game'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
