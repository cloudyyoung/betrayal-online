import clsx from 'clsx';
import { PlayableCharacter } from '../logic/character';

const getPortraitUrl = (id: string) => `/character-boards/${id}.png`;

export interface CharacterCardProps {
    character: PlayableCharacter
    selected?: boolean;
    onClick?: () => void;
}

export function CharacterCard({
    character,
    selected = false,
    onClick,
}: CharacterCardProps) {
    const { name } = character;
    const image = getPortraitUrl(character.id);
    return (
        <button
            type="button"
            tabIndex={0}
            className={clsx(
                'relative isolate flex flex-col items-center rounded-xl border text-base font-semibold shadow-md p-1 transition focus:outline-none',
                'hover:ring-4 hover:ring-pink-400',
                selected && 'ring-4 bg-pink-400',
            )}
            onClick={onClick}
        >
            <div className="rounded overflow-hidden mb-4 flex items-center justify-center">
                <img
                    src={image}
                    alt={name}
                    className="object-contain w-full h-full"
                    width={1004}
                    height={1004}
                    draggable={false}
                />
            </div>
        </button>
    );
}
