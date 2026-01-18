'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

import { EkskulForm } from '../../_components/ekskul-form';

// Since I don't have the type definition easily available (it's likely in database models), 
// I'll define a local interface or use 'any' for now to fetch data.
// Based on list page, I know the shape.

export default function EditEkskulPage({ params }: { params: Promise<{ id: string }> }) {
    // Next.js 15+ params are promises? Or standard. 
    // In Next 13/14 params is an object.
    // The previous file listing showed next version "16.1.3" in package.json! This is very new.
    // In Next.js 15+, params is async in some contexts but let's assume standard page props pattern for now.
    // Actually, getting `params` as a prop in a Server Component is standard, but this is 'use client'.
    // Wait, 'use client' pages still receive params.
    // However, recent Next.js changes might require awaiting params if it's a promise.
    // Let's use `use(params)` if it is a promise, or just access it if not.

    // SAFE APPROACH:
    // In strict Next.js 15, params in pages are Promises.
    // Since I see "next": "16.1.3" in package.json, I should treat params as Promise.

    const [id, setId] = useState<string>('');
    const [initialData, setInitialData] = useState<any>(null); // Replace 'any' with proper type if available
    const [loading, setLoading] = useState(true);

    // Unwrap params
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
                const res = await fetch(`/api/ekskul/${id}`);
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
                <h1 className="text-2xl font-bold tracking-tight">Edit Ekskul</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Update exisiting extracurricular activity.
                </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm">
                <EkskulForm initialData={initialData} isEditing />
            </div>
        </div>
    );
}
