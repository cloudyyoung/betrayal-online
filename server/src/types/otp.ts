import mongoose, { Schema, Document, Model } from 'mongoose';

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
