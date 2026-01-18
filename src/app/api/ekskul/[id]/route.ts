import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import { Ekskul } from '@/lib/database/models';
import { verifyAuth } from '@/lib/auth';

interface RouteParams {
    params: Promise<{ id: string }>;
}

// GET - Get single ekskul by ID or slug
export async function GET(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        await dbConnect();
        const { id } = await params;

        // Try to find by ID first, then by slug
        let ekskul = await Ekskul.findById(id);
        if (!ekskul) {
            ekskul = await Ekskul.findOne({ slug: id });
        }

        if (!ekskul) {
            return NextResponse.json(
                { success: false, message: 'Ekskul tidak ditemukan' },
                { status: 404 }
            );
        }

        // Increment view count
        ekskul.meta.views += 1;
        await ekskul.save();

        return NextResponse.json({
            success: true,
            data: ekskul,
        });
    } catch (error) {
        console.error('Get ekskul error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

// PUT - Update ekskul
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

        // Set updater
        body.updatedBy = auth.userId;

        const ekskul = await Ekskul.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!ekskul) {
            return NextResponse.json(
                { success: false, message: 'Ekskul tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Ekskul berhasil diupdate',
            data: ekskul,
        });
    } catch (error) {
        console.error('Update ekskul error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

// DELETE - Delete ekskul
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

        const ekskul = await Ekskul.findByIdAndDelete(id);

        if (!ekskul) {
            return NextResponse.json(
                { success: false, message: 'Ekskul tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Ekskul berhasil dihapus',
        });
    } catch (error) {
        console.error('Delete ekskul error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
