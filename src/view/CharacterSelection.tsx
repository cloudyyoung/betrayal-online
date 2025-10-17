

import { CharacterCard } from '../components/character-card';
import { playableCharacters } from '../logic/character';


export const CharacterSelection = () => {
    return (
        <div className="min-h-screen flex flex-col items-center py-8">
            <h1 className="text-3xl font-medium text-white mb-8 font-tomarik-brush">Select Your Character</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl px-4">
                {playableCharacters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </div>
        </div>
    );
};
