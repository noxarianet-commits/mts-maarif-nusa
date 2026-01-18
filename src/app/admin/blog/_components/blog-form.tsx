'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';

const blogSchema = z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    excerpt: z.string().min(10, 'Excerpt must be at least 10 characters').max(300, 'Excerpt too long'),
    content: z.string().min(50, 'Content must be at least 50 characters'),
    category: z.string().min(1, 'Category is required'),
    image: z.string().optional(),
    published: z.boolean().optional(),
    featured: z.boolean().optional(),
});

type BlogFormValues = z.infer<typeof blogSchema>;

interface BlogFormProps {
    initialData?: BlogFormValues & { _id?: string };
    isEditing?: boolean;
}

const CATEGORIES = [
    'berita',
    'pengumuman',
    'artikel',
    'prestasi',
    'kegiatan',
];

export function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
    const [uploading, setUploading] = useState(false);

    const form = useForm<BlogFormValues>({
        resolver: zodResolver(blogSchema),
        defaultValues: initialData || {
            title: '',
            excerpt: '',
            content: '',
            category: '',
            image: '',
            published: false,
            featured: false,
        },
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('files', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                // The upload API returns an array since we supported multiple files
                // but checking the response logic, if single file, it returns array of 1 result?
                // Wait, Looking at API: results = [result] or uploadMultipleImages(files).
                // So data.data is an array.
                const result = Array.isArray(data.data) ? data.data[0] : data.data;
                const imageUrl = result.url || result.secure_url;

                setImagePreview(imageUrl);
                form.setValue('image', imageUrl);

                // Ideally we should store the whole object or ID too, but for now 
                // the API handles the 'unknown' ID case.
            } else {
                alert('Upload failed: ' + (data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (values: BlogFormValues) => {
        setLoading(true);
        try {
            const url = isEditing && initialData?._id
                ? `/api/blog/${initialData._id}`
                : '/api/blog';

            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            const json = await res.json();

            if (json.success) {
                router.push('/admin/blog');
                router.refresh();
            } else {
                alert(json.message || 'Something went wrong');
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
            <div className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="e.g. Perayaan Hari Kemerdekaan" {...form.register('title')} />
                    {form.formState.errors.title && (
                        <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                        id="category"
                        options={CATEGORIES.map(cat => ({
                            value: cat,
                            label: cat.charAt(0).toUpperCase() + cat.slice(1)
                        }))}
                        {...form.register('category')}
                    />
                    {form.formState.errors.category && (
                        <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="excerpt">Excerpt</Label>
                    <Textarea
                        id="excerpt"
                        placeholder="Short summary for the card view..."
                        className="h-20"
                        {...form.register('excerpt')}
                    />
                    {form.formState.errors.excerpt && (
                        <p className="text-sm text-red-500">{form.formState.errors.excerpt.message}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                        id="content"
                        placeholder="Main content..."
                        className="h-64 font-mono"
                        {...form.register('content')}
                    />
                    {form.formState.errors.content && (
                        <p className="text-sm text-red-500">{form.formState.errors.content.message}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label>Featured Image</Label>
                    <div className="flex items-center gap-4">
                        {imagePreview && (
                            <div className="relative w-40 h-24 rounded-lg overflow-hidden border">
                                <Image
                                    src={imagePreview}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImagePreview(null);
                                        form.setValue('image', '');
                                    }}
                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        <div className="flex-1">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {uploading ? (
                                        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                                    ) : (
                                        <>
                                            <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                            <p className="text-sm text-gray-500">Click to upload cover image</p>
                                        </>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                            {...form.register('published')}
                        />
                        <span className="text-sm font-medium">Publish Immediately</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                            {...form.register('featured')}
                        />
                        <span className="text-sm font-medium">Mark as Featured</span>
                    </label>
                </div>
            </div>

            <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading || uploading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {isEditing ? 'Update Post' : 'Create Post'}
                </Button>
            </div>
        </form>
    );
}
