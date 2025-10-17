import clsx from 'clsx';
import { PlayableCharacter } from '../logic/character';

const getPortraitUrl = (id: string) => `/portraits/${id.replace(/-/g, '_')}.png`;

export interface CharacterCardProps {
    character: PlayableCharacter
    selected?: boolean;
    className?: string;
    onClick?: () => void;
}

export function CharacterCard({
    character,
    selected = false,
    className,
    onClick,
}: CharacterCardProps) {
    const { name, color, age, description } = character;
    const image = getPortraitUrl(character.id);
    return (
        <button
            type="button"
            tabIndex={0}
            className={clsx(
                'relative isolate flex flex-col items-center rounded-xl border text-base font-semibold bg-white shadow-md p-4 transition focus:outline-none',
                'hover:ring-4 hover:ring-yellow-400',
                selected && 'ring-4 ring-blue-500',
                className
            )}
            style={color ? { borderColor: color } : {}}
            onClick={onClick}
        >
            <div className="w-[154px] h-[196px] rounded overflow-hidden mb-4 flex items-center justify-center">
                <img
                    src={image}
                    alt={name}
                    className="object-contain w-full h-full"
                    width={154}
                    height={196}
                    loading="lazy"
                    draggable={false}
                />
            </div>
            <div className="text-lg font-semibold mb-1 text-center">{name}</div>
            <div className="text-sm text-gray-500 mb-2 text-center">Age: {age}</div>
            <div className="text-xs text-gray-400 text-center line-clamp-3">{description}</div>
            <div>Might: {character.mightScale.map((might, index) => (
                <span key={index} className={clsx('mr-1', index <= 1 && 'text-red-600', index === character.startingMightIndex && 'text-green-600')}>{might}</span>
            ))}
            </div>
            <div>Speed: {character.speedScale.map((speed, index) => (
                <span key={index} className={clsx('mr-1', index <= 1 && 'text-red-600', index === character.startingSpeedIndex && 'text-green-600')}>{speed}</span>
            ))}
            </div>
            <div>Sanity: {character.sanityScale.map((sanity, index) => (
                <span key={index} className={clsx('mr-1', index <= 1 && 'text-red-600', index === character.startingSanityIndex && 'text-green-600')}>{sanity}</span>
            ))}
            </div>
            <div>Knowledge: {character.knowledgeScale.map((knowledge, index) => (
                <span key={index} className={clsx('mr-1', index <= 1 && 'text-red-600', index === character.startingKnowledgeIndex && 'text-green-600')}>{knowledge}</span>
            ))}
            </div>
        </button>
    );
}
