import mongoose, { Schema, Document, Model } from 'mongoose';
import { Account, Game } from "@betrayal/shared"

export type MAccount = Account & Document;

const accountSchema = new Schema<MAccount>({
    given_name: { type: String },
    family_name: { type: String },
    name: { type: String },
    nickname: { type: String },
    picture: { type: String },
    updated_at: { type: Date },
    email: { type: String },
    email_verified: { type: Boolean },
    sub: { type: String, unique: true, required: true },
});

export const AccountModel: Model<MAccount> = mongoose.model<MAccount>('Account', accountSchema);

export type MGame = Omit<Game, 'id' | 'isPasswordProtected'> & Document & {
    password?: string;
};

const gameSchema = new Schema<MGame>({
    password: { type: String },
    status: { type: String, required: true },
    players: { type: Schema.Types.Mixed },
    state: { type: Schema.Types.Mixed },
});

export const GameModel: Model<MGame> = mongoose.model<MGame>('Game', gameSchema);
