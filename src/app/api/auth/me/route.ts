import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import { User } from '@/lib/database/models';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const auth = verifyAuth(request);

        if (!auth) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const user = await User.findById(auth.userId).select('-password');

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                role: user.role,
                avatar: user.avatar,
                permissions: user.permissions,
                lastLogin: user.lastLogin,
            },
        });
    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
