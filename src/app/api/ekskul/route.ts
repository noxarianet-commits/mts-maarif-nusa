import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import { Ekskul } from '@/lib/database/models';
import { verifyAuth } from '@/lib/auth';
import { slugify } from '@/lib/utils';

// GET - List all ekskul (public)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const published = searchParams.get('published');
        const featured = searchParams.get('featured');
        const limit = parseInt(searchParams.get('limit') || '0');

        // Build query
        const query: Record<string, unknown> = {};
        if (published === 'true') query.published = true;
        if (featured === 'true') query.featured = true;

        let ekskulQuery = Ekskul.find(query).sort({ order: 1, createdAt: -1 });

        if (limit > 0) {
            ekskulQuery = ekskulQuery.limit(limit);
        }

        const ekskulList = await ekskulQuery;

        return NextResponse.json({
            success: true,
            data: ekskulList,
            count: ekskulList.length,
        });
    } catch (error) {
        console.error('Get ekskul error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

// POST - Create new ekskul (admin only)
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

        // Generate slug from title
        if (!body.slug && body.title) {
            body.slug = slugify(body.title);
        }

        // Check if slug exists
        const existingSlug = await Ekskul.findOne({ slug: body.slug });
        if (existingSlug) {
            body.slug = `${body.slug}-${Date.now()}`;
        }

        // Set creator
        body.createdBy = auth.userId;
        body.updatedBy = auth.userId;

        const ekskul = await Ekskul.create(body);

        return NextResponse.json({
            success: true,
            message: 'Ekskul berhasil dibuat',
            data: ekskul,
        }, { status: 201 });
    } catch (error) {
        console.error('Create ekskul error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
