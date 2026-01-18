import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, JWTPayload } from './jwt';

export function getTokenFromRequest(request: NextRequest): string | null {
    // Check Authorization header first
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }

    // Check cookie
    const token = request.cookies.get('auth_token')?.value;
    return token || null;
}

export function verifyAuth(request: NextRequest): JWTPayload | null {
    const token = getTokenFromRequest(request);

    if (!token) {
        return null;
    }

    return verifyToken(token);
}

export function requireAuthMiddleware(request: NextRequest): NextResponse | null {
    const auth = verifyAuth(request);

    if (!auth) {
        return NextResponse.json(
            { success: false, message: 'Unauthorized' },
            { status: 401 }
        );
    }

    return null; // Continue with request
}

export function requireRoleMiddleware(
    request: NextRequest,
    allowedRoles: string[]
): NextResponse | null {
    const auth = verifyAuth(request);

    if (!auth) {
        return NextResponse.json(
            { success: false, message: 'Unauthorized' },
            { status: 401 }
        );
    }

    if (!allowedRoles.includes(auth.role)) {
        return NextResponse.json(
            { success: false, message: 'Forbidden' },
            { status: 403 }
        );
    }

    return null; // Continue with request
}
