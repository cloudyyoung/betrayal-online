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

const getKey = (header: JwtHeader, callback: SigningKeyCallback) => {
    if (!header.kid) return callback(new Error('No KID in token header'));
    client.getSigningKey(header.kid, (err, key) => {
        if (err) return callback(err as Error);
        const signingKey = (key as any).getPublicKey ? (key as any).getPublicKey() : (key as any).publicKey;
        callback(null, signingKey);
    });
}

export const verifyToken = async (token: string): Promise<JwtPayload> => {
    const bare = token?.startsWith('Bearer ') ? token.slice(7) : token;
    const payload = await jwt.verify(
        bare,
        getKey as any,
        {
            audience: AUTH0_AUDIENCE || undefined,
            issuer: AUTH0_DOMAIN ? `https://${AUTH0_DOMAIN}/` : undefined,
            algorithms: ['RS256'],
        },
    );
    return payload as JwtPayload;
}

export function getTokenFromAuthHeader(authorization?: string) {
    if (!authorization) return null;
    if (authorization.startsWith('Bearer ')) return authorization.slice(7);
    return authorization;
}

export default { verifyToken };
