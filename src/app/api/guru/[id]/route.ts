import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import { Guru } from '@/lib/database/models';
import { verifyAuth } from '@/lib/auth';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET - Get single guru by ID
export async function GET(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        await dbConnect();
        const { id } = await params;

        const guru = await Guru.findById(id);

        if (!guru) {
            return NextResponse.json(
                { success: false, message: 'Guru tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: guru,
        });
    } catch (error) {
        console.error('Get guru error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

// PUT - Update guru
export async function PUT(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const auth = verifyAuth(request);
        if (!auth) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();
        const { id } = await params;
        const body = await request.json();

        const guru = await Guru.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!guru) {
            return NextResponse.json(
                { success: false, message: 'Guru tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Guru berhasil diupdate',
            data: guru,
        });
    } catch (error) {
        console.error('Update guru error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

// DELETE - Delete guru
export async function DELETE(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        const auth = verifyAuth(request);
        if (!auth) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();
        const { id } = await params;

        const guru = await Guru.findByIdAndDelete(id);

        if (!guru) {
            return NextResponse.json(
                { success: false, message: 'Guru tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Guru berhasil dihapus',
        });
    } catch (error) {
        console.error('Delete guru error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
