import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LobbyClient } from 'boardgame.io/client'
import type { LobbyAPI } from 'boardgame.io'
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '../components/button'
import { BETRAYAL_GAME_NAME } from '../game'
import { CoverContainer } from '../components/cover-container'
import { useAuth0Context } from '../auth/auth0-context';

const lobbyClient = new LobbyClient({
    server: `http://${window.location.hostname}:8000`,
})

export default function Match() {
    const { user } = useAuth0()
    const { userMetadata } = useAuth0Context()
    const { matchID } = useParams<{ matchID: string }>()
    const [match, setMatch] = useState<LobbyAPI.Match | null>(null)

    const occupied = useMemo(() => match?.players.filter(p => p.name).length ?? 0, [match])
    const capacity = useMemo(() => match?.players.length ?? 0, [match])

    if (!matchID) return
    if (!user) return

    const load = async () => {
        const match = await lobbyClient.getMatch(BETRAYAL_GAME_NAME, matchID)
        setMatch(match);
    }

    useEffect(() => {
        load()
        const interval = setInterval(load, 5000);
        return () => clearInterval(interval);
    }, [matchID, userMetadata]);

    const joinedMatch = useMemo(() => {
        if (!userMetadata || !matchID) return false;
        const savedMatch = userMetadata[matchID];
        return !!savedMatch;
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
                            <div className='text-amber-900 font-medium'>Match {match.matchID}</div>
                            <div className='text-amber-800 text-sm'>{occupied}/{capacity} players</div>
                        </div>

                        <div className='space-y-2'>
                            <div className='text-amber-900 font-medium'>Players</div>
                            <div className='text-amber-800 space-y-1'>
                                {match.players.map((p) => (
                                    <PlayerItem key={p.id} name={p.name} picture={p.data?.picture} />
                                ))}
                            </div>
                        </div>

                        <div className='pt-2'>
                            {!joinedMatch && <NotJoinedMatchButtons matchID={matchID} />}
                            {joinedMatch && <JoinedMatchButtons matchID={matchID} />}
                        </div>
                    </div>
                )}
            </div>
        </CoverContainer>
    )
}

const NotJoinedMatchButtons = ({ matchID }: { matchID: string }) => {
    const { user } = useAuth0();
    const { updateMetadata } = useAuth0Context()

    if (!user) return null;

    const onJoin = async () => {
        const joinRes = await lobbyClient.joinMatch(BETRAYAL_GAME_NAME, matchID, {
            playerName: user.name || user.given_name || user.nickname || 'Player',
            data: {
                sub: user.sub,
                picture: user.picture,
            },
        })
        const credentials = joinRes.playerCredentials
        await updateMetadata(matchID, credentials);
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

const JoinedMatchButtons = ({ matchID }: { matchID: string }) => {
    const navigate = useNavigate();

    return (
        <>
            <Button
                onClick={() => navigate(`/matches/${matchID}/board`)}
                className='bg-green-700 text-white px-4 py-2 hover:bg-green-800 disabled:opacity-50'
            >
                Go to Board
            </Button>
        </>
    )
}

const PlayerItem = ({ name, picture }: { name?: string; picture?: string }) => {
    return (
        <div className='flex flex-row justify-start items-center'>
            {picture && <img src={picture} alt={name} className='inline-block w-6 h-6 rounded-full mr-2 align-middle bg-orange-700/20' />}
            {!picture && <div aria-hidden={true} className='inline-block w-6 h-6 rounded-full mr-2 align-middle bg-orange-700/20' />}
            {name && <span>{name}</span>}
            {!name && <span className="italic">Empty</span>}
        </div>
    )
}