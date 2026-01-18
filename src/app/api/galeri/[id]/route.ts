import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import { Galeri } from '@/lib/database/models';
import { verifyAuth } from '@/lib/auth';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET - Get single galeri
export async function GET(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        await dbConnect();
        const { id } = await params;

        let galeri = await Galeri.findById(id);
        if (!galeri) {
            galeri = await Galeri.findOne({ slug: id });
        }

        if (!galeri) {
            return NextResponse.json(
                { success: false, message: 'Galeri tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: galeri,
        });
    } catch (error) {
        console.error('Get galeri error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

// PUT - Update galeri
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

        const galeri = await Galeri.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!galeri) {
            return NextResponse.json(
                { success: false, message: 'Galeri tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Galeri berhasil diupdate',
            data: galeri,
        });
    } catch (error) {
        console.error('Update galeri error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

// DELETE - Delete galeri
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

        const galeri = await Galeri.findByIdAndDelete(id);

        if (!galeri) {
            return NextResponse.json(
                { success: false, message: 'Galeri tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Galeri berhasil dihapus',
        });
    } catch (error) {
        console.error('Delete galeri error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
