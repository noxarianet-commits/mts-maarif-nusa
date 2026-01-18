import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
    url: string;
    publicId: string;
    format: string;
    width: number;
    height: number;
    bytes: number;
}

export async function uploadImage(
    file: File,
    folder: string = 'sekolah'
): Promise<UploadResult> {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: 'auto',
                transformation: [
                    { quality: 'auto:good' },
                    { fetch_format: 'auto' },
                ],
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else if (result) {
                    resolve({
                        url: result.secure_url,
                        publicId: result.public_id,
                        format: result.format,
                        width: result.width,
                        height: result.height,
                        bytes: result.bytes,
                    });
                }
            }
        ).end(buffer);
    });
}

export async function uploadMultipleImages(
    files: File[],
    folder: string = 'sekolah'
): Promise<UploadResult[]> {
    const results = await Promise.all(
        files.map((file) => uploadImage(file, folder))
    );
    return results;
}

export async function deleteImage(publicId: string): Promise<boolean> {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result.result === 'ok';
    } catch (error) {
        console.error('Error deleting image:', error);
        return false;
    }
}

export async function deleteMultipleImages(publicIds: string[]): Promise<boolean> {
    try {
        await Promise.all(publicIds.map((id) => deleteImage(id)));
        return true;
    } catch (error) {
        console.error('Error deleting images:', error);
        return false;
    }
}

export function getOptimizedUrl(
    url: string,
    options: {
        width?: number;
        height?: number;
        quality?: string;
    } = {}
): string {
    const { width, height, quality = 'auto' } = options;

    // Parse Cloudinary URL and add transformations
    if (url.includes('cloudinary.com')) {
        const parts = url.split('/upload/');
        if (parts.length === 2) {
            const transformations = [];
            if (width) transformations.push(`w_${width}`);
            if (height) transformations.push(`h_${height}`);
            transformations.push(`q_${quality}`);
            transformations.push('f_auto');

            return `${parts[0]}/upload/${transformations.join(',')}/${parts[1]}`;
        }
    }

    return url;
}

export default cloudinary;
