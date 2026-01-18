'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/data-table';
import Link from 'next/link';

interface Blog {
    _id: string;
    id: string;
    title: string;
    slug: string;
    category: string;
    published: boolean;
    publishedAt: string | null;
    createdAt: string;
    views: number;
}

export default function BlogPage() {
    const router = useRouter();
    const [data, setData] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch('/api/blog?limit=100'); // Get more items
            const json = await res.json();
            if (json.success) {
                const mappedData = json.data.map((item: any) => ({
                    ...item,
                    id: item._id
                }));
                setData(mappedData);
            }
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (row: Blog) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const res = await fetch(`/api/blog/${row._id}`, {
                method: 'DELETE',
            });
            const json = await res.json();
            if (json.success) {
                fetchBlogs();
            } else {
                alert(json.message || 'Failed to delete');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete');
        }
    };

    const columns: Column<Blog>[] = [
        {
            header: 'Title',
            accessorKey: 'title',
            sortable: true,
            className: 'font-medium',
        },
        {
            header: 'Category',
            accessorKey: 'category',
            sortable: true,
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
            header: 'Views',
            accessorKey: 'views',
            sortable: true,
        },
        {
            header: 'Date',
            accessorKey: (row) => {
                const date = row.publishedAt ? new Date(row.publishedAt) : new Date(row.createdAt);
                return date.toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                });
            },
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
                    <h1 className="text-2xl font-bold tracking-tight">Blog & News</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Manage news, articles, and announcements.
                    </p>
                </div>
                <Link
                    href="/admin/blog/baru"
                    className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Post
                </Link>
            </div>

            <DataTable
                columns={columns}
                data={data}
                searchKey="title"
                onDelete={handleDelete}
                onEdit={(row) => router.push(`/admin/blog/edit/${row.slug}`)}
                pageSize={10}
            />
        </div>
    );
}
