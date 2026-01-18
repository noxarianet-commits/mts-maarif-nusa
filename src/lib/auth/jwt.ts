import jwt from 'jsonwebtoken';
import { IUser } from '@/lib/database/models';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface JWTPayload {
    userId: string;
    username: string;
    role: string;
    iat?: number;
    exp?: number;
}

export function signToken(user: IUser): string {
    const payload: JWTPayload = {
        userId: user._id.toString(),
        username: user.username,
        role: user.role,
    };

    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN,
    } as jwt.SignOptions);
}

export function verifyToken(token: string): JWTPayload | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
        return decoded;
    } catch {
        return null;
    }
}

export function decodeToken(token: string): JWTPayload | null {
    try {
        const decoded = jwt.decode(token) as JWTPayload;
        return decoded;
    } catch {
        return null;
    }
}
