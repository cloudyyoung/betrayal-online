import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { Resend } from 'resend';
import { router, publicProcedure } from '../trpc';
import { AccountModel, OtpModel } from '../models';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

const generateCode = (): string =>
    Math.floor(100000 + Math.random() * 900000).toString();

export const authRouter = router({
    requestCode: publicProcedure
        .input(z.object({ email: z.email() }))
        .mutation(async ({ input }) => {
            const { email } = input;
            const code = generateCode();

            await OtpModel.create({ email, code });

            await resend.emails.send({
                from: 'Betrayal Online <betrayal@cloudyyoung.com>',
                to: email,
                template: {
                    id: 'betrayal-online-login-passcode',
                    variables: {
                        code,
                    },
                }
            })

            return { ok: true };
        }),

    verifyCode: publicProcedure
        .input(z.object({ email: z.email(), code: z.string().length(6), name: z.string().min(1) }))
        .mutation(async ({ input }) => {
            const { email, code, name } = input;

            const otp = await OtpModel.findOne({ email, code });
            if (!otp) {
                throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid or expired code.' });
            }

            await OtpModel.deleteMany({ email });

            let account = await AccountModel.findOne({ email });
            if (!account) {
                account = await AccountModel.create({
                    name,
                    email,
                });
            } else {
                account.name = name;
                await account.save();
            }

            return { id: account.id, name: account.name, email: account.email };
        }),
});
