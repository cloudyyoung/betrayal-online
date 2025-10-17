import { LobbyAPI } from 'boardgame.io';
import { LobbyClient } from 'boardgame.io/client';
import { useEffect, useState } from 'react';

const lobbyClient = new LobbyClient({
    server: `http://${window.location.hostname}:8000`,
});

const BetrayalLobby = () => {
    const [playerName, setPlayerName] = useState<string>('');
    const [matchList, setMatchList] = useState<LobbyAPI.MatchList>({ matches: [] });

    useEffect(() => {
        document.title = "Lobby - Betrayal Online";
        (async () => {
            const matchList = await lobbyClient.listMatches('betrayal-at-the-house-on-the-hill');
            setMatchList(matchList);
        })();
    }, [])

    return (
        <div className='min-h-screen flex flex-col items-center py-8 bg-zinc-950'>
            <img
                className='h-40'
                src="public/betrayal_logo.png"
            />
            <div className='text-zinc-300 text-sm w-xl'>
                This online version of Betrayal at the House on the Hill (3rd Edition) is an unofficial, fan-made project created solely for personal entertainment and educational purposes.
                All rights to Betrayal at the House on the Hill, including its game mechanics, artwork, trademarks, and intellectual property, are owned by Avalon Hill and Hasbro, Inc.
                This project is not affiliated with, endorsed by, or supported by Avalon Hill, Hasbro, or any of their subsidiaries or partners.
                No copyright or trademark infringement is intended.
                Players are encouraged to support the official release by purchasing the physical game through authorized retailers.
            </div>
            <h1>Lobby</h1>
            <div>
                {matchList.matches.map((match) => (
                    <div key={match.matchID} className="border border-zinc-700 rounded p-4 mb-4">
                        <div>Match ID: {match.matchID}</div>
                        <div>Players: {match.players.length} / 6</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BetrayalLobby