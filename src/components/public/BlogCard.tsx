import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import { IBlog } from '@/lib/database/models';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
    blog: IBlog;
    featured?: boolean;
}

export function BlogCard({ blog, featured = false }: BlogCardProps) {
    const categoryColors: Record<string, string> = {
        berita: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
        pengumuman: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
        kegiatan: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
        prestasi: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
    };

    if (featured) {
        return (
            <Link href={`/blog/${blog.slug}`}>
                <Card hoverable className="overflow-hidden group">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Image */}
                        <div className="relative h-64 md:h-full min-h-[300px]">
                            <Image
                                src={blog.coverImage.url}
                                alt={blog.coverImage.alt || blog.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 dark:to-gray-900/20" />
                        </div>

                        {/* Content */}
                        <CardContent className="p-8 flex flex-col justify-center">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${categoryColors[blog.category]}`}>
                                    {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
                                </span>
                                {blog.featured && (
                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
                                        Featured
                                    </span>
                                )}
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-sky-600 transition-colors line-clamp-2">
                                {blog.title}
                            </h3>

                            <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                                {blog.excerpt}
                            </p>

                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{blog.meta.readTime} menit baca</span>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-2 text-sky-600 dark:text-sky-400 font-medium group-hover:gap-3 transition-all">
                                Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                            </div>
                        </CardContent>
                    </div>
                </Card>
            </Link>
        );
    }

    return (
        <Link href={`/blog/${blog.slug}`}>
            <Card hoverable className="h-full overflow-hidden group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={blog.coverImage.url}
                        alt={blog.coverImage.alt || blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${categoryColors[blog.category]}`}>
                            {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
                        </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">
                        {blog.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                        {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{blog.meta.readTime} min</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
