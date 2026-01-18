'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/data-table';
import { formatDate } from '@/lib/utils'; // Assuming this exists or I'll use native Date
import Link from 'next/link';

interface Ekskul {
    _id: string;
    id: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    schedule: string;
    location: string;
    published: boolean;
    featured: boolean;
    createdAt: string;
}

export default function EkskulPage() {
    const router = useRouter();
    const [data, setData] = useState<Ekskul[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEkskul();
    }, []);

    const fetchEkskul = async () => {
        try {
            const res = await fetch('/api/ekskul');
            const json = await res.json();
            if (json.success) {
                // Map _id to id for DataTable compatibility if needed, though my DataTable used T extends { id: string | number }
                // My DataTable uses `row.id` as key. The data has `_id`. I should map it or adjust DataTable.
                // Let's map it here to be safe.
                const mappedData = json.data.map((item: any) => ({
                    ...item,
                    id: item._id
                }));
                setData(mappedData);
            }
        } catch (error) {
            console.error('Failed to fetch ekskul:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (row: Ekskul) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            const res = await fetch(`/api/ekskul/${row._id}`, {
                method: 'DELETE',
            });
            const json = await res.json();
            if (json.success) {
                fetchEkskul(); // Refresh data
            } else {
                alert(json.message || 'Failed to delete');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete');
        }
    };

    const columns: Column<Ekskul>[] = [
        {
            header: 'Title',
            accessorKey: 'title',
            sortable: true,
            className: 'font-medium',
        },
        {
            header: 'Schedule',
            accessorKey: 'schedule',
        },
        {
            header: 'Status',
            accessorKey: (row) => (
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.published
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                    {row.published ? 'Published' : 'Draft'}
                </span>
            ),
            sortable: true,
        },
        {
            header: 'Created At',
            accessorKey: (row) => new Date(row.createdAt).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
            }),
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
                    <h1 className="text-2xl font-bold tracking-tight">Ekstrakurikuler</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Manage extracurricular activities and programs.
                    </p>
                </div>
                <Link
                    href="/admin/ekskul/baru"
                    className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add New
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={data}
                searchKey="title"
                onDelete={handleDelete}
                onEdit={(row) => router.push(`/admin/ekskul/edit/${row._id}`)}
                pageSize={10}
            />
        </div>
    );
}
