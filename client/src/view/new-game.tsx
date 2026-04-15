import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { CoverContainer } from '../components/cover-container';
import { Switch } from '../components/switch';
import { Input } from '../components/input';
import { useAuth } from '../components/auth-provider';
import { trpc } from '../trpc';

export default function NewGame() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [name, setName] = useState<string>(`${user?.name}'s Game`);
    const [isPasswordProtected, setIsPasswordProtected] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');

    const createGame = trpc.game.create.useMutation({
        onSuccess: (game) => {
            navigate(`/games/${game.id}`);
        },
    });

    const handleCreateGame = () => {
        createGame.mutate({
            name,
            password: isPasswordProtected ? password : undefined,
        });
    };

    return (
        <CoverContainer>
            <div className='bg-red-800/10 p-6 space-y-6 my-12 max-w-lg mx-auto'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-3xl font-tomarik-brush text-red-900/85'>Create New Game</h1>
                </div>

                <div className='space-y-5'>
                    {/* Game Name */}
                    <div className='space-y-2'>
                        <label htmlFor='gameName' className='block text-amber-900 font-medium'>Game Name</label>
                        <Input
                            id='gameName'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Enter a name for your game'
                        />
                    </div>

                    {/* Game Password */}
                    <div className='space-y-2'>
                        <div className='flex items-center justify-between'>
                            <label className='block text-amber-900 font-medium'>Password Protected Game</label>
                            <Switch
                                checked={isPasswordProtected}
                                onChange={(v: boolean) => setIsPasswordProtected(v)}
                            />
                        </div>

                        {isPasswordProtected && (
                            <div className='space-y-2'>
                                <Input
                                    id='gamePassword'
                                    type='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='Password to join this game'
                                />
                                <p className='text-sm text-amber-800'>
                                    Set a password so only players with the password can join.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-3 pt-4'>
                    <Button
                        onClick={handleCreateGame}
                        className='flex-1 bg-yellow-700 text-white font-tomarik-brush text-lg px-6 py-3 hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed'
                        disabled={(isPasswordProtected && password.trim() === '') || createGame.isPending}
                    >
                        {createGame.isPending ? 'Creating...' : 'Create Game'}
                    </Button>
                </div>
            </div>
        </CoverContainer>
    );
}
