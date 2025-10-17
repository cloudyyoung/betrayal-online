import { LobbyAPI } from 'boardgame.io';
import { LobbyClient } from 'boardgame.io/client';
import { useEffect, useState } from 'react';
import { Button } from './components/button';

const lobbyClient = new LobbyClient({
    server: `http://${window.location.hostname}:8000`,
});

const BetrayalLobby = () => {
    const [matchList, setMatchList] = useState<LobbyAPI.MatchList>({ matches: [] });

    useEffect(() => {
        document.title = "Lobby - Betrayal Online";
        (async () => {
            const matchList = await lobbyClient.listMatches('betrayal-at-the-house-on-the-hill');
            setMatchList(matchList);
        })();
    }, [])

    const createMatch = async () => {
        await lobbyClient.createMatch('betrayal-at-the-house-on-the-hill', {
            numPlayers: 6,
        });
        const matchList = await lobbyClient.listMatches('betrayal-at-the-house-on-the-hill');
        setMatchList(matchList);
    }

    const joinMatch = async (matchID: string) => {
        await lobbyClient.joinMatch('betrayal-at-the-house-on-the-hill', matchID, {
            playerID: '00',
            playerName: 'Player 1',
        });
    }

    return (
        <div className='relative min-h-screen flex flex-col items-center py-8'>
            <img
                className='absolute inset-0 -z-10 w-full h-full object-cover'
                src="/bg-light.png"
                alt="background"
            />
            <img
                className='h-40 relative z-10'
                src="/betrayal_logo.png"
                alt="logo"
            />
            <div className='text-zinc-950 w-xl relative z-10'>
                This online version of Betrayal at the House on the Hill (3rd Edition) is an unofficial, fan-made project created solely for personal entertainment and educational purposes.
                All rights to Betrayal at the House on the Hill, including its game mechanics, artwork, trademarks, and intellectual property, are owned by Avalon Hill and Hasbro, Inc.
                This project is not affiliated with, endorsed by, or supported by Avalon Hill, Hasbro, or any of their subsidiaries or partners.
                No copyright or trademark infringement is intended.
                Players are encouraged to support the official release by purchasing the physical game through authorized retailers.
            </div>
            <h1 className='relative z-10'>Lobby</h1>
            <div className='relative z-10'>
                {matchList.matches.map((match) => (
                    <div key={match.matchID} className="border border-zinc-700 rounded p-4 mb-4">
                        <div>Match ID: {match.matchID}</div>
                        <div>Players: {match.players.length} / 6</div>
                    </div>
                ))}
            </div>
            <Button className='relative z-10'>Create match</Button>
        </div>
    )
}

export default BetrayalLobby