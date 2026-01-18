'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/data-table';
import Link from 'next/link';
import Image from 'next/image';

interface Guru {
    _id: string;
    id: string;
    nama: string;
    nip: string;
    bidang: string;
    status: string;
    foto: string;
    urutan: number;
}

export default function GuruPage() {
    const router = useRouter();
    const [data, setData] = useState<Guru[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGuru();
    }, []);

    const fetchGuru = async () => {
        try {
            const res = await fetch('/api/guru');
            const json = await res.json();
            if (json.success) {
                const mappedData = json.data.map((item: any) => ({
                    ...item,
                    id: item._id
                }));
                setData(mappedData);
            }
        } catch (error) {
            console.error('Failed to fetch guru:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (row: Guru) => {
        if (!confirm('Are you sure you want to delete this teacher?')) return;

        try {
            const res = await fetch(`/api/guru/${row._id}`, {
                method: 'DELETE',
            });
            const json = await res.json();
            if (json.success) {
                fetchGuru();
            } else {
                alert(json.message || 'Failed to delete');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete');
        }
    };

    const columns: Column<Guru>[] = [
        {
            header: 'Foto',
            accessorKey: (row) => (
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                    {row.foto ? (
                        <Image src={row.foto} alt={row.nama} fill className="object-cover" />
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-400">?</div>
                    )}
                </div>
            ),
            className: 'w-16',
        },
        {
            header: 'Nama',
            accessorKey: 'nama',
            sortable: true,
            className: 'font-medium',
        },
        {
            header: 'NIP',
            accessorKey: 'nip',
            sortable: true,
        },
        {
            header: 'Bidang Studi',
            accessorKey: 'bidang',
            sortable: true,
        },
        {
            header: 'Status',
            accessorKey: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === 'Aktif'
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                    {row.status}
                </span>
            ),
            sortable: true,
        },
        {
            header: 'Urutan',
            accessorKey: 'urutan',
            sortable: true,
            className: 'text-center',
        },
    ];

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Guru & Staff</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Manage teachers and staff members.
                    </p>
                </div>
                <Link
                    href="/admin/guru/baru"
                    className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Teacher
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={data}
                searchKey="nama"
                onDelete={handleDelete}
                onEdit={(row) => router.push(`/admin/guru/edit/${row._id}`)}
                pageSize={10}
            />
        </div>
    );
}
