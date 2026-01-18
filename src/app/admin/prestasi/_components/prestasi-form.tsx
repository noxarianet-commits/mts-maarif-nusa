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
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';

const prestasiSchema = z.object({
    jenis: z.string().min(1, 'Jenis is required'),
    nama: z.string().min(3, 'Nama peraih is required'),
    prestasi: z.string().min(3, 'Nama prestasi is required'),
    deskripsi: z.string().optional(),
    event: z.string().min(3, 'Nama event is required'),
    tingkat: z.string().min(1, 'Tingkat is required'),
    kategori: z.string().min(1, 'Kategori is required'),
    tanggal: z.string().min(1, 'Tanggal is required'),
    tahun: z.string().transform(v => parseInt(v, 10) || new Date().getFullYear()), // Handle as string from input but transform to number
    penyelenggara: z.string().min(3, 'Penyelenggara is required'),
    published: z.boolean().default(true),
    // bukti: z.array(...) // Skipping complex file array for MVP, maybe just single image URL in logic or skip for now
});

type PrestasiFormValues = z.infer<typeof prestasiSchema>;

// Input for 'tahun' is string, but submit expects number. Zod transform handles it.
// However, react-hook-form needs compatible types.
// I'll manually handle types if needed.

interface PrestasiFormProps {
    initialData?: any; // Using any for simplicity with complex date/number types
    isEditing?: boolean;
}

const JENIS_OPTIONS = [
    { value: 'siswa', label: 'Siswa' },
    { value: 'guru', label: 'Guru' },
    { value: 'sekolah', label: 'Sekolah' },
];

const TINGKAT_OPTIONS = [
    { value: 'sekolah', label: 'Sekolah' },
    { value: 'kecamatan', label: 'Kecamatan' },
    { value: 'kabupaten', label: 'Kabupaten' },
    { value: 'provinsi', label: 'Provinsi' },
    { value: 'nasional', label: 'Nasional' },
    { value: 'internasional', label: 'Internasional' },
];

export function PrestasiForm({ initialData, isEditing = false }: PrestasiFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Initial data adjustments
    // Date needs to be formatted YYYY-MM-DD for input type date
    const formattedInitialData = initialData ? {
        ...initialData,
        tanggal: initialData.tanggal ? new Date(initialData.tanggal).toISOString().split('T')[0] : '',
        tahun: String(initialData.tahun || new Date().getFullYear()), // Input expects string
    } : {
        jenis: 'siswa',
        nama: '',
        prestasi: '',
        deskripsi: '',
        event: '',
        tingkat: 'kabupaten',
        kategori: '',
        tanggal: new Date().toISOString().split('T')[0],
        tahun: String(new Date().getFullYear()),
        penyelenggara: '',
        published: true,
    };

    const form = useForm<any>({ // Using any to bypass strict Zod<->Form type issues with transform
        resolver: zodResolver(prestasiSchema),
        defaultValues: formattedInitialData,
    });

    const onSubmit = async (values: any) => {
        setLoading(true);
        try {
            const url = isEditing && initialData?._id
                ? `/api/prestasi/${initialData._id}`
                : '/api/prestasi';

            const method = isEditing ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            const json = await res.json();

            if (json.success) {
                router.push('/admin/prestasi');
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
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="jenis">Jenis</Label>
                        <Select
                            id="jenis"
                            options={JENIS_OPTIONS}
                            {...form.register('jenis')}
                        />
                        {form.formState.errors.jenis && (
                            <p className="text-sm text-red-500">{String(form.formState.errors.jenis.message)}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="tingkat">Tingkat</Label>
                        <Select
                            id="tingkat"
                            options={TINGKAT_OPTIONS}
                            {...form.register('tingkat')}
                        />
                        {form.formState.errors.tingkat && (
                            <p className="text-sm text-red-500">{String(form.formState.errors.tingkat.message)}</p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="prestasi">Nama Prestasi/Juara</Label>
                        <Input id="prestasi" placeholder="e.g. Juara 1 Lomba Coding" {...form.register('prestasi')} />
                        {form.formState.errors.prestasi && (
                            <p className="text-sm text-red-500">{String(form.formState.errors.prestasi.message)}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="nama">Nama Peraih</Label>
                        <Input id="nama" placeholder="e.g. Budi Santoso" {...form.register('nama')} />
                        {form.formState.errors.nama && (
                            <p className="text-sm text-red-500">{String(form.formState.errors.nama.message)}</p>
                        )}
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="event">Event</Label>
                    <Input id="event" placeholder="e.g. Olimpiade Siswa Nasional" {...form.register('event')} />
                    {form.formState.errors.event && (
                        <p className="text-sm text-red-500">{String(form.formState.errors.event.message)}</p>
                    )}
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="deskripsi">Deskripsi</Label>
                    <Textarea
                        id="deskripsi"
                        placeholder="Detail prestasi..."
                        {...form.register('deskripsi')}
                    />
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="kategori">Kategori</Label>
                        <Input id="kategori" placeholder="e.g. Akademik" {...form.register('kategori')} />
                        {form.formState.errors.kategori && (
                            <p className="text-sm text-red-500">{String(form.formState.errors.kategori.message)}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="tanggal">Tanggal</Label>
                        <Input id="tanggal" type="date" {...form.register('tanggal')} />
                        {form.formState.errors.tanggal && (
                            <p className="text-sm text-red-500">{String(form.formState.errors.tanggal.message)}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="tahun">Tahun</Label>
                        <Input id="tahun" type="number" {...form.register('tahun')} />
                        {form.formState.errors.tahun && (
                            <p className="text-sm text-red-500">{String(form.formState.errors.tahun.message)}</p>
                        )}
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="penyelenggara">Penyelenggara</Label>
                    <Input id="penyelenggara" placeholder="e.g. Kemendikbud" {...form.register('penyelenggara')} />
                    {form.formState.errors.penyelenggara && (
                        <p className="text-sm text-red-500">{String(form.formState.errors.penyelenggara.message)}</p>
                    )}
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
                </div>
            </div>

            <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    {isEditing ? 'Update Prestasi' : 'Add Prestasi'}
                </Button>
            </div>
        </form>
    );
}
