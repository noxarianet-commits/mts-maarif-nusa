'use client';

import { GuruForm } from '../_components/guru-form';

export default function CreateGuruPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Add New Teacher</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Add a new teacher or staff member.
                </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm">
                <GuruForm />
            </div>
        </div>
    );
}
