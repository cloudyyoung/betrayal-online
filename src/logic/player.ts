import { CharacterTraitScaleIndex, getCharacterById, type PlayableCharacterId } from './character';
import { PlayerTeam } from "./types";

export class Player {
    id: string;

    characterId: PlayableCharacterId
    team: PlayerTeam

    mightIndex: CharacterTraitScaleIndex;
    speedIndex: CharacterTraitScaleIndex;
    sanityIndex: CharacterTraitScaleIndex;
    knowledgeIndex: CharacterTraitScaleIndex;

    constructor(id: string, characterId: PlayableCharacterId) {
        this.id = id;
        this.characterId = characterId;
        this.team = 'NEUTRAL';

        const character = getCharacterById(characterId);
        this.mightIndex = character.startingMightIndex;
        this.speedIndex = character.startingSpeedIndex;
        this.sanityIndex = character.startingSanityIndex;
        this.knowledgeIndex = character.startingKnowledgeIndex;
    }

    get character() {
        return getCharacterById(this.characterId);
    }

    get might() {
        return this.character.mightScale[this.mightIndex]
    }

    get speed() {
        return this.character.speedScale[this.speedIndex]
    }

    get sanity() {
        return this.character.sanityScale[this.sanityIndex]
    }

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

    get isMightCritical() {
        return this.mightIndex === 1
    }

    get isSpeedCritical() {
        return this.speedIndex === 1
    }

    get isSanityCritical() {
        return this.sanityIndex === 1
    }

    get isKnowledgeCritical() {
        return this.knowledgeIndex === 1
    }

    get isDead() {
        return this.mightIndex === 0 || this.sanityIndex === 0 || this.speedIndex === 0 || this.knowledgeIndex === 0
    }
}

const clampTraitScaleIndex = (index: number) => {
    return Math.min(Math.max(index, 0), 8)
}
