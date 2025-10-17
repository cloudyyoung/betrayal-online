import { Exclude, Expose } from 'class-transformer';
import { type PlayableCharacter, CharacterTraitScaleIndex, getCharacterById, type PlayableCharacterId } from './character';
import { PlayerTeam } from "./types";

export class Player {
    id: string;

    @Exclude()
    character: PlayableCharacter
    team: PlayerTeam

    mightIndex: CharacterTraitScaleIndex;
    speedIndex: CharacterTraitScaleIndex;
    sanityIndex: CharacterTraitScaleIndex;
    knowledgeIndex: CharacterTraitScaleIndex;

    constructor(id: string, characterId: PlayableCharacterId) {
        const character = getCharacterById(characterId);

        if (!character) {
            throw new Error(`Character with id ${characterId} not found`);
        }

        this.id = id;
        this.character = character;
        this.team = 'NEUTRAL';

        this.mightIndex = character.startingMightIndex;
        this.speedIndex = character.startingSpeedIndex;
        this.sanityIndex = character.startingSanityIndex;
        this.knowledgeIndex = character.startingKnowledgeIndex;
    }

    @Expose()
    get characterId() {
        return this.character.id
    }

    @Expose()
    get might() {
        return this.character.mightScale[this.mightIndex]
    }

    @Expose()
    get speed() {
        return this.character.speedScale[this.speedIndex]
    }

    @Expose()
    get sanity() {
        return this.character.sanityScale[this.sanityIndex]
    }

    @Expose()
    get knowledge() {
        return this.character.knowledgeScale[this.knowledgeIndex]
    }

    public updateTraits({ mightDelta, speedDelta, sanityDelta, knowledgeDelta }: Partial<{ mightDelta: number | undefined, speedDelta: number | undefined, sanityDelta: number | undefined, knowledgeDelta: number | undefined }>) {
        if (mightDelta !== undefined) {
            this.mightIndex += clampTraitScaleIndex(mightDelta)
        }
        if (speedDelta !== undefined) {
            this.speedIndex += clampTraitScaleIndex(speedDelta)
        }
        if (sanityDelta !== undefined) {
            this.sanityIndex += clampTraitScaleIndex(sanityDelta)
        }
        if (knowledgeDelta !== undefined) {
            this.knowledgeIndex += clampTraitScaleIndex(knowledgeDelta)
        }
    }

    @Expose()
    get isMightCritical() {
        return this.mightIndex === 1
    }

    @Expose()
    get isSpeedCritical() {
        return this.speedIndex === 1
    }

    @Expose()
    get isSanityCritical() {
        return this.sanityIndex === 1
    }

    @Expose()
    get isKnowledgeCritical() {
        return this.knowledgeIndex === 1
    }

    @Expose()
    get isDead() {
        return this.mightIndex === 0 || this.sanityIndex === 0 || this.speedIndex === 0 || this.knowledgeIndex === 0
    }
}

const clampTraitScaleIndex = (index: number) => {
    return Math.min(Math.max(index, 0), 8)
}
