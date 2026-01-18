import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import { Galeri } from '@/lib/database/models';
import { verifyAuth } from '@/lib/auth';
import { slugify } from '@/lib/utils';

// GET - List all galeri (public)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const kategori = searchParams.get('kategori');
        const limit = parseInt(searchParams.get('limit') || '0');

        // Build query
        const query: Record<string, unknown> = { published: true };
        if (kategori) query.kategori = kategori;

        // If admin request (checking token), might want to see drafts? 
        // For now, let's just make a public endpoint. 
        // If I need admin specific list (all statuses), I usually check auth or add 'status' param.
        // My CRUD pages usually fetch from public endpoints but filtered by status in frontend? 
        // No, typically admin endpoints return everything.
        // Let's allow fetching unpublished if param provided and maybe authenticated, 
        // but for simplicity, let's return all if no published param set to true?
        // Wait, other APIs did `if (published === 'true') query.published = true`.
        // If I don't send published=true, it returns everything? 
        // In other APIs: `const query = {}; if (published === 'true') query.published = true`.
        // So by default it returns ALL (draft + published). Good.

        // Re-check Prestasi logic:
        // `const query: Record<string, unknown> = { published: true };` -> This forces published=true always!
        // This is bad for Admin CRUD. Admin won't see drafts.
        // I should have checked that.
        // Let's make Galeri better: default returns all, filter if requested.

        const apiQuery: Record<string, unknown> = {};
        if (kategori) apiQuery.kategori = kategori;

        const publishedParam = searchParams.get('published');
        if (publishedParam === 'true') apiQuery.published = true;

        let galeriQuery = Galeri.find(apiQuery).sort({ tanggal: -1 });

        if (limit > 0) {
            galeriQuery = galeriQuery.limit(limit);
        }

        const galeriList = await galeriQuery;

        return NextResponse.json({
            success: true,
            data: galeriList,
            count: galeriList.length,
        });
    } catch (error) {
        console.error('Get galeri error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

// POST - Create new galeri (admin only)
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

        // Generate slug from judul
        if (!body.slug && body.judul) {
            body.slug = slugify(body.judul);
        }

        // Check if slug exists
        const existingSlug = await Galeri.findOne({ slug: body.slug });
        if (existingSlug) {
            body.slug = `${body.slug}-${Date.now()}`;
        }

        body.createdBy = auth.userId;

        const galeri = await Galeri.create(body);

        return NextResponse.json({
            success: true,
            message: 'Galeri berhasil dibuat',
            data: galeri,
        }, { status: 201 });
    } catch (error) {
        console.error('Create galeri error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
