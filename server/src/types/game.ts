import mongoose, { Schema, Document, Model } from 'mongoose';

export type Game = {
    id: string;
    name: string;
    isPasswordProtected?: boolean;
    status: GameStatus;
    players: Record<string, PlayerState>;
    playersOrder: Array<string>;
    state: GameState;
    createdAt: Date;
    password?: string;
} & Document;

export type PublicGame = Omit<Game, 'password'>;

const gameSchema = new Schema<Game>({
    name: { type: String, required: true },
    password: { type: String },
    status: { type: String, required: true },
    players: { type: Schema.Types.Mixed, required: true },
    playersOrder: { type: [String], required: true },
    state: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, required: true },
});

export const GameModel: Model<Game> = mongoose.model<Game>('Game', gameSchema);


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
