import { cookies } from 'next/headers';
import { verifyToken, JWTPayload } from './jwt';

const COOKIE_NAME = 'auth_token';

export async function getSession(): Promise<JWTPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
        return null;
    }

    return verifyToken(token);
}

export async function setSessionCookie(token: string): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });
}

export async function clearSessionCookie(): Promise<void> {
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0,
        path: '/',
    });
}

export async function isAuthenticated(): Promise<boolean> {
    const session = await getSession();
    return session !== null;
}

export async function requireAuth(): Promise<JWTPayload> {
    const session = await getSession();

    if (!session) {
        throw new Error('Unauthorized');
    }

    return session;
}
