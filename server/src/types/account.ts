import mongoose, { Schema, Document, Model } from 'mongoose';

export type Account = {
    name: string;
    email: string;
} & Document;

const accountSchema = new Schema<Account>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

export const AccountModel: Model<Account> = mongoose.model<Account>('Account', accountSchema);
