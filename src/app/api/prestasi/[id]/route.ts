import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import { Prestasi } from '@/lib/database/models';
import { verifyAuth } from '@/lib/auth';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET - Get single prestasi by ID
export async function GET(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        await dbConnect();
        const { id } = await params;

        const prestasi = await Prestasi.findById(id);

        if (!prestasi) {
            return NextResponse.json(
                { success: false, message: 'Prestasi tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: prestasi,
        });
    } catch (error) {
        console.error('Get prestasi error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

// PUT - Update prestasi
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

        const prestasi = await Prestasi.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!prestasi) {
            return NextResponse.json(
                { success: false, message: 'Prestasi tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Prestasi berhasil diupdate',
            data: prestasi,
        });
    } catch (error) {
        console.error('Update prestasi error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

// DELETE - Delete prestasi
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

        const prestasi = await Prestasi.findByIdAndDelete(id);

        if (!prestasi) {
            return NextResponse.json(
                { success: false, message: 'Prestasi tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Prestasi berhasil dihapus',
        });
    } catch (error) {
        console.error('Delete prestasi error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
