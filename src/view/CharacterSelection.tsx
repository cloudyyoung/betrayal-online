import { BoardProps } from 'boardgame.io/dist/types/packages/react';
import { CharacterCard } from '../components/character-card';
import { playableCharacters } from '../logic/character';

export interface CharacterSelectionProps {
    board: BoardProps
}

export const CharacterSelection = ({ board }: CharacterSelectionProps) => {
    return (
        <div className="min-h-screen flex flex-col items-center py-8 bg-zinc-950">
            <h1 className="text-3xl font-medium text-white mb-8 font-tomarik-brush">Select Character</h1>
            <div>{board.ctx.phase}</div>
            <div className="grid grid-cols-1 max-w-sm sm:grid-cols-2 sm:max-w-lg md:grid-cols-2 md:max-w-xl lg:grid-cols-2 lg:max-w-2xl xl:grid-cols-4 xl:max-w-7xl gap-4 w-full px-4">
                {playableCharacters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </div>
        </div>
    );
};
