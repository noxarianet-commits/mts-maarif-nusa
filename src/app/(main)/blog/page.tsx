import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';

// Placeholder data
const blogList = [
    {
        id: 1,
        title: 'Peringatan Maulid Nabi Muhammad SAW 1447 H',
        slug: 'peringatan-maulid-nabi-1447',
        excerpt: 'Kegiatan peringatan Maulid Nabi yang dihadiri seluruh siswa dan wali murid dengan penampilan hadrah dan tausiyah dari ustadz.',
        category: 'kegiatan',
        publishedAt: '2026-01-15',
        readTime: 5
    },
    {
        id: 2,
        title: 'Juara 1 Lomba MTQ Tingkat Kabupaten',
        slug: 'juara-mtq-kabupaten',
        excerpt: 'Siswa MTs Maarif NU Sragi berhasil meraih juara 1 dalam lomba Musabaqah Tilawatil Quran tingkat Kabupaten Pekalongan.',
        category: 'prestasi',
        publishedAt: '2026-01-10',
        readTime: 3
    },
    {
        id: 3,
        title: 'Pengumuman Jadwal UTS Semester Genap',
        slug: 'jadwal-uts-genap',
        excerpt: 'Berikut jadwal Ujian Tengah Semester untuk semester genap tahun ajaran 2025/2026.',
        category: 'pengumuman',
        publishedAt: '2026-01-05',
        readTime: 2
    },
    {
        id: 4,
        title: 'Workshop Kurikulum Merdeka untuk Guru',
        slug: 'workshop-kurikulum-merdeka',
        excerpt: 'Seluruh guru MTs Maarif NU Sragi mengikuti workshop implementasi Kurikulum Merdeka.',
        category: 'berita',
        publishedAt: '2026-01-02',
        readTime: 4
    },
    {
        id: 5,
        title: 'Penerimaan Peserta Didik Baru 2026/2027',
        slug: 'ppdb-2026-2027',
        excerpt: 'Informasi lengkap mengenai penerimaan peserta didik baru tahun ajaran 2026/2027.',
        category: 'pengumuman',
        publishedAt: '2025-12-28',
        readTime: 6
    },
];

const categories = [
    { name: 'Semua', slug: '' },
    { name: 'Berita', slug: 'berita' },
    { name: 'Pengumuman', slug: 'pengumuman' },
    { name: 'Kegiatan', slug: 'kegiatan' },
    { name: 'Prestasi', slug: 'prestasi' },
];

const categoryColors: Record<string, string> = {
    berita: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    pengumuman: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
    kegiatan: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
    prestasi: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
};

export const metadata = {
    title: 'Blog & Berita - MTs Maarif NU Sragi',
    description: 'Berita, pengumuman, dan informasi terbaru dari MTs Maarif NU Sragi',
};

export default function BlogPage() {
    return (
        <div className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Beranda
                </Link>

                <div className="mb-12">
                    <span className="inline-block px-4 py-1.5 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-sm font-medium rounded-full mb-4">
                        Blog & Berita
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Kabar Terbaru
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                        Berita, pengumuman, kegiatan, dan informasi terbaru dari MTs Maarif NU Sragi.
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            className="px-4 py-2 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-sky-100 dark:hover:bg-sky-900/50 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Blog Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogList.map((blog) => (
                        <Link key={blog.id} href={`/blog/${blog.slug}`}>
                            <Card hoverable className="h-full overflow-hidden group">
                                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                                    <BookOpen className="w-12 h-12 text-gray-400" />
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
                                            <span>{blog.publishedAt}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            <span>{blog.readTime} min</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
