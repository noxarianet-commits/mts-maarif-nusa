import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import { Guru } from '@/lib/database/models';
import { verifyAuth } from '@/lib/auth';

// GET - List all guru (public)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const bidang = searchParams.get('bidang');

        // Build query
        const query: Record<string, unknown> = {};
        if (status) query.status = status;
        if (bidang) query.bidang = bidang;

        const guruList = await Guru.find(query).sort({ urutan: 1, nama: 1 });

        return NextResponse.json({
            success: true,
            data: guruList,
            count: guruList.length,
        });
    } catch (error) {
        console.error('Get guru error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

// POST - Create new guru (admin only)
export async function POST(request: NextRequest) {
    try {
        const auth = verifyAuth(request);
        if (!auth) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        const body = await request.json();
        const guru = await Guru.create(body);

        return NextResponse.json({
            success: true,
            message: 'Guru berhasil ditambahkan',
            data: guru,
        }, { status: 201 });
    } catch (error) {
        console.error('Create guru error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
