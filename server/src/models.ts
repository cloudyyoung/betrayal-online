import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAccount extends Document {
    given_name: string;
    family_name: string;
    name: string;
    nickname: string;
    picture: string;
    updated_at: Date;
    email: string;
    email_verified: boolean;
    sub: string;
}

const accountSchema = new Schema<IAccount>({
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

export const AccountModel: Model<IAccount> = mongoose.model<IAccount>('Account', accountSchema);
