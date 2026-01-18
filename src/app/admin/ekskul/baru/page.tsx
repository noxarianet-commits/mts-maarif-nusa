'use client';

import { EkskulForm } from '../_components/ekskul-form';

export default function CreateEkskulPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Create New Ekskul</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Add a new extracurricular activity.
                </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm">
                <EkskulForm />
            </div>
        </div>
    );
}
