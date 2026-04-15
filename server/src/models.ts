import mongoose, { Schema, Document, Model } from 'mongoose';
import { Account } from './types/account';
import { Game } from './types/game';

export type MAccount = Account & Document;

const accountSchema = new Schema<MAccount>({
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
});

export const AccountModel: Model<MAccount> = mongoose.model<MAccount>('Account', accountSchema);

export type MGame = Omit<Game, 'id' | 'isPasswordProtected'> & Document & {
    password?: string;
};

const gameSchema = new Schema<MGame>({
    name: { type: String, required: true },
    password: { type: String },
    status: { type: String, required: true },
    players: { type: Schema.Types.Mixed, required: true },
    playersOrder: { type: [String], required: true },
    state: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Schema.Types.Date, required: true },
});

export const GameModel: Model<MGame> = mongoose.model<MGame>('Game', gameSchema);
