import { useNavigate } from 'react-router-dom'
import { Button } from '../components/button'
import { CoverContainer } from '../components/cover-container'
import { trpc } from '../trpc'

export default function GamesList() {
    const navigate = useNavigate()
    const utils = trpc.useUtils()
    const { data: games = [], refetch } = trpc.game.list.useQuery()

    trpc.game.onListChange.useSubscription(undefined, {
        onData: () => {
            utils.game.list.invalidate()
        },
    })

    const onGameDetails = (gameId: string) => {
        navigate(`/games/${encodeURIComponent(gameId)}`)
    }

    return (
        <CoverContainer>
            <div className='bg-red-800/10 p-6 space-y-5 my-12'>
                <div className='flex items-center justify-between mb-6'>
                    <h1 className='text-3xl font-tomarik-brush text-red-900/85'>Available Games</h1>
                    <div className='flex gap-2'>
                        <Button onClick={() => navigate(-1)} className='bg-amber-900/20 text-amber-900 px-4 py-2 hover:bg-amber-900/30'>Back</Button>
                        <Button onClick={() => refetch()} className='bg-amber-700 text-white px-4 py-2 hover:bg-amber-600'>Refresh</Button>
                    </div>
                </div>

                {games.map((game) => (
                    <div
                        key={game.id}
                        className='p-4 bg-white/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 cursor-pointer'
                        onClick={() => onGameDetails(game.id)}
                    >
                        <div>
                            <div className='text-xl text-amber-900 font-medium'>{game.name}</div>
                            <div className='text-amber-800 text-sm'>{Object.keys(game.players).length}/6 players</div>
                            <p className='text-sm text-amber-800'>Status: {game.status}</p>
                            <p className='text-sm text-amber-800'>Password Protected: {game.isPasswordProtected ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                ))}

                {games.length === 0 && (
                    <div className='text-amber-900'>No games found.</div>
                )}
            </div>
        </CoverContainer>
    )
}
