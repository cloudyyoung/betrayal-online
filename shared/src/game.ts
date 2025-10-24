export type Game = {
    id: string;
    password?: string;
    status: GameStatus;
    players?: Record<string, PlayerState>;
    state?: GameState;
}

export enum GameStatus {
    WAITING = 'waiting',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed'
}

export type GameState = {

}

export type PlayerState = {
    sub: string;
}