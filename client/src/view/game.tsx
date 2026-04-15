import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../components/auth-provider';
import { Button } from '../components/button'
import { CoverContainer } from '../components/cover-container'
import { trpc } from '../trpc'

export default function Game() {
    const { gameId } = useParams<{ gameId: string }>()
    const utils = trpc.useUtils()
    const { data: game } = trpc.game.get.useQuery(
        { gameId: gameId! },
        { enabled: !!gameId }
    )

    trpc.game.onGameChange.useSubscription(
        { gameId: gameId! },
        {
            enabled: !!gameId,
            onData: () => {
                utils.game.get.invalidate({ gameId: gameId! })
            },
        }
    )

    if (!gameId) return null

    return (
        <CoverContainer>
            <div className='bg-red-800/10 p-6 space-y-5 my-12'>
                <h1 className='text-3xl font-tomarik-brush text-red-900/85 mb-6'>Join Game</h1>

                {!game && (
                    <div className='text-amber-900'>Game not found.</div>
                )}

                {game && (
                    <div className='space-y-4'>
                        <div>
                            <div className='text-amber-900 font-medium'>Match {game.id}</div>
                            <div className='text-amber-800 text-sm'>0/0 players</div>
                        </div>

                        <div className='space-y-2'>
                            <div className='text-amber-900 font-medium'>Players</div>
                            <div className='text-amber-800 space-y-1'>

                            </div>
                        </div>

                        <div className='pt-2'>
                            {!true && <NotJoinedMatchButtons matchID={gameId} />}
                            {true && <JoinedMatchButtons matchID={gameId} isFull={false} />}
                        </div>
                    </div>
                )}
            </div>
        </CoverContainer>
    )
}

const NotJoinedMatchButtons = ({ matchID: _matchID }: { matchID: string }) => {
    const { user } = useAuth();

    if (!user) return null;

    const onJoin = async () => {
    }

    return (
        <>
            <Button
                onClick={onJoin}
                className='bg-yellow-700 text-white px-4 py-2 hover:bg-yellow-600 disabled:opacity-50'
            >
                Join Match
            </Button>
        </>
    )
}

const JoinedMatchButtons = ({ matchID, isFull }: { matchID: string; isFull: boolean }) => {
    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const onGoToBoard = () => {
        navigate(`/matches/${matchID}/board`);
    }
    const confirmLeaveMatch = async () => {
        setShowConfirmation(false);
        navigate(`/games/`);
    }
    const onLeaveMatchClick = () => {
        setShowConfirmation(true);
    }
    const onCancelLeave = () => {
        setShowConfirmation(false);
    }

    return (
        <>
        <div className="flex flex-col gap-2">
            {!isFull && <p className='text-orange-800/80'>Waiting for players...</p>}
            <div className="flex flex-row gap-2">
                <Button
                    onClick={onGoToBoard}
                    disabled={!isFull}
                    className='bg-green-700 text-white px-4 py-2 hover:bg-green-800 disabled:opacity-50'
                >
                    Go to Board
                </Button>
                <Button
                    onClick={onLeaveMatchClick}
                    className='bg-yellow-700 text-white px-4 py-2 hover:bg-yellow-600'
                >
                    Leave Game
                </Button>
            </div>
        </div>
        {showConfirmation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white/80 rounded-lg shadow-lg p-6 max-w-sm w-full">
                        <p className="text-red-900/85 text-xl font-tomarik-brush mb-3">Are you sure you wnat to leave?</p>
                        <p className="text-sm text-gray-600 mb-6">
                            The game is about to start!
                        </p>
                        <div className="flex justify-end gap-2">
                            <Button
                                onClick={onCancelLeave}
                                className='bg-green-700 text-white px-4 py-2 hover:bg-green-800 disabled:opacity-50'
                            >
                                Continue Waiting
                            </Button>
                            <Button
                                onClick={confirmLeaveMatch}
                                className='bg-yellow-700 text-white px-4 py-2 hover:bg-yellow-600'
                            >
                                Leave
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            </>
    )
}
