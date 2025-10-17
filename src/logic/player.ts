import { PlayableCharacter, CharacterTraitScaleIndex, getCharacterById, PlayableCharacterId } from './character';
import { PlayerTeam } from "./types";

export class Player {
    id: string;
    character: PlayableCharacter
    team: PlayerTeam

    private _mightIndex: CharacterTraitScaleIndex;
    private _speedIndex: CharacterTraitScaleIndex;
    private _sanityIndex: CharacterTraitScaleIndex;
    private _knowledgeIndex: CharacterTraitScaleIndex;

    constructor(id: string, characterId: PlayableCharacterId) {
        const character = getCharacterById(characterId);

        if (!character) {
            throw new Error(`Character with id ${characterId} not found`);
        }

        this.id = id;
        this.character = character;
        this.team = 'NEUTRAL';

        this._mightIndex = character.startingMightIndex;
        this._speedIndex = character.startingSpeedIndex;
        this._sanityIndex = character.startingSanityIndex;
        this._knowledgeIndex = character.startingKnowledgeIndex;
    }

    get might() {
        return this.character.mightScale[this._mightIndex]
    }

    get speed() {
        return this.character.speedScale[this._speedIndex]
    }

    get sanity() {
        return this.character.sanityScale[this._sanityIndex]
    }

    get knowledge() {
        return this.character.knowledgeScale[this._knowledgeIndex]
    }

    get mightIndex() {
        return this._mightIndex
    }

    get speedIndex() {
        return this._speedIndex
    }

    get sanityIndex() {
        return this._sanityIndex
    }

    get knowledgeIndex() {
        return this._knowledgeIndex
    }

    set mightIndex(index: number) {
        this._mightIndex = clampTraitScaleIndex(index)
    }

    set speedIndex(index: number) {
        this._speedIndex = clampTraitScaleIndex(index)
    }

    set sanityIndex(index: number) {
        this._sanityIndex = clampTraitScaleIndex(index)
    }

    set knowledgeIndex(index: number) {
        this._knowledgeIndex = clampTraitScaleIndex(index)
    }

    public updateTraits({ mightDelta, speedDelta, sanityDelta, knowledgeDelta }: Partial<{ mightDelta: number | undefined, speedDelta: number | undefined, sanityDelta: number | undefined, knowledgeDelta: number | undefined }>) {
        if (mightDelta !== undefined) {
            this.mightIndex += mightDelta
        }
        if (speedDelta !== undefined) {
            this.speedIndex += speedDelta
        }
        if (sanityDelta !== undefined) {
            this.sanityIndex += sanityDelta
        }
        if (knowledgeDelta !== undefined) {
            this.knowledgeIndex += knowledgeDelta
        }
    }

    get isMightCritical() {
        return this._mightIndex === 1
    }

    get isSpeedCritical() {
        return this._speedIndex === 1
    }

    get isSanityCritical() {
        return this._sanityIndex === 1
    }

    get isKnowledgeCritical() {
        return this._knowledgeIndex === 1
    }

    get isDead() {
        return this._mightIndex === 0 || this._sanityIndex === 0 || this._speedIndex === 0 || this._knowledgeIndex === 0
    }
}

const clampTraitScaleIndex = (index: number) => {
    return Math.min(Math.max(index, 0), 8)
}
