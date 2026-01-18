import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Eye } from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';

interface PageProps {
    params: Promise<{ slug: string }>;
}

const getBlog = () => ({
    id: 1,
    title: 'Peringatan Maulid Nabi Muhammad SAW 1447 H',
    slug: 'peringatan-maulid-nabi-1447',
    excerpt: 'Kegiatan peringatan Maulid Nabi yang dihadiri seluruh siswa dan wali murid dengan penampilan hadrah dan tausiyah dari ustadz.',
    content: `
    <p>Pada hari Sabtu, 15 Januari 2026, MTs Maarif NU Sragi menyelenggarakan peringatan Maulid Nabi Muhammad SAW 1447 H dengan penuh khidmat. Kegiatan ini dihadiri oleh seluruh siswa, guru, dan wali murid.</p>
    
    <h2>Rangkaian Acara</h2>
    <p>Acara dimulai pukul 08.00 WIB dengan pembukaan oleh MC, dilanjutkan dengan pembacaan ayat suci Al-Quran. Kemudian, tim hadrah sekolah menampilkan sholawat yang memukau seluruh hadirin.</p>
    
    <p>Puncak acara adalah tausiyah dari Ustadz KH. Ahmad Fauzi yang menyampaikan pentingnya meneladani akhlak Rasulullah SAW dalam kehidupan sehari-hari.</p>
    
    <h2>Pesan Kepala Sekolah</h2>
    <p>Kepala Sekolah, Bapak Drs. H. Muhammad Ridwan, menyampaikan bahwa peringatan Maulid Nabi bukan hanya sekedar seremonial, tetapi momentum untuk meningkatkan kecintaan kepada Rasulullah SAW dan mengamalkan ajarannya.</p>
    
    <blockquote>
      "Mari kita jadikan momentum Maulid Nabi ini sebagai pengingat untuk selalu meneladani akhlak Rasulullah dalam keseharian kita, terutama dalam menuntut ilmu."
    </blockquote>
    
    <p>Acara ditutup dengan doa bersama dan santap makan siang bersama seluruh hadirin.</p>
  `,
    coverImage: { url: '', alt: 'Maulid Nabi' },
    author: { name: 'Admin Sekolah' },
    category: 'kegiatan',
    tags: ['maulid', 'kegiatan', 'islami'],
    publishedAt: '2026-01-15',
    meta: { views: 234, readTime: 5, wordCount: 350 },
});

export async function generateMetadata({ params }: PageProps) {
    const blog = getBlog();
    return {
        title: `${blog.title} - MTs Maarif NU Sragi`,
        description: blog.excerpt,
    };
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const blog = getBlog();

    return (
        <div className="py-12">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Blog
                </Link>

                {/* Header */}
                <article>
                    <header className="mb-8">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">
                                {blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                            {blog.title}
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                            {blog.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pb-6 border-b border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span>{blog.author.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{blog.publishedAt}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{blog.meta.readTime} menit baca</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4" />
                                <span>{blog.meta.views} views</span>
                            </div>
                        </div>
                    </header>

                    {/* Cover Image */}
                    <div className="h-64 sm:h-96 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mb-8">
                        <span className="text-6xl">📚</span>
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-sky-600 prose-blockquote:border-sky-500 prose-blockquote:bg-sky-50 dark:prose-blockquote:bg-sky-900/20 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Tags */}
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex flex-wrap gap-2">
                            {blog.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Share */}
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Bagikan Artikel</h4>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                <Facebook className="w-4 h-4" />
                                Facebook
                            </Button>
                            <Button variant="outline" size="sm">
                                <Share2 className="w-4 h-4" />
                                Copy Link
                            </Button>
                        </div>
                    </div>
                </article>

                {/* Related Articles */}
                <section className="mt-16">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Artikel Terkait</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                        <Card hoverable>
                            <CardContent className="p-4">
                                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 mb-2 inline-block">
                                    prestasi
                                </span>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Juara 1 Lomba MTQ Tingkat Kabupaten</h4>
                                <p className="text-sm text-gray-500">2026-01-10</p>
                            </CardContent>
                        </Card>
                        <Card hoverable>
                            <CardContent className="p-4">
                                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 mb-2 inline-block">
                                    pengumuman
                                </span>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Jadwal UTS Semester Genap</h4>
                                <p className="text-sm text-gray-500">2026-01-05</p>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        </div>
    );
}
