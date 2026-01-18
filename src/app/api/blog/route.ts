import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import { Blog } from '@/lib/database/models';
import { verifyAuth } from '@/lib/auth';
import { slugify } from '@/lib/utils';

// GET - List all blogs (public)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const published = searchParams.get('published');
        const featured = searchParams.get('featured');
        const category = searchParams.get('category');
        const limit = parseInt(searchParams.get('limit') || '0');
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('perPage') || '10');

        // Build query
        const query: Record<string, unknown> = {};
        if (published === 'true') query.published = true;
        if (featured === 'true') query.featured = true;
        if (category) query.category = category;

        // Count total
        const total = await Blog.countDocuments(query);

        // Pagination
        const skip = (page - 1) * perPage;
        let blogQuery = Blog.find(query)
            .sort({ publishedAt: -1, createdAt: -1 })
            .skip(skip);

        if (limit > 0) {
            blogQuery = blogQuery.limit(limit);
        } else {
            blogQuery = blogQuery.limit(perPage);
        }

        const blogs = await blogQuery;

        return NextResponse.json({
            success: true,
            data: blogs,
            count: blogs.length,
            pagination: {
                total,
                page,
                perPage,
                totalPages: Math.ceil(total / perPage),
            },
        });
    } catch (error) {
        console.error('Get blogs error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

// POST - Create new blog (admin only)
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
        const existingSlug = await Blog.findOne({ slug: body.slug });
        if (existingSlug) {
            body.slug = `${body.slug}-${Date.now()}`;
        }

        // Set published date if publishing
        if (body.published && !body.publishedAt) {
            body.publishedAt = new Date();
        }

        // Set creator
        body.createdBy = auth.userId;
        body.updatedBy = auth.userId;

        const blog = await Blog.create(body);

        return NextResponse.json({
            success: true,
            message: 'Blog berhasil dibuat',
            data: blog,
        }, { status: 201 });
    } catch (error) {
        console.error('Create blog error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
