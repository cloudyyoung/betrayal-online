export type Game = {
    id: string;
    name: string;
    isPasswordProtected?: boolean;
    status: GameStatus;
    players: Record<string, PlayerState>;
    playersOrder: Array<string>;
    state: GameState;
    createdAt: string;
}

export enum GameStatus {
    WAITING = 'waiting',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed'
}

export type GameState = {

}

export type PlayerState = {
    isReady: boolean;
}
