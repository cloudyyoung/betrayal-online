import dotenv from 'dotenv';
import jwksClient from 'jwks-rsa';
import jwt, { JwtHeader, JwtPayload, SigningKeyCallback } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || '';
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE || '';

if (!AUTH0_DOMAIN) {
    console.warn('AUTH0_DOMAIN not set; JWT verification will fail until configured.');
}

const client = jwksClient({
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
});

function getKey(header: JwtHeader, callback: SigningKeyCallback) {
    if (!header.kid) return callback(new Error('No KID in token header'));
    client.getSigningKey(header.kid, (err, key) => {
        if (err) return callback(err as Error);
        const signingKey = (key as any).getPublicKey ? (key as any).getPublicKey() : (key as any).publicKey;
        callback(null, signingKey);
    });
}

export function verifyToken(token: string): Promise<JwtPayload | null> {
    return new Promise((resolve, reject) => {
        try {
            const bare = token?.startsWith('Bearer ') ? token.slice(7) : token;
            jwt.verify(
                bare,
                getKey as any,
                {
                    audience: AUTH0_AUDIENCE || undefined,
                    issuer: AUTH0_DOMAIN ? `https://${AUTH0_DOMAIN}/` : undefined,
                    algorithms: ['RS256'],
                },
                (err, decoded) => {
                    if (err) return reject(err);
                    resolve(decoded as JwtPayload);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const auth = req.headers.authorization;
        if (!auth) return res.status(401).json({ ok: false, error: 'missing authorization header' });
        const decoded = await verifyToken(auth);
        (req as any).auth = decoded;
        next();
    } catch (err: any) {
        res.status(401).json({ ok: false, error: err?.message || 'invalid token' });
    }
}

export function getTokenFromAuthHeader(authorization?: string) {
    if (!authorization) return null;
    if (authorization.startsWith('Bearer ')) return authorization.slice(7);
    return authorization;
}

export default {
    verifyToken,
    requireAuth,
};
