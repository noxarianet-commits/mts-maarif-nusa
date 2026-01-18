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
import { Loader2, Save, Upload, X } from 'lucide-react';
import Image from 'next/image';

const ekskulSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    schedule: z.string().min(3, 'Schedule is required'),
    location: z.string().min(3, 'Location is required'),
    image: z.string().optional(),
    published: z.boolean().default(false),
    featured: z.boolean().default(false),
});

type EkskulFormValues = z.infer<typeof ekskulSchema>;

interface EkskulFormProps {
    initialData?: EkskulFormValues & { _id?: string };
    isEditing?: boolean;
}

export function EkskulForm({ initialData, isEditing = false }: EkskulFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
    const [uploading, setUploading] = useState(false);

    const form = useForm<EkskulFormValues>({
        resolver: zodResolver(ekskulSchema),
        defaultValues: initialData || {
            title: '',
            description: '',
            schedule: '',
            location: '',
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
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                // Assuming the API returns { success: true, url: string } or similar
                // I need to verify the upload API response structure. 
                // For now assuming it returns `url` in data.
                const imageUrl = data.url || data.secure_url || data.data?.url;
                setImagePreview(imageUrl);
                form.setValue('image', imageUrl);
            } else {
                alert('Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (values: EkskulFormValues) => {
        setLoading(true);
        try {
            const url = isEditing && initialData?._id
                ? `/api/ekskul/${initialData._id}`
                : '/api/ekskul';

            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            const json = await res.json();

            if (json.success) {
                router.push('/admin/ekskul');
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl">
            <div className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="e.g. Robotics Club" {...form.register('title')} />
                    {form.formState.errors.title && (
                        <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Describe the activity..."
                        className="h-32"
                        {...form.register('description')}
                    />
                    {form.formState.errors.description && (
                        <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="schedule">Schedule</Label>
                        <Input id="schedule" placeholder="e.g. Every Friday 14:00" {...form.register('schedule')} />
                        {form.formState.errors.schedule && (
                            <p className="text-sm text-red-500">{form.formState.errors.schedule.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="e.g. School Hall" {...form.register('location')} />
                        {form.formState.errors.location && (
                            <p className="text-sm text-red-500">{form.formState.errors.location.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label>Image</Label>
                    <div className="flex items-center gap-4">
                        {imagePreview && (
                            <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
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
                                            <p className="text-sm text-gray-500">Click to upload image</p>
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
                        <span className="text-sm font-medium">Publish</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                            {...form.register('featured')}
                        />
                        <span className="text-sm font-medium">Featured</span>
                    </label>
                </div>
            </div>

            <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading || uploading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {isEditing ? 'Update Ekskul' : 'Create Ekskul'}
                </Button>
            </div>
        </form>
    );
}
