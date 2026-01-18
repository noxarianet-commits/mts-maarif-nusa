import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import { Blog } from '@/lib/database/models';
import { verifyAuth } from '@/lib/auth';

interface RouteParams {
    params: Promise<{ slug: string }>;
}

// GET - Get single blog by slug
export async function GET(
    request: NextRequest,
    { params }: RouteParams
) {
    try {
        await dbConnect();
        const { slug } = await params;

        const blog = await Blog.findOne({ slug });

        if (!blog) {
            return NextResponse.json(
                { success: false, message: 'Blog tidak ditemukan' },
                { status: 404 }
            );
        }

        // Increment view count
        blog.meta.views += 1;
        await blog.save();

        return NextResponse.json({
            success: true,
            data: blog,
        });
    } catch (error) {
        console.error('Get blog error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

// PUT - Update blog
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
        const { slug } = await params;
        const body = await request.json();

        // Set updater
        body.updatedBy = auth.userId;

        // Set published date if publishing for first time
        if (body.published && !body.publishedAt) {
            body.publishedAt = new Date();
        }

        const blog = await Blog.findOneAndUpdate(
            { slug },
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!blog) {
            return NextResponse.json(
                { success: false, message: 'Blog tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Blog berhasil diupdate',
            data: blog,
        });
    } catch (error) {
        console.error('Update blog error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

// DELETE - Delete blog
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
        const { slug } = await params;

        const blog = await Blog.findOneAndDelete({ slug });

        if (!blog) {
            return NextResponse.json(
                { success: false, message: 'Blog tidak ditemukan' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Blog berhasil dihapus',
        });
    } catch (error) {
        console.error('Delete blog error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
