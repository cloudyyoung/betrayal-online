import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LobbyClient } from 'boardgame.io/client'
import type { LobbyAPI } from 'boardgame.io'
import { useAuth0, User } from '@auth0/auth0-react';
import { Button } from '../components/button'
import { BETRAYAL_GAME_NAME } from '../game'
import { CoverContainer } from '../components/cover-container'
import { getAuth0UserMetadata, updateAuth0UserMetadata } from '../auth/auth0-metadata';

const lobbyClient = new LobbyClient({
    server: `http://${window.location.hostname}:8000`,
})

export default function JoinMatch() {
    const { user, getAccessTokenSilently } = useAuth0()
    const { matchID } = useParams<{ matchID: string }>()
    const [match, setMatch] = useState<LobbyAPI.Match | null>(null)
    const [userToken, setUserToken] = useState<string | null>(null)
    const [userMetadata, setUserMetadata] = useState<any>(null)

    const occupied = useMemo(() => match?.players.filter(p => p.name).length ?? 0, [match])
    const capacity = useMemo(() => match?.players.length ?? 0, [match])

    if (!matchID) return
    if (!user) return

    const load = async () => {
        const token = await getAccessTokenSilently();
        setUserToken(token);

        const [match, userMetadata] = await Promise.all([
            lobbyClient.getMatch(BETRAYAL_GAME_NAME, matchID),
            getAuth0UserMetadata(token, user.sub!)
        ])

        setMatch(match);
        setUserMetadata(userMetadata);
    }

    useEffect(() => { load() }, [matchID])

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
                    <div className='bg-white/85 rounded-lg shadow p-6 text-amber-900'>Match not found.</div>
                )}

                {match && (
                    <div className='space-y-4'>
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

                        <div className='pt-2'>
                            {!joinedMatch && <NotJoinedMatchButtons matchID={matchID} token={userToken!} user={user} />}
                            {joinedMatch && <JoinedMatchButtons matchID={matchID} />}
                        </div>
                    </div>
                )}
            </div>
        </CoverContainer>
    )
}

const NotJoinedMatchButtons = ({
    matchID, token, user
}: {
    matchID: string, token: string, user: User
}) => {
    const onJoin = async () => {
        const joinRes = await lobbyClient.joinMatch(BETRAYAL_GAME_NAME, matchID, {
            playerName: user.name || user.given_name || user.nickname || 'Player',
            data: {
                sub: user.sub,
                picture: user.picture,
            },
        })
        const credentials = joinRes.playerCredentials
        await updateAuth0UserMetadata(token, user.sub!, matchID, credentials);
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
