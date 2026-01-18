'use client';

import { useEffect, useState } from 'react';
import { BlogForm } from '../../_components/blog-form';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const [id, setId] = useState<string>('');
    const [initialData, setInitialData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const resolvedParams = await params;
            setId(resolvedParams.id);
        })();
    }, [params]);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const res = await fetch(`/api/blog/${id}`); // Assuming API supports ID lookup
                const json = await res.json();
                if (json.success) {
                    setInitialData(json.data);
                } else {
                    alert('Failed to load data');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    if (!initialData) {
        return <div className="p-8 text-center text-red-500">Data not found</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Edit Post</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Update existing article.
                </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm">
                <BlogForm initialData={initialData} isEditing />
            </div>
        </div>
    );
}
