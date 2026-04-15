import { CharacterTraitScaleIndex, getCharacterById, type PlayableCharacterId } from './character';

export interface Player {
    id: string

    characterId: PlayableCharacterId
    team: PlayerTeam

    mightIndex: CharacterTraitScaleIndex
    speedIndex: CharacterTraitScaleIndex
    sanityIndex: CharacterTraitScaleIndex
    knowledgeIndex: CharacterTraitScaleIndex
}

const boundTraitScaleIndex = (index: number) => Math.min(Math.max(index, 0), 8)

export interface PlayerConstructorParams { id: string; characterId: PlayableCharacterId }
export const createPlayer = (params?: PlayerConstructorParams): Player => {
    if (!params) {
        return {
            id: '',
            characterId: 'josef-hooper',
            team: 'NEUTRAL',
            mightIndex: 0,
            speedIndex: 0,
            sanityIndex: 0,
            knowledgeIndex: 0,
        }
    }

    const character = getCharacterById(params.characterId)

    return {
        id: params.id,
        characterId: params.characterId,
        team: 'NEUTRAL',
        mightIndex: character.startingMightIndex,
        speedIndex: character.startingSpeedIndex,
        sanityIndex: character.startingSanityIndex,
        knowledgeIndex: character.startingKnowledgeIndex,
    }
}

export const getPlayerCharacter = (player: Player) => getCharacterById(player.characterId)

export const getPlayerMight = (player: Player) => getPlayerCharacter(player).mightScale[player.mightIndex]
export const getPlayerSpeed = (player: Player) => getPlayerCharacter(player).speedScale[player.speedIndex]
export const getPlayerSanity = (player: Player) => getPlayerCharacter(player).sanityScale[player.sanityIndex]
export const getPlayerKnowledge = (player: Player) => getPlayerCharacter(player).knowledgeScale[player.knowledgeIndex]

export const updatePlayerTraits = (
    player: Player,
    { mightDelta, speedDelta, sanityDelta, knowledgeDelta }: Partial<{
        mightDelta: number | undefined
        speedDelta: number | undefined
        sanityDelta: number | undefined
        knowledgeDelta: number | undefined
    }>
) => {
    if (mightDelta !== undefined) player.mightIndex += boundTraitScaleIndex(mightDelta)
    if (speedDelta !== undefined) player.speedIndex += boundTraitScaleIndex(speedDelta)
    if (sanityDelta !== undefined) player.sanityIndex += boundTraitScaleIndex(sanityDelta)
    if (knowledgeDelta !== undefined) player.knowledgeIndex += boundTraitScaleIndex(knowledgeDelta)
    return player
}

export const isMightCritical = (player: Player) => player.mightIndex === 1
export const isSpeedCritical = (player: Player) => player.speedIndex === 1
export const isSanityCritical = (player: Player) => player.sanityIndex === 1
export const isKnowledgeCritical = (player: Player) => player.knowledgeIndex === 1

export const isDead = (player: Player) =>
    player.mightIndex === 0 || player.sanityIndex === 0 || player.speedIndex === 0 || player.knowledgeIndex === 0

export type PlayerTeam = 'NEUTRAL' | 'SURVIVOR' | 'TRAITOR'
