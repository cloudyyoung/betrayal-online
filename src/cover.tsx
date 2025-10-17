import { LobbyClient } from 'boardgame.io/client';
import { Button } from './components/button';

const lobbyClient = new LobbyClient({
    server: `http://${window.location.hostname}:8000`,
});

const BetrayalCover = () => {

    const createMatch = async () => {
        await lobbyClient.createMatch('betrayal-at-the-house-on-the-hill', {
            numPlayers: 6,
        });
        const matchList = await lobbyClient.listMatches('betrayal-at-the-house-on-the-hill');
    }

    const joinMatch = async (matchID: string) => {
        await lobbyClient.joinMatch('betrayal-at-the-house-on-the-hill', matchID, {
            playerID: '00',
            playerName: 'Player 1',
        });
    }

    return (
        <div className='h-screen bg-[url("/bg-light-big.webp")] bg-repeat bg-cover bg-center overflow-hidden'>
            <div className='relative h-screen max-w-2xl mx-auto p-4 gap-8'>
                <div className='flex flex-col items-center justify-center h-screen p-4 gap-4'>
                    <img
                        className='w-full'
                        src="/betrayal_logo.png"
                        alt="logo"
                    />
                    <div className='space-x-4'>
                        <Button className='bg-yellow-700 text-white font-tomarik-brush text-xl px-6 py-4 hover:bg-yellow-600'>Create New Game</Button>
                        <Button className='bg-white/80 text-amber-700 font-tomarik-brush text-xl px-6 py-4 hover:bg-white/100'>Join Existing</Button>
                    </div>
                </div>
                <div className='text-zinc-700 italic text-xs tracking-tighter leading-3 sticky bottom-0 left-0 right-0'>
                    Disclaimer: This is an unofficial, fan-made version of Betrayal at the House on the Hill (3rd Edition), created for personal and educational use only.
                    All rights belong to Avalon Hill and Hasbro, Inc.
                    This project is not affiliated with or endorsed by either company.
                    Please support the official release by purchasing the game through authorized retailers.
                </div>
            </div>
        </div>
    )
}

export default BetrayalCover