import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import { Ekskul, Blog, Guru, Prestasi, Galeri } from '@/lib/database/models';
import { verifyAuth } from '@/lib/auth';

// GET - Dashboard statistics
export async function GET(request: NextRequest) {
    try {
        const auth = verifyAuth(request);
        if (!auth) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await dbConnect();

        // Get counts
        const [
            totalEkskul,
            totalBlog,
            totalGuru,
            totalPrestasi,
            totalGaleri,
            publishedBlog,
            publishedEkskul,
            featuredEkskul,
        ] = await Promise.all([
            Ekskul.countDocuments(),
            Blog.countDocuments(),
            Guru.countDocuments({ status: 'aktif' }),
            Prestasi.countDocuments({ published: true }),
            Galeri.countDocuments({ published: true }),
            Blog.countDocuments({ published: true }),
            Ekskul.countDocuments({ published: true }),
            Ekskul.countDocuments({ featured: true }),
        ]);

        // Get recent blogs
        const recentBlogs = await Blog.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title slug category createdAt published');

        // Get total views
        const blogViews = await Blog.aggregate([
            { $group: { _id: null, totalViews: { $sum: '$meta.views' } } },
        ]);

        const ekskulViews = await Ekskul.aggregate([
            { $group: { _id: null, totalViews: { $sum: '$meta.views' } } },
        ]);

        // Get prestasi by tingkat
        const prestasiByTingkat = await Prestasi.aggregate([
            { $match: { published: true } },
            { $group: { _id: '$tingkat', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        return NextResponse.json({
            success: true,
            data: {
                counts: {
                    ekskul: totalEkskul,
                    blog: totalBlog,
                    guru: totalGuru,
                    prestasi: totalPrestasi,
                    galeri: totalGaleri,
                },
                published: {
                    blog: publishedBlog,
                    ekskul: publishedEkskul,
                },
                featured: {
                    ekskul: featuredEkskul,
                },
                views: {
                    blog: blogViews[0]?.totalViews || 0,
                    ekskul: ekskulViews[0]?.totalViews || 0,
                },
                recentBlogs,
                prestasiByTingkat,
            },
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
