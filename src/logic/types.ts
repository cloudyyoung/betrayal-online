import type { Game } from "boardgame.io";
import { Player } from "./player";
import { Haunt } from "./haunt";

export type HauntTraitorCondition = 'HAUNT_REVEALER'
    | 'NO_TRAITOR'
    | 'HIDDEN_TRAITOR'
    | 'LEFT_OF_THE_HAUNT_REVEALER'
    | 'OLDEST_CHARACTER'
    | 'HIGHEST_MIGHT'
    | 'HIGHEST_SPEED'
    | 'HIGHEST_KNOWLEDGE'
    | 'HIGHEST_KNOWLEDGE_OTHER_THAN_THE_HAUNT_REVEALER'
    | 'LOWEST_SANITY'
    | 'LOWEST_SANITY_OTHER_THAN_THE_HAUNT_REVEALER'
    | 'SEE_EVENT'
    | 'MOST_OMENS'

export type RoomTileDirection = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';
export type RoomTileRotation = 0 | 90 | 180 | 270;
export type RoomTileInducedCardType = 'OMEN' | 'EVENT' | 'ITEM';

export type PlayerTeam = 'NEUTRAL' | 'SURVIVOR' | 'TRAITOR';


export interface BetrayalGameStatePlayer extends Pick<Player, 'id' | 'characterId' | 'team' | 'mightIndex' | 'speedIndex' | 'knowledgeIndex' | 'sanityIndex'> { }

export interface BetrayalGameState {
    scenarioCardId?: string
    players: Record<string, BetrayalGameStatePlayer>
    haunt?: Haunt
}

export interface BetrayalGameSetupData {
    numPlayers: number;
}
export const BetrayalGame: Game<BetrayalGameState, {}, BetrayalGameSetupData> = {};
