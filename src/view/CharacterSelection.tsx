

import { playableCharacters } from '../logic/character';

const getPortraitUrl = (id: string) => `/portraits/${id.replace(/-/g, '_')}.png`;

export const CharacterSelection = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
            <h1 className="text-3xl font-bold text-white mb-8">Select Your Character</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl px-4">
                {playableCharacters.map((character) => (
                    <div
                        key={character.id}
                        className="bg-gray-800 rounded-xl shadow-lg flex flex-col items-center p-4 hover:ring-4 hover:ring-yellow-400 transition cursor-pointer group"
                        style={{ borderColor: character.color }}
                    >
                        <div className="w-[154px] h-[196px] bg-gray-700 rounded overflow-hidden mb-4 flex items-center justify-center">
                            <img
                                src={getPortraitUrl(character.id)}
                                alt={character.name}
                                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-200"
                                width={154}
                                height={196}
                                loading="lazy"
                            />
                        </div>
                        <div className="text-lg font-semibold text-white mb-1 text-center" style={{ color: character.color }}>{character.name}</div>
                        <div className="text-sm text-gray-300 mb-2 text-center">Age: {character.age}</div>
                        <div className="text-xs text-gray-400 text-center line-clamp-3">{character.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};
