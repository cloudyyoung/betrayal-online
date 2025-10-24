export type Game = {
    id: string;
    players: number;
    status: GameStatus;
}

export enum GameStatus {
    WAITING = 'waiting',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed'
}
