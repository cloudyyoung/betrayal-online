import { Button } from './components/button';
import { Link } from 'react-router-dom'

const BetrayalCover = () => {
    return (
        <div className='h-screen bg-[url("/bg-light-big.webp")] bg-repeat bg-cover bg-center overflow-hidden'>
            <div className='relative h-screen max-w-2xl mx-auto gap-8 px-6'>
                <div className='flex flex-col justify-center items-start sm:items-center h-screen gap-4 -mt-8'>
                    <img
                        className='w-xs -ml-1.5 sm:w-10/12 sm:ml-0'
                        src="/betrayal-logo-cropped.png"
                        alt="logo"
                    />
                    <div className='font-tomarik-brush text-yellow-900 text-lg sm:text-2xl'>
                        Unofficial, scripted online web version
                    </div>
                    <div className='flex flex-row gap-4 mt-6'>
                        <Link to="/new">
                            <Button className='bg-yellow-700 text-white font-tomarik-brush sm:text-xl px-6 py-4 hover:bg-yellow-600'>Create New Game</Button>
                        </Link>
                        <Link to="/matches">
                            <Button className='bg-white/80 text-amber-700 font-tomarik-brush sm:text-xl px-6 py-4 hover:bg-white/100'>Join Existing</Button>
                        </Link>
                    </div>
                </div>
                <div className='text-zinc-700 italic text-xs tracking-tighter leading-3 sticky bottom-0 left-0 right-0 pb-6'>
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