import { DateTime } from "luxon";

export interface CharacterTraitScale extends Array<number> {
    0: 0;
    length: 9;
}

export type CharacterTraitScaleIndex = number;

export interface Character {
    id: string;
    name: string;
}

export interface PlayableCharacter extends Character {
    id: PlayableCharacterId
    color: string
    age: number
    birthday: DateTime
    description: string
    mightScale: CharacterTraitScale
    startingMightIndex: CharacterTraitScaleIndex
    speedScale: CharacterTraitScale
    startingSpeedIndex: CharacterTraitScaleIndex
    sanityScale: CharacterTraitScale
    startingSanityIndex: CharacterTraitScaleIndex
    knowledgeScale: CharacterTraitScale
    startingKnowledgeIndex: CharacterTraitScaleIndex
}

export interface MonsterCharacter extends Character {
    might: number;
    speed: number;
    sanity: number;
    knowledge: number;
}

export type PlayableCharacterId =
    | 'josef-hooper'
    | 'oliver-swift'
    | 'stephanie-richter'
    | 'persephone-puleri'
    | 'sammy-angler'
    | 'jaden-jones'
    | 'isa-valencia'
    | 'anita-hernandez'
    | 'father-warren-leung'
    | 'dan-nguyen-md'
    | 'michelle-monroe'
    | 'brittani-bowen';

export const getCharacterById = (id: PlayableCharacterId) => {
    return playableCharactersById[id];
}

const getBirthday = (month: number, day: number) => {
    const from = DateTime.now();
    const target = DateTime.fromObject({ year: from.year, month, day });

    if (target < from) {
        return target.plus({ years: 1 });
    }

    return target;
}

export const playableCharacters = [
    {
        id: 'josef-hooper',
        name: 'Josef "Brosef" Hooper',
        color: 'red',
        age: 25,
        birthday: getBirthday(2, 25),
        description: "Josef often gets taken for a meathead college athlete, and he kind of is, but at the same time has a softer side when it comes to sticking up for people he cares about. He's willing to face any danger for his friends, which is about to be put to the test. Josef has seen Michelle on the pitch and is impressed by her skills.",
        mightScale: [0, 4, 4, 4, 5, 6, 7, 8, 8],
        startingMightIndex: 4,
        speedScale: [0, 2, 2, 3, 4, 5, 6, 7, 8],
        startingSpeedIndex: 4,
        sanityScale: [0, 2, 3, 4, 4, 5, 5, 6, 6],
        startingSanityIndex: 3,
        knowledgeScale: [0, 2, 2, 3, 3, 5, 5, 6, 6],
        startingKnowledgeIndex: 3,
    },
    {
        id: 'oliver-swift',
        name: 'Oliver Swift',
        color: 'red',
        age: 33,
        birthday: getBirthday(7, 3),
        description: "Oliver is fast, but he believes that you should never run unless you're running away from something. A loner by nature, he studies philosophy to try to find the nature of humanity and understand why people are so insufferable. Dr. Dan has been treating Oliver's anemia since he was a child.",
        mightScale: [0, 2, 2, 3, 4, 5, 6, 7, 8],
        startingMightIndex: 4,
        speedScale: [0, 3, 3, 4, 5, 6, 7, 8, 8],
        startingSpeedIndex: 4,
        sanityScale: [0, 4, 4, 5, 6, 7, 8, 8, 8],
        startingSanityIndex: 4,
        knowledgeScale: [0, 3, 4, 4, 5, 6, 7, 8, 8],
        startingKnowledgeIndex: 4,
    },
    {
        id: 'stephanie-richter',
        name: 'Stephanie Richter',
        color: 'blue',
        age: 40,
        birthday: getBirthday(1, 12),
        description: "Stephanie has a knack for amateur filmmaking. She enjoys creating short documentaries that she uploads to the internet. A film about that haunted old house would do wonders for her online presence. Stephanie is Sammy’s neighbor. She filmed his first magic show at the elementary school talent night and has been friends with him ever since.",
        mightScale: [0, 2, 3, 3, 4, 5, 5, 6, 6],
        startingMightIndex: 4,
        speedScale: [0, 2, 3, 3, 5, 5, 6, 6, 7],
        startingSpeedIndex: 3,
        sanityScale: [0, 4, 4, 5, 5, 6, 7, 8, 8],
        startingSanityIndex: 4,
        knowledgeScale: [0, 2, 3, 4, 4, 4, 5, 6, 6],
        startingKnowledgeIndex: 3,
    },
    {
        id: 'persephone-puleri',
        name: 'Persephone Puleri',
        color: 'blue',
        age: 49,
        birthday: getBirthday(4, 15),
        description: "Persephone runs a local shop called Blessed Botanicals that specializes in all manner of crystals, herbs, and paranormal supplies. The rumors of a local haunted house have certainly been good for business, and she’s been eager to find an excuse to explore the place. Jaden sometimes comes into the shop asking about strange clues that he’s come across.",
        mightScale: [0, 3, 3, 4, 5, 6, 6, 7, 7],
        startingMightIndex: 3,
        speedScale: [0, 3, 3, 4, 4, 5, 6, 7, 8],
        startingSpeedIndex: 4,
        sanityScale: [0, 3, 3, 4, 5, 6, 7, 8, 8],
        startingSanityIndex: 4,
        knowledgeScale: [0, 2, 3, 3, 4, 5, 6, 6, 7],
        startingKnowledgeIndex: 3,
    },
    {
        id: 'sammy-angler',
        name: 'Sammy Angler',
        color: 'green',
        age: 9,
        birthday: getBirthday(9, 18),
        description: "Sammy is a bright kid who has been obsessed with stage magicians since one came to his sixth birthday party. The next year he asked for a magic kit of his own, and his stage shows have gotten more elaborate ever since. Now he’s looking for even more elaborate stage dressing, and what could be more mystical than an old abandoned house? Oliver sometimes comes over on weekends to tutor Sammy in his least favorite subject, math.",
        mightScale: [0, 3, 3, 4, 4, 5, 5, 6, 6],
        startingMightIndex: 3,
        speedScale: [0, 2, 3, 4, 4, 5, 6, 7, 8],
        startingSpeedIndex: 5,
        sanityScale: [0, 2, 3, 4, 4, 5, 6, 6, 7],
        startingSanityIndex: 4,
        knowledgeScale: [0, 2, 3, 3, 4, 5, 6, 7, 8],
        startingKnowledgeIndex: 3,
    },
    {
        id: 'jaden-jones',
        name: 'Jaden Jones',
        color: 'green',
        age: 11,
        birthday: getBirthday(10, 4),
        description: "Jaden Jones works tirelessly to uncover the mysteries of the world, no matter how inconvenient that makes life for those around him. Armed with his “My First Detective” magnifying glass and evidence case, he’s going to explore this old house in search of... clues. And he’s documenting everything, for posterity. Jaden loves hanging around the old church, and often borrows detective comics from Father Leung.",
        mightScale: [0, 2, 3, 3, 3, 4, 5, 6, 7],
        startingMightIndex: 4,
        speedScale: [0, 3, 4, 4, 4, 5, 6, 7, 8],
        startingSpeedIndex: 3,
        sanityScale: [0, 3, 3, 4, 5, 5, 6, 7, 8],
        startingSanityIndex: 3,
        knowledgeScale: [0, 3, 3, 4, 5, 5, 6, 6, 7],
        startingKnowledgeIndex: 4,
    },
    {
        id: 'isa-valencia',
        name: 'Isa Valencia',
        color: 'yellow',
        age: 11,
        birthday: getBirthday(3, 30),
        description: "Isa's always been a bit off. A strange kid with an interest in the paranormal, she has a strong belief in the supernatural. She spends her night watching reruns of Bros vs. Ghosts on late night TV. Anita enjoys talking with Brittani about the darker side of electronic music, often borrowing CDs to have on in the background while she blogs.",
        mightScale: [0, 2, 3, 3, 3, 4, 5, 6, 7],
        startingMightIndex: 4,
        speedScale: [0, 4, 4, 5, 5, 6, 7, 8, 8],
        startingSpeedIndex: 4,
        sanityScale: [0, 2, 3, 4, 5, 6, 7, 7, 8],
        startingSanityIndex: 3,
        knowledgeScale: [0, 2, 3, 4, 4, 5, 6, 6, 6],
        startingKnowledgeIndex: 3,
    },
    {
        id: 'anita-hernandez',
        name: 'Anita Hernandez',
        color: 'yellow',
        age: 12,
        birthday: getBirthday(6, 11),
        description: "Anita Hernandez was raised by parents who were extremely superstitious. She works in her parents’ tea shop in order to learn about all the magical qualities of different herbs. While she doesn’t really believe in all this nonsense, something about that old house on the hill gives her the creeps. Anita’s parents visit Persephone’s shop on weekends to stock up.",
        mightScale: [0, 2, 2, 3, 4, 4, 5, 6, 7],
        startingMightIndex: 4,
        speedScale: [0, 2, 3, 4, 4, 5, 6, 7, 8],
        startingSpeedIndex: 3,
        sanityScale: [0, 2, 2, 3, 4, 5, 5, 6, 6],
        startingSanityIndex: 3,
        knowledgeScale: [0, 4, 4, 5, 5, 6, 7, 8, 8],
        startingKnowledgeIndex: 4,
    },
    {
        id: 'father-warren-leung',
        name: 'Father Warren Leung',
        color: 'white',
        age: 71,
        birthday: getBirthday(11, 17),
        description: "A no-nonsense priest with a backbone made of steel. He has an extensive knowledge of ancient religions, and a history of banishing a demon or two back in his day. He’s been trying to quit smoking for the last two years, so he’s a little cranky. Anita attends a weekly watercolor class at Warren’s church.",
        mightScale: [0, 2, 2, 3, 3, 4, 5, 6, 6],
        startingMightIndex: 4,
        speedScale: [0, 2, 3, 4, 4, 5, 5, 6, 6],
        startingSpeedIndex: 3,
        sanityScale: [0, 3, 3, 3, 4, 5, 6, 7, 8],
        startingSanityIndex: 5,
        knowledgeScale: [0, 3, 3, 4, 5, 5, 6, 7, 8],
        startingKnowledgeIndex: 3,
    },
    {
        id: 'dan-nguyen-md',
        name: 'Dan Nguyen, M.D.',
        color: 'white',
        age: 60,
        birthday: getBirthday(5, 6),
        description: "Dan has been a doctor in this town for decades, always willing to help anyone who comes to his office. Lately he’s been seeing more and more injuries related to that creepy old house. Broken legs from falling through floorboards, bumps and bruises from “phantasms,” strange marks appearing the night after a visit. He’s come to the house to finally get to the bottom of all this nonsense. Dan sees Josef on a near-weekly basis for some injury or another.",
        mightScale: [0, 3, 3, 4, 4, 5, 5, 6, 7],
        startingMightIndex: 3,
        speedScale: [0, 2, 3, 3, 4, 5, 6, 7, 7],
        startingSpeedIndex: 3,
        sanityScale: [0, 2, 3, 4, 4, 5, 6, 7, 8],
        startingSanityIndex: 4,
        knowledgeScale: [0, 3, 3, 4, 5, 5, 6, 7, 8],
        startingKnowledgeIndex: 5,
    },
    {
        id: 'michelle-monroe',
        name: 'Michelle Monroe',
        color: 'purple',
        age: 19,
        birthday: getBirthday(8, 19),
        description: "Michelle is a lacrosse teen who’s faced worse than whatever this house throws at her. She’s used to being the underdog, but she has brought her team to victory before and she can do it again... even if the game is survival instead of lacrosse. Always a fan of a nice spot of tea, she often sees Isa in the tea shop while she is enjoying a steaming cup of Earl Grey.",
        mightScale: [0, 2, 3, 4, 4, 5, 6, 7, 8],
        startingMightIndex: 5,
        speedScale: [0, 3, 3, 4, 5, 6, 6, 7, 8],
        startingSpeedIndex: 3,
        sanityScale: [0, 2, 3, 3, 4, 5, 6, 6, 6],
        startingSanityIndex: 5,
        knowledgeScale: [0, 2, 3, 3, 4, 5, 6, 7, 8],
        startingKnowledgeIndex: 4,
    },
    {
        id: 'brittani-bowen',
        name: 'Brittani “Beat Box” Bowen',
        color: 'purple',
        age: 22,
        birthday: getBirthday(5, 6),
        description: "Brittani is a DJ who has been throwing impromptu house parties since high school. Brittani seeks new and exciting locations to play music, and what could be more interesting than an abandoned old house. Brittani will often bring extra tomatoes from her garden to Stephanie. She makes the best lasagna.",
        mightScale: [0, 3, 3, 4, 5, 6, 7, 7, 8],
        startingMightIndex: 4,
        speedScale: [0, 2, 3, 3, 4, 4, 5, 6, 6],
        startingSpeedIndex: 3,
        sanityScale: [0, 3, 3, 4, 4, 5, 6, 6, 7],
        startingSanityIndex: 4,
        knowledgeScale: [0, 3, 3, 4, 5, 5, 6, 6, 7],
        startingKnowledgeIndex: 4,
    },
] as const satisfies readonly PlayableCharacter[]

export const playableCharactersById: Record<PlayableCharacterId, PlayableCharacter> = playableCharacters.reduce((acc, character) => {
    acc[character.id] = character;
    return acc;
}, {} as Record<PlayableCharacterId, PlayableCharacter>);
