import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/button';
import { CoverContainer } from './components/cover-container';
import { Input } from './components/input';
import { useAuth } from './components/auth-provider';

const BetrayalCover = () => {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <CoverContainer>
            <div className='flex flex-col justify-center items-center h-screen gap-4 -mt-8'>
                <img
                    className='w-xs -ml-1.5 sm:w-10/12 sm:ml-0'
                    src="/betrayal-logo-cropped.png"
                    alt="logo"
                />
                <div className='font-tomarik-brush text-yellow-900 text-center text-md sm:text-2xl'>
                    Unofficial, scripted online web version
                </div>
                {user
                    ? <AuthenticatedButtons name={user.name} onLogout={logout} navigate={navigate} />
                    : <LoginForm onLogin={login} />
                }
            </div>
            <div className='text-zinc-700 italic text-xs tracking-tighter leading-3 sticky bottom-0 left-0 right-0 pb-6 sm:pb-4'>
                Disclaimer: This is an unofficial, fan-made version of Betrayal at the House on the Hill (3rd Edition), created for personal and educational use only.
                All rights belong to Avalon Hill and Hasbro, Inc.
                This project is not affiliated with or endorsed by either company.
                Please support the official release by purchasing the game through authorized retailers.
            </div>
        </CoverContainer>
    );
};

export default BetrayalCover;

const LoginForm = ({ onLogin }: { onLogin: (name: string) => void }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) onLogin(name.trim());
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 w-full max-w-xs items-center mt-4'>
            <Input
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Enter your name to play'
                className='w-full'
                autoFocus
            />
            <Button
                type='submit'
                disabled={!name.trim()}
                className='w-full bg-yellow-700/90 text-white font-tomarik-brush text-lg px-8 py-3 hover:bg-yellow-700 disabled:opacity-50'
            >
                Play
            </Button>
        </form>
    );
};

const AuthenticatedButtons = ({
    name,
    onLogout,
    navigate,
}: {
    name: string;
    onLogout: () => void;
    navigate: ReturnType<typeof useNavigate>;
}) => (
    <div className='flex flex-col gap-6 justify-center items-center w-full'>
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 w-full justify-center items-center'>
            <Button
                onClick={() => navigate('/games/new')}
                className='bg-yellow-700/90 text-white font-tomarik-brush sm:text-xl px-8 py-4 hover:bg-yellow-700 w-full max-w-xs sm:w-fit'
            >
                Create New Game
            </Button>
            <Button
                onClick={() => navigate('/games')}
                className='bg-white/80 text-amber-700 font-tomarik-brush sm:text-xl px-8 py-4 hover:bg-white w-full max-w-xs sm:w-fit'
            >
                Join Existing
            </Button>
        </div>
        <div className='flex flex-row gap-1 sm:gap-2 justify-center items-center w-full'>
            <p className='text-sm sm:text-base'>Playing as <span className='font-bold'>{name}</span></p>
            <p className='text-sm sm:text-base' aria-hidden="true">•</p>
            <Button className='text-sm sm:text-base text-orange-900 hover:underline' onClick={onLogout}>
                Sign Out
            </Button>
        </div>
    </div>
);
