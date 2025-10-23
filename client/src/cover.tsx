import { LogoutOptions, useAuth0, User } from '@auth0/auth0-react';
import { Button } from './components/button';
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { CoverContainer } from './components/cover-container';

const BetrayalCover = () => {
    const navigate = useNavigate();

    const { isAuthenticated, isLoading, loginWithRedirect, user, logout } = useAuth0();

    const handleSocialLogin = (connection: string) => {
        loginWithRedirect({
            authorizationParams: {
                connection,
            },
        });
    };

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
                {isAuthenticated && !isLoading && user && <AuthenticatedButtons user={user} logout={logout} navigate={navigate} />}
                {!isAuthenticated && !isLoading && <UnauthenticatedButtons handleSocialLogin={handleSocialLogin} />}
                {isLoading && <div className='text-yellow-900 text-lg font-tomarik-brush'>Loading...</div>}
            </div>
            <div className='text-zinc-700 italic text-xs tracking-tighter leading-3 sticky bottom-0 left-0 right-0 pb-6 sm:pb-4'>
                Disclaimer: This is an unofficial, fan-made version of Betrayal at the House on the Hill (3rd Edition), created for personal and educational use only.
                All rights belong to Avalon Hill and Hasbro, Inc.
                This project is not affiliated with or endorsed by either company.
                Please support the official release by purchasing the game through authorized retailers.
            </div>
        </CoverContainer>
    )
}

export default BetrayalCover

const AuthenticatedButtons = (
    {
        user, logout, navigate
    }: {
        user: User, logout: (options?: LogoutOptions) => Promise<void>, navigate: NavigateFunction
    }
) => {
    const onCreateNewGame = () => {
        navigate('/matches/new');
    }

    const onJoinExisting = () => {
        navigate('/matches');
    }

    return (
        <div className='flex flex-col gap-6 justify-center items-center w-full'>
            <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 w-full justify-center items-center'>
                <Button onClick={onCreateNewGame} className='bg-yellow-700 text-white font-tomarik-brush sm:text-xl px-8 py-4 hover:bg-yellow-600 w-full max-w-xs sm:w-fit'>Create New Game</Button>
                <Button onClick={onJoinExisting} className='bg-white/80 text-amber-700 font-tomarik-brush sm:text-xl px-8 py-4 hover:bg-white/100 w-full max-w-xs sm:w-fit'>Join Existing</Button>
            </div>
            <div className='flex flex-row gap-1 sm:gap-2 justify-center items-center w-full'>
                <p className='text-sm sm:text-base'>Signed in as <span className='font-bold'>{user.name}</span></p>
                <p className='text-sm sm:text-base' aria-hidden="true">•</p>
                <Button
                    className='text-sm sm:text-base text-orange-900 hover:underline'
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >
                    Sign Out
                </Button>
            </div>
        </div>
    )
}

const UnauthenticatedButtons = ({ handleSocialLogin }: { handleSocialLogin: (connection: string) => void }) => {
    return (
        <div className='flex flex-col gap-4 mt-6'>

            {/* Sign in with Google */}
            <Button
                onClick={() => handleSocialLogin('google-oauth2')}
                className="w-full bg-white border-2 border-gray-300 text-gray-700 font-medium px-6 py-3 hover:bg-gray-50 flex items-center justify-center gap-3"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                </svg>
                Sign in with Google
            </Button>

            {/* Sign in with Apple */}
            <Button
                onClick={() => handleSocialLogin('apple')}
                className="w-full bg-black text-white font-medium px-6 py-3 hover:bg-gray-900 flex items-center justify-center gap-3"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                Sign in with Apple
            </Button>

            {/* Sign in with Microsoft */}
            <Button
                onClick={() => handleSocialLogin('windowslive')}
                className="w-full bg-[#2F2F2F] text-white font-medium px-6 py-3 hover:bg-[#1a1a1a] flex items-center justify-center gap-3"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z" />
                </svg>
                Sign in with Microsoft
            </Button>
        </div>
    )
}