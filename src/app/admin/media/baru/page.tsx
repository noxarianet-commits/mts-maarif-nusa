'use client';

import { MediaForm } from '../_components/media-form';

export default function CreateMediaPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Create New Album</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Create a new photo album.
                </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm">
                <MediaForm />
            </div>
        </div>
    );
}
