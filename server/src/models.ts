import mongoose, { Schema, Document, Model } from 'mongoose';
import { Game } from './types/game';

export type Account = {
    name: string;
    email: string;
} & Document;

const accountSchema = new Schema<Account>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

export const AccountModel: Model<Account> = mongoose.model<Account>('Account', accountSchema);

export interface Otp extends Document {
    email: string;
    code: string;
    createdAt: Date;
}

const otpSchema = new Schema<Otp>({
    email: { type: String, required: true, index: true },
    code: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 600 }, // TTL: 10 minutes
});

export const OtpModel: Model<Otp> = mongoose.model<Otp>('Otp', otpSchema);

export type MGame = Omit<Game, 'id' | 'isPasswordProtected' | 'createdAt'> & Document & {
    password?: string;
    createdAt: Date;
};

const gameSchema = new Schema<MGame>({
    name: { type: String, required: true },
    password: { type: String },
    status: { type: String, required: true },
    players: { type: Schema.Types.Mixed, required: true },
    playersOrder: { type: [String], required: true },
    state: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, required: true },
});

export const GameModel: Model<MGame> = mongoose.model<MGame>('Game', gameSchema);
