import { LogoutOptions, useAuth0, User } from '@auth0/auth0-react';
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Button } from './components/button';
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
        navigate('/games/new');
    }

    const onJoinExisting = () => {
        navigate('/games');
    }

    return (
        <div className='flex flex-col gap-6 justify-center items-center w-full'>
            <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 w-full justify-center items-center'>
                <Button onClick={onCreateNewGame} className='bg-yellow-700/90 text-white font-tomarik-brush sm:text-xl px-8 py-4 hover:bg-yellow-700 w-full max-w-xs sm:w-fit'>Create New Game</Button>
                <Button onClick={onJoinExisting} className='bg-white/80 text-amber-700 font-tomarik-brush sm:text-xl px-8 py-4 hover:bg-white w-full max-w-xs sm:w-fit'>Join Existing</Button>
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
        <div className='flex flex-col gap-2 mt-6'>
            <div>Continue with social account to start playing</div>
            <div className='flex flex-row gap-4'>
                {/* Continue with Google */}
                <Button
                    onClick={() => handleSocialLogin('google-oauth2')}
                    className="w-full bg-white border-2 border-gray-300 text-gray-700 font-medium px-6 py-3 hover:bg-gray-50 flex items-center justify-center gap-3 rounded-full"
                >
                    <img src="/social-icons/google_original.svg" alt="Continue with Google" className="w-5 h-5" />
                </Button>

                {/* Continue with Apple */}
                <Button
                    onClick={() => handleSocialLogin('apple')}
                    className="w-full bg-black font-medium px-6 py-3 hover:bg-gray-900 flex items-center justify-center gap-3 rounded-full"
                >
                    <img src="/social-icons/apple_white.svg" alt="Continue with Apple" className="w-5 h-5" />
                </Button>

                {/* Continue with Microsoft */}
                <Button
                    onClick={() => handleSocialLogin('windowslive')}
                    className="w-full bg-[#2F2F2F] font-medium px-6 py-3 hover:bg-[#1a1a1a] flex items-center justify-center gap-3 rounded-full"
                >
                    <img src="/social-icons/microsoft_original.svg" alt="Continue with Microsoft" className="w-5 h-5" />
                </Button>
            </div>
        </div>
    )
}