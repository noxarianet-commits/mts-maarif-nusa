'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Galeri {
    _id: string;
    judul: string;
    kategori: string;
    coverImage: {
        url: string;
    };
    published: boolean;
    createdAt: string;
}

export default function MediaPage() {
    const router = useRouter();
    const [data, setData] = useState<Galeri[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGaleri();
    }, []);

    const fetchGaleri = async () => {
        try {
            const res = await fetch('/api/galeri?limit=100');
            const json = await res.json();
            if (json.success) {
                setData(json.data);
            }
        } catch (error) {
            console.error('Failed to fetch galeri:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this album?')) return;

        try {
            const res = await fetch(`/api/galeri/${id}`, {
                method: 'DELETE',
            });
            const json = await res.json();
            if (json.success) {
                fetchGaleri();
            } else {
                alert(json.message || 'Failed to delete');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete');
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Media & Galeri</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        Manage photo albums and media.
                    </p>
                </div>
                <Link
                    href="/admin/media/baru"
                    className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Album
                </Link>
            </div>

            {data.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed dark:border-gray-700">
                    <p className="text-gray-500">No albums found. Create a new one.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data.map((item) => (
                        <div
                            key={item._id}
                            className="group relative bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="aspect-video relative bg-gray-100 dark:bg-gray-900">
                                <Image
                                    src={item.coverImage.url}
                                    alt={item.judul}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Link
                                        href={`/admin/media/edit/${item._id}`}
                                        className="p-2 bg-white rounded-full text-gray-900 hover:bg-gray-100 transition-colors"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold bg-black/50 text-white backdrop-blur-sm">
                                    {item.kategori}
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold truncate" title={item.judul}>{item.judul}</h3>
                                <div className="flex items-center justify-between mt-2">
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${item.published
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                        }`}>
                                        {item.published ? 'Published' : 'Draft'}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
