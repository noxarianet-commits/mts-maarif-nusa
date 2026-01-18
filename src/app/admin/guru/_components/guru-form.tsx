'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';

const guruSchema = z.object({
    nama: z.string().min(3, 'Nama must be at least 3 characters'),
    nip: z.string().optional(),
    bidang: z.string().min(2, 'Bidang studi is required'),
    status: z.string().min(1, 'Status is required'),
    foto: z.string().optional(),
    urutan: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z.number().positive()
    ).or(z.number())
});

type GuruFormValues = z.infer<typeof guruSchema>;

interface GuruFormProps {
    initialData?: GuruFormValues & { _id?: string };
    isEditing?: boolean;
}

const STATUS_OPTIONS = [
    { value: 'Aktif', label: 'Aktif' },
    { value: 'Cuti', label: 'Cuti' },
    { value: 'Keluar', label: 'Keluar' },
];

export function GuruForm({ initialData, isEditing = false }: GuruFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(initialData?.foto || null);
    const [uploading, setUploading] = useState(false);

    const form = useForm<GuruFormValues>({
        resolver: zodResolver(guruSchema),
        defaultValues: initialData || {
            nama: '',
            nip: '',
            bidang: '',
            status: 'Aktif',
            foto: '',
            urutan: 1,
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
                const imageUrl = data.url || data.secure_url || data.data?.url;
                setImagePreview(imageUrl);
                form.setValue('foto', imageUrl);
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

    const onSubmit = async (values: GuruFormValues) => {
        setLoading(true);
        try {
            const url = isEditing && initialData?._id
                ? `/api/guru/${initialData._id}`
                : '/api/guru';

            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            const json = await res.json();

            if (json.success) {
                router.push('/admin/guru');
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
                    <Label htmlFor="nama">Nama Lengkap</Label>
                    <Input id="nama" placeholder="e.g. Ahmad S.Pd" {...form.register('nama')} />
                    {form.formState.errors.nama && (
                        <p className="text-sm text-red-500">{form.formState.errors.nama.message}</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="nip">NIP (Optional)</Label>
                        <Input id="nip" placeholder="e.g. 1980..." {...form.register('nip')} />
                        {form.formState.errors.nip && (
                            <p className="text-sm text-red-500">{form.formState.errors.nip.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="bidang">Bidang Studi</Label>
                        <Input id="bidang" placeholder="e.g. Matematika" {...form.register('bidang')} />
                        {form.formState.errors.bidang && (
                            <p className="text-sm text-red-500">{form.formState.errors.bidang.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            id="status"
                            options={STATUS_OPTIONS}
                            {...form.register('status')}
                        />
                        {form.formState.errors.status && (
                            <p className="text-sm text-red-500">{form.formState.errors.status.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="urutan">Urutan</Label>
                        <Input
                            id="urutan"
                            type="number"
                            {...form.register('urutan')}
                        />
                        {form.formState.errors.urutan && (
                            <p className="text-sm text-red-500">{form.formState.errors.urutan.message}</p>
                        )}
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label>Foto Profil</Label>
                    <div className="flex items-center gap-4">
                        {imagePreview && (
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border">
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
                                        form.setValue('foto', '');
                                    }}
                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                        <div className="flex-1">
                            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    {uploading ? (
                                        <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                                    ) : (
                                        <>
                                            <Upload className="w-6 h-6 mb-2 text-gray-400" />
                                            <p className="text-sm text-gray-500">Upload Foto</p>
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
            </div>

            <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading || uploading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {isEditing ? 'Update Guru' : 'Add Guru'}
                </Button>
            </div>
        </form>
    );
}
