'use client';

import { PrestasiForm } from '../_components/prestasi-form';

export default function CreatePrestasiPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Add New Achievement</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Record a new student or teacher achievement.
                </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm">
                <PrestasiForm />
            </div>
        </div>
    );
}
