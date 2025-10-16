import { PlayableCharacter, CharacterTraitScaleIndex } from './character';
import { PlayerTeam } from "./types";

export class Player {
    id: string;
    character: PlayableCharacter
    team: PlayerTeam

    mightIndex: CharacterTraitScaleIndex;
    speedIndex: CharacterTraitScaleIndex;
    sanityIndex: CharacterTraitScaleIndex;
    knowledgeIndex: CharacterTraitScaleIndex;

    constructor(id: string, character: PlayableCharacter) {
        this.id = id;
        this.character = character;
        this.team = 'NEUTRAL';

        this.mightIndex = character.startingMightIndex;
        this.speedIndex = character.startingSpeedIndex;
        this.sanityIndex = character.startingSanityIndex;
        this.knowledgeIndex = character.startingKnowledgeIndex;
    }

    get might() {
        return this.character.mightScale[this.mightIndex] as number
    }

    get speed() {
        return this.character.speedScale[this.speedIndex] as number
    }

    get sanity() {
        return this.character.sanityScale[this.sanityIndex] as number
    }

    get knowledge() {
        return this.character.knowledgeScale[this.knowledgeIndex] as number
    }

    private clampTraitScaleIndex(index: number, scaleLength: number) {
        if (index < 0) {
            return 0
        } else if (index >= scaleLength) {
            return scaleLength - 1
        }
        return index
    }

    set might(index: number) {
        this.mightIndex = this.clampTraitScaleIndex(index, this.character.mightScale.length)
    }

    set speed(index: number) {
        this.speedIndex = this.clampTraitScaleIndex(index, this.character.speedScale.length)
    }

    set sanity(index: number) {
        this.sanityIndex = this.clampTraitScaleIndex(index, this.character.sanityScale.length)
    }

    set knowledge(index: number) {
        this.knowledgeIndex = this.clampTraitScaleIndex(index, this.character.knowledgeScale.length)
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