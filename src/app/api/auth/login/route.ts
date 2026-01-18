import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import { User } from '@/lib/database/models';
import { signToken, setSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const { username, password } = body;

        // Validate input
        if (!username || !password) {
            return NextResponse.json(
                { success: false, message: 'Username dan password wajib diisi' },
                { status: 400 }
            );
        }

        // Find user by username or email
        const user = await User.findOne({
            $or: [
                { username: username.toLowerCase() },
                { email: username.toLowerCase() },
            ],
            isActive: true,
        }).select('+password');

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Username atau password salah' },
                { status: 401 }
            );
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, message: 'Username atau password salah' },
                { status: 401 }
            );
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate JWT token
        const token = signToken(user);

        // Set session cookie
        await setSessionCookie(token);

        return NextResponse.json({
            success: true,
            message: 'Login berhasil',
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    avatar: user.avatar,
                },
                token,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
