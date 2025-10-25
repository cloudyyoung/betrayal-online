import jwksClient from 'jwks-rsa';
import jwt, { JwtHeader, JwtPayload, SigningKeyCallback } from 'jsonwebtoken';
import { MAccount } from '../models';


const getKey = (header: JwtHeader, callback: SigningKeyCallback) => {
    if (!header.kid) return callback(new Error('No KID in token header'));

    const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;

    if (!AUTH0_DOMAIN) {
        console.warn('AUTH0_DOMAIN not set; JWT verification will fail until configured.');
    }

    const client = jwksClient({
        jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`,
    });

    client.getSigningKey(header.kid, (err, key) => {
        if (err) return callback(err as Error);
        const signingKey = (key as any).getPublicKey ? (key as any).getPublicKey() : (key as any).publicKey;
        callback(null, signingKey);
    });
}

export const verifyToken = async (token: string): Promise<JwtPayload & MAccount> => {
    const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;

    if (!AUTH0_DOMAIN) {
        console.warn('AUTH0_DOMAIN not set; JWT verification will fail until configured.');
    }

    return new Promise((resolve, reject) => {
        try {
            const bare = token?.startsWith('Bearer ') ? token.slice(7) : token;
            jwt.verify(
                bare,
                getKey as any,
                {
                    algorithms: ['RS256'],
                },
                (err, decoded) => {
                    if (err) return reject(err);
                    resolve(decoded as JwtPayload & MAccount);
                }
            );
        } catch (err) {
            reject(err);
        }
    });
}

export function getTokenFromAuthHeader(authorization?: string) {
    if (!authorization) return null;
    if (authorization.startsWith('Bearer ')) return authorization.slice(7);
    return authorization;
}

export default { verifyToken };
