import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';
import { uploadImage, uploadMultipleImages, deleteImage } from '@/lib/storage/cloudinary';

// POST - Upload file(s) to Cloudinary
export async function POST(request: NextRequest) {
    try {
        const auth = verifyAuth(request);
        if (!auth) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const files = formData.getAll('files') as File[];
        const folder = formData.get('folder') as string || 'sekolah';

        if (!files || files.length === 0) {
            return NextResponse.json(
                { success: false, message: 'Tidak ada file yang diupload' },
                { status: 400 }
            );
        }

        // Validate file types
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        for (const file of files) {
            if (!allowedTypes.includes(file.type)) {
                return NextResponse.json(
                    { success: false, message: `Tipe file tidak diizinkan: ${file.type}` },
                    { status: 400 }
                );
            }

            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                return NextResponse.json(
                    { success: false, message: 'Ukuran file maksimal 5MB' },
                    { status: 400 }
                );
            }
        }

        // Upload files
        let results;
        if (files.length === 1) {
            const result = await uploadImage(files[0], folder);
            results = [result];
        } else {
            results = await uploadMultipleImages(files, folder);
        }

        return NextResponse.json({
            success: true,
            message: 'File berhasil diupload',
            data: results,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan saat upload' },
            { status: 500 }
        );
    }
}

// DELETE - Delete file from Cloudinary
export async function DELETE(request: NextRequest) {
    try {
        const auth = verifyAuth(request);
        if (!auth) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { publicId } = body;

        if (!publicId) {
            return NextResponse.json(
                { success: false, message: 'Public ID wajib diisi' },
                { status: 400 }
            );
        }

        const success = await deleteImage(publicId);

        if (!success) {
            return NextResponse.json(
                { success: false, message: 'Gagal menghapus file' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'File berhasil dihapus',
        });
    } catch (error) {
        console.error('Delete file error:', error);
        return NextResponse.json(
            { success: false, message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}
