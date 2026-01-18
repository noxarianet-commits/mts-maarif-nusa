import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import { Pengaturan } from '@/lib/database/models';
import { verifyAuth } from '@/lib/auth';

// GET - List all settings
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        // Ensure default settings exist (optional: seeding logic could go here or separate script)
        // For now just return what's in DB.

        const settings = await Pengaturan.find({}).sort({ order: 1 });

        return NextResponse.json({
            success: true,
            data: settings,
        });
    } catch (error) {
        console.error('Get pengaturan error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

// PUT - Bulk update settings
export async function PUT(request: NextRequest) {
    try {
        const auth = verifyAuth(request);
        if (!auth) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();
        const body = await request.json(); // Expected: { [key]: value, ... } or array of objects

        // If body is array of { key, value }
        if (Array.isArray(body)) {
            for (const item of body) {
                await Pengaturan.findOneAndUpdate(
                    { key: item.key },
                    { $set: { value: item.value } },
                    { upsert: true } // Create if not exists? Maybe only update if seed exists.
                );
            }
        } else {
            // Object format { key: value }
            // Iterate over keys
            for (const [key, value] of Object.entries(body)) {
                await Pengaturan.findOneAndUpdate(
                    { key },
                    { $set: { value } }
                );
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Pengaturan berhasil disimpan',
        });
    } catch (error) {
        console.error('Update pengaturan error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
