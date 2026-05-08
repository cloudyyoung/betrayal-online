import { useState, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { CoverContainer } from '../components/cover-container';
import { Input } from '../components/input';
import { useAuth } from '../components/auth-provider';
import { trpc } from '../trpc';
import { useWsConnected } from '../components/trpc-provider';
import clsx from 'clsx';

const BetrayalCover = () => {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();

    const wsConnected = useWsConnected();

    return (
        <CoverContainer>
            <div className='flex flex-col justify-center items-center h-screen gap-6 -mt-8'>
                <img
                    className='w-xs -ml-1.5 sm:w-10/12 sm:ml-0'
                    src="/betrayal-logo-cropped.png"
                    alt="logo"
                />
                <div className='italic text-yellow-900 text-center text-md sm:text-2xl'>
                    Unofficial scripted online web version
                </div>
                {user
                    ? <AuthenticatedButtons name={user.name} email={user.email} wsConnected={wsConnected} onLogout={logout} navigate={navigate} />
                    : <LoginForm onLogin={login} />
                }
            </div>
            <div className='text-zinc-700 italic text-sm tracking-tight leading-4 sticky bottom-0 left-0 right-0 pb-6 sm:pb-4'>
                Disclaimer: This is an unofficial, fan-made version of Betrayal at the House on the Hill (3rd Edition), created for personal and educational use only.
                All rights belong to Avalon Hill and Hasbro, Inc.
                This project is not affiliated with or endorsed by either company.
                Please support the official release by purchasing the game through authorized retailers.
            </div>
        </CoverContainer>
    );
};

export default BetrayalCover;

const LoginForm = ({ onLogin }: { onLogin: (user: import('../auth').LocalAccount) => void }) => {
    const [step, setStep] = useState<'email' | 'code'>('email');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const requestCode = trpc.auth.requestCode.useMutation({
        onSuccess: () => { setStep('code'); setError(''); },
        onError: (e) => setError(e.message),
    });

    const verifyCode = trpc.auth.verifyCode.useMutation({
        onSuccess: (user) => onLogin(user),
        onError: (e) => setError(e.message),
    });

    const handleRequestCode = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !name.trim()) return;
        requestCode.mutate({ email: email.trim() });
    };

    const handleVerifyCode = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.trim().length !== 6) return;
        verifyCode.mutate({ email: email.trim(), code: code.trim(), name: name.trim() });
    };

    if (step === 'email') {
        return (
            <form onSubmit={handleRequestCode} className='flex flex-col gap-3 w-full max-w-xs items-center mt-4'>
                <Input
                    type='text'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder='Your name'
                    className='w-full'
                    autoFocus
                />
                <Input
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Your email address'
                    className='w-full'
                />
                {error && <p className='text-red-700 text-sm'>{error}</p>}
                <Button
                    type='submit'
                    disabled={!email.trim() || !name.trim() || requestCode.isPending}
                    className='w-full bg-yellow-700/90 text-white font-tomarik-brush text-lg px-8 py-3 hover:bg-yellow-700 disabled:opacity-50'
                >
                    {requestCode.isPending ? 'Sending...' : 'Send Code'}
                </Button>
            </form>
        );
    }

    return (
        <form onSubmit={handleVerifyCode} className='flex flex-col gap-4 w-full max-w-xs items-center mt-4'>
            <p className='text-sm text-center'>
                A 6-digit code was sent to <strong>{email}</strong>
            </p>
            <SixDigitInput onChange={setCode} autoFocus />
            {error && <p className='text-red-700 text-sm'>{error}</p>}
            <Button
                type='submit'
                disabled={code.length !== 6 || verifyCode.isPending}
                className='w-full bg-yellow-700/90 text-white font-tomarik-brush text-lg px-8 py-3 hover:bg-yellow-700 disabled:opacity-50'
            >
                {verifyCode.isPending ? 'Verifying...' : 'Play'}
            </Button>
            <Button
                type='button'
                onClick={() => { setStep('email'); setCode(''); setError(''); }}
                className='text-sm text-amber-800 hover:underline'
            >
                Use a different email
            </Button>
        </form>
    );
};

const SixDigitInput = ({ onChange, autoFocus }: {
    onChange: (v: string) => void;
    autoFocus?: boolean;
}) => {
    const [digits, setDigits] = useState(['', '', '', '', '', '']);
    const refs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));

    const focus = (i: number) => refs.current[i]?.focus();

    const update = (next: string[]) => {
        setDigits(next);
        onChange(next.join(''));
    };

    const handleChange = (i: number, raw: string) => {
        const digit = raw.replace(/\D/g, '').slice(-1);
        const next = [...digits];
        next[i] = digit;
        update(next);
        if (digit && i < 5) focus(i + 1);
    };

    const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const next = [...digits];
            if (next[i]) {
                next[i] = '';
                update(next);
            } else if (i > 0) {
                next[i - 1] = '';
                update(next);
                focus(i - 1);
            }
        } else if (e.key === 'ArrowLeft' && i > 0) {
            focus(i - 1);
        } else if (e.key === 'ArrowRight' && i < 5) {
            focus(i + 1);
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const next = Array.from({ length: 6 }, (_, i) => pasted[i] ?? '');
        update(next);
        focus(Math.min(pasted.length, 5));
    };

    return (
        <div className='flex items-center gap-2'>
            {digits.map((digit, i) => (
                <Fragment key={i}>
                    {i === 3 && (
                        <span className='text-amber-800/40 text-base select-none mx-0.5'>–</span>
                    )}
                    <input
                        ref={el => { refs.current[i] = el; }}
                        type='text'
                        inputMode='numeric'
                        value={digit}
                        autoFocus={autoFocus && i === 0}
                        onChange={e => handleChange(i, e.target.value)}
                        onKeyDown={e => handleKeyDown(i, e)}
                        onPaste={handlePaste}
                        onFocus={e => e.target.select()}
                        className={clsx(
                            'w-10 h-12 text-center text-xl font-bold rounded',
                            'border-2 bg-white/70 text-amber-950',
                            'focus:outline-none transition-all duration-150',
                            digit ? 'border-amber-700/60 bg-amber-50/60' : 'border-amber-800/20',
                            'focus:border-amber-700 focus:bg-amber-50 focus:shadow-[0_0_0_3px_rgba(180,83,9,0.12)]',
                        )}
                    />
                </Fragment>
            ))}
        </div>
    );
};

const AuthenticatedButtons = ({
    name,
    email,
    wsConnected,
    onLogout,
    navigate,
}: {
    name: string;
    email: string;
    wsConnected: boolean;
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
            <span className={clsx('w-2 h-2 rounded-full', wsConnected ? 'bg-green-600' : 'bg-red-600')} />
            <p className='text-sm sm:text-base' title={email}>Playing as <span className='font-bold'>{name}</span></p>
            <p className='text-sm sm:text-base' aria-hidden="true">•</p>
            <Button className='text-sm sm:text-base text-orange-900 hover:underline' onClick={onLogout}>
                Sign Out
            </Button>
        </div>
    </div>
);
