'use client';

import { BlogForm } from '../_components/blog-form';

export default function CreateBlogPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Write New Post</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Create a new article, news, or announcement.
                </p>
            </div>

            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm">
                <BlogForm />
            </div>
        </div>
    );
}
