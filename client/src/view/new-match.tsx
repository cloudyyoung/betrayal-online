import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { CoverContainer } from '../components/cover-container';
import clsx from 'clsx';
import { Switch } from '../components/switch';


export default function NewMatch() {
    const navigate = useNavigate();
    const [numPlayers, setNumPlayers] = useState<number>(6);
    const [isPrivate, setIsPrivate] = useState<boolean>(true);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleCreateGame = async () => {
        if (numPlayers < 3 || numPlayers > 6) {
            setError('Number of players must be between 3 and 6');
            return;
        }

        setIsCreating(true);
        setError(null);

        try {
            const setupData: any = {
                numPlayers,
            };

            // Note: boardgame.io doesn't have built-in private match functionality
            // You may need to implement this on your server side
            if (isPrivate) {
                setupData.unlisted = true; // This is a custom property you'd handle server-side
            }

            const matchID = 0
            navigate(`/matches/${matchID}`);
        } catch (err: any) {
            console.error('Failed to create match:', err);
            setError(err?.message ?? 'Failed to create match');
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <CoverContainer>
            <div className='bg-red-800/10 p-6 space-y-6 my-12 max-w-lg mx-auto'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-tomarik-brush text-red-900/85'>Create New Match</h1>
                </div>

                {error && (
                    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
                        {error}
                    </div>
                )}

                <div className='space-y-5'>
                    {/* Number of Players */}
                    <div className='space-y-2'>
                        <label htmlFor='numPlayers' className='block text-amber-900 font-medium'>
                            Number of Players
                        </label>
                        <div className='flex items-center gap-4'>
                            <div className='flex gap-2'>
                                {[3, 4, 5, 6].map((num) => (
                                    <Button
                                        key={num}
                                        onClick={() => setNumPlayers(num)}
                                        className={clsx(
                                            "h-12 w-12 rounded-full font-tomarik-brush",
                                            numPlayers === num && "bg-amber-700 text-white",
                                            numPlayers !== num && "bg-white/80 text-amber-800",
                                        )}
                                    >
                                        {num}P
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <p className='text-sm text-amber-800'>
                            Choose between 3-6 players for your game
                        </p>
                    </div>

                    {/* Private Match */}
                    <div className='space-y-2'>
                        <div className='flex items-center gap-3'>
                            <Switch
                                id='isPrivate'
                                checked={isPrivate}
                                // disabled={true}
                                onChange={(checked) => setIsPrivate(checked)}
                            />
                            <div>
                                <label htmlFor='isPrivate' className='text-amber-900 font-medium'>
                                    Private Match
                                </label>
                                <p className='text-sm text-amber-800'>
                                    Private matches won't appear in the public match list
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-3 pt-4'>
                    <Button
                        onClick={handleCreateGame}
                        disabled={isCreating}
                        className='flex-1 bg-yellow-700 text-white font-tomarik-brush text-lg px-6 py-3 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isCreating ? 'Creating...' : 'Create Game'}
                    </Button>
                </div>
            </div>
        </CoverContainer>
    );
}
