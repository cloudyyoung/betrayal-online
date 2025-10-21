
export interface CoverContainerProps {
    children: React.ReactNode;
}

export const CoverContainer = ({ children }: CoverContainerProps) => {
    return (
        <div className='h-screen overflow-hidden bg-zinc-950'>
            <div className='fixed top-0 left-0 right-0 bottom-0 bg-[url("/bg-light.jpg")] bg-repeat bg-cover bg-center'></div>
            <div className='fixed top-0 left-0 right-0 bottom-0 bg-[url("/bg-light-big.jpg")] bg-repeat bg-cover bg-center'></div>
            <div className='relative h-screen max-w-2xl mx-auto gap-8 px-6'>
                {children}
            </div>
        </div>
    )
}
