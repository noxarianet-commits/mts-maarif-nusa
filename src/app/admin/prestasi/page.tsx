'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/data-table';
import Link from 'next/link';

interface Prestasi {
    _id: string;
    id: string;
    nama: string;
    prestasi: string;
    event: string;
    jenis: string;
    tingkat: string;
    tahun: number;
    penyelenggara: string;
}

export default function PrestasiPage() {
    const router = useRouter();
    const [data, setData] = useState<Prestasi[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPrestasi();
    }, []);

    const fetchPrestasi = async () => {
        try {
            const res = await fetch('/api/prestasi');
            const json = await res.json();
            if (json.success) {
                const mappedData = json.data.map((item: any) => ({
                    ...item,
                    id: item._id
                }));
                setData(mappedData);
            }
        } catch (error) {
            console.error('Failed to fetch prestasi:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (row: Prestasi) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            const res = await fetch(`/api/prestasi/${row._id}`, {
                method: 'DELETE',
            });
            const json = await res.json();
            if (json.success) {
                fetchPrestasi();
            } else {
                alert(json.message || 'Failed to delete');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete');
        }
    };

    const columns: Column<Prestasi>[] = [
        {
            header: 'Prestasi',
            accessorKey: 'prestasi',
            sortable: true,
            className: 'font-medium',
        },
        {
            header: 'Pemenang',
            accessorKey: 'nama',
            sortable: true,
        },
        {
            header: 'Event',
            accessorKey: 'event',
            sortable: true,
        },
        {
            header: 'Tingkat',
            accessorKey: 'tingkat',
            sortable: true,
        },
        {
            header: 'Tahun',
            accessorKey: 'tahun',
            sortable: true,
        },
    ];

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Prestasi</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Manage academic and non-academic achievements.
                    </p>
                </div>
                <Link
                    href="/admin/prestasi/baru"
                    className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Achievement
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={data}
                searchKey="prestasi"
                onDelete={handleDelete}
                onEdit={(row) => router.push(`/admin/prestasi/edit/${row._id}`)}
                pageSize={10}
            />
        </div>
    );
}
