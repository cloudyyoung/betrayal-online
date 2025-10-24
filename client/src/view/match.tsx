import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../components/button'
import { CoverContainer } from '../components/cover-container'
import { useAuthContext } from '../contexts/auth-context';

export default function Match() {
    const { user } = useAuth0()
    const { userMetadata, getMetadata } = useAuthContext()
    const { matchID } = useParams<{ matchID: string }>()
    const [match, setMatch] = useState(null)

    if (!matchID) return
    if (!user) return

    const load = async () => {
        const match = null
        setMatch(match);
    }

    useEffect(() => {
        load()
        const interval = setInterval(load, 5000);
        return () => clearInterval(interval);
    }, [matchID, userMetadata]);

    const joinedMatch = useMemo(() => {
        return !!getMetadata(matchID)
    }, [userMetadata, matchID]);

    return (
        <CoverContainer>
            <div className='bg-red-800/10 p-6 space-y-5 my-12'>
                <h1 className='text-3xl font-tomarik-brush text-red-900/85 mb-6'>Join Match</h1>

                {!match && (
                    <div className='text-amber-900'>Match not found.</div>
                )}

                {match && (
                    <div className='space-y-4'>
                        <div>
                            <div className='text-amber-900 font-medium'>Match {match}</div>
                            <div className='text-amber-800 text-sm'>0/0 players</div>
                        </div>

                        <div className='space-y-2'>
                            <div className='text-amber-900 font-medium'>Players</div>
                            <div className='text-amber-800 space-y-1'>

                            </div>
                        </div>

                        <div className='pt-2'>
                            {!joinedMatch && <NotJoinedMatchButtons matchID={matchID} />}
                            {joinedMatch && <JoinedMatchButtons matchID={matchID} isFull={false} />}
                        </div>
                    </div>
                )}
            </div>
        </CoverContainer>
    )
}

const NotJoinedMatchButtons = ({ matchID }: { matchID: string }) => {
    const { user } = useAuth0();
    const { updateMetadata } = useAuthContext()

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
    const { userMetadata, deleteMetadata } = useAuthContext()
    const onGoToBoard = () => {
        navigate(`/matches/${matchID}/board`);
    }
    const onLeaveMatch = async () => {
        const playerID = userMetadata[matchID]?.playerID;
        const credentials = userMetadata[matchID]?.credentials;

        navigate(`/matches/`);
    }

    return (
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
                    onClick={onLeaveMatch}
                    className='bg-yellow-700 text-white px-4 py-2 hover:bg-yellow-600'
                >
                    Leave Match
                </Button>
            </div>
        </div>
    )
}

const PlayerItem = ({ name, picture }: { name?: string; picture?: string }) => {
    return (
        <div className='flex flex-row justify-start items-center'>
            {name && picture && <img src={picture} alt={name} className='inline-block w-6 h-6 rounded-full mr-2 align-middle bg-orange-700/20' />}
            {(!name || !picture) && <div aria-hidden={true} className='inline-block w-6 h-6 rounded-full mr-2 align-middle bg-orange-700/20' />}
            {name && <span>{name}</span>}
            {!name && <span className="italic">Empty</span>}
        </div>
    )
}