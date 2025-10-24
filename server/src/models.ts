import mongoose, { Schema, Document, Model } from 'mongoose';
import { Account, Game } from "@betrayal/shared"

const accountSchema = new Schema<Account>({
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

export const AccountModel: Model<Account> = mongoose.model<Account>('Account', accountSchema);

const gameSchema = new Schema<Game>({
    password: { type: String },
    status: { type: String, required: true },
    players: { type: Schema.Types.Mixed },
    state: { type: Schema.Types.Mixed },
});

export const GameModel: Model<Game> = mongoose.model<Game>('Game', gameSchema);
