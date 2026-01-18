import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database/mongodb';
import { Prestasi } from '@/lib/database/models';
import { verifyAuth } from '@/lib/auth';

// GET - List all prestasi (public)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const jenis = searchParams.get('jenis');
        const tingkat = searchParams.get('tingkat');
        const tahun = searchParams.get('tahun');
        const limit = parseInt(searchParams.get('limit') || '0');

        // Build query
        const query: Record<string, unknown> = { published: true };
        if (jenis) query.jenis = jenis;
        if (tingkat) query.tingkat = tingkat;
        if (tahun) query.tahun = parseInt(tahun);

        let prestasiQuery = Prestasi.find(query).sort({ tahun: -1, tanggal: -1 });

        if (limit > 0) {
            prestasiQuery = prestasiQuery.limit(limit);
        }

        const prestasiList = await prestasiQuery;

        return NextResponse.json({
            success: true,
            data: prestasiList,
            count: prestasiList.length,
        });
    } catch (error) {
        console.error('Get prestasi error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

// POST - Create new prestasi (admin only)
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

        // Auto-set tahun from tanggal if not provided
        if (!body.tahun && body.tanggal) {
            body.tahun = new Date(body.tanggal).getFullYear();
        }

        const prestasi = await Prestasi.create(body);

        return NextResponse.json({
            success: true,
            message: 'Prestasi berhasil ditambahkan',
            data: prestasi,
        }, { status: 201 });
    } catch (error) {
        console.error('Create prestasi error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
