import Link from 'next/link';
import { ArrowRight, BookOpen, Trophy, Users, Heart, GraduationCap, Sparkles } from 'lucide-react';
import { HeroSection } from '@/components/public';
import { Button, Card, CardContent } from '@/components/ui';

// Placeholder data - akan diganti dengan data dari API
const featuredEkskul = [
    { id: 1, title: 'Pramuka', slug: 'pramuka', description: 'Kegiatan kepanduan yang membentuk karakter dan kedisiplinan siswa.', pembina: 'Ustadz Ahmad', peserta: 120 },
    { id: 2, title: 'Tahfidz Quran', slug: 'tahfidz', description: 'Program menghafal Al-Quran dengan metode yang efektif dan menyenangkan.', pembina: 'Ustadz Muhammad', peserta: 80 },
    { id: 3, title: 'Seni Hadrah', slug: 'hadrah', description: 'Seni musik Islami yang memadukan rebana dengan sholawat.', pembina: 'Ustadz Hasan', peserta: 45 },
];

const recentNews = [
    { id: 1, title: 'Peringatan Maulid Nabi Muhammad SAW', slug: 'maulid-nabi', excerpt: 'Kegiatan peringatan Maulid Nabi yang dihadiri seluruh siswa dan wali murid.', category: 'kegiatan', date: '2026-01-15' },
    { id: 2, title: 'Juara Lomba MTQ Tingkat Kabupaten', slug: 'juara-mtq', excerpt: 'Siswa MTs Maarif NU Sragi berhasil meraih juara dalam lomba MTQ.', category: 'prestasi', date: '2026-01-10' },
    { id: 3, title: 'Pengumuman Jadwal UTS Semester Genap', slug: 'jadwal-uts', excerpt: 'Berikut jadwal Ujian Tengah Semester untuk semester genap.', category: 'pengumuman', date: '2026-01-05' },
];

const features = [
    { icon: BookOpen, title: 'Kurikulum Modern', description: 'Kurikulum Merdeka dengan integrasi nilai-nilai Islam' },
    { icon: Trophy, title: 'Prestasi Gemilang', description: 'Ratusan prestasi di berbagai bidang akademik dan non-akademik' },
    { icon: Users, title: 'Guru Profesional', description: 'Tenaga pendidik berkualitas dengan dedikasi tinggi' },
    { icon: Heart, title: 'Karakter Islami', description: 'Pembentukan akhlak mulia melalui pembiasaan sehari-hari' },
    { icon: GraduationCap, title: 'Lulusan Berkualitas', description: 'Alumni yang sukses melanjutkan ke jenjang pendidikan tinggi' },
    { icon: Sparkles, title: 'Fasilitas Lengkap', description: 'Sarana prasarana modern untuk menunjang pembelajaran' },
];

export default function HomePage() {
    return (
        <div>
            {/* Hero Section */}
            <HeroSection />

            {/* Features Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-sm font-medium rounded-full mb-4">
                            Keunggulan Kami
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Mengapa Memilih MTs Maarif NU Sragi?
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Kami berkomitmen memberikan pendidikan terbaik dengan mengedepankan
                            nilai-nilai Islam dan pengembangan karakter.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} variant="glass" hoverable className="p-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Ekskul Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-sky-50 dark:from-gray-800 dark:to-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
                        <div>
                            <span className="inline-block px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-medium rounded-full mb-4">
                                Ekstrakurikuler
                            </span>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Kegiatan Pilihan Siswa
                            </h2>
                        </div>
                        <Link href="/ekskul">
                            <Button variant="outline">
                                Lihat Semua <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredEkskul.map((ekskul) => (
                            <Link key={ekskul.id} href={`/ekskul/${ekskul.slug}`}>
                                <Card hoverable className="h-full overflow-hidden group">
                                    <div className="h-40 bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                                        <span className="text-5xl font-bold text-white/30">{ekskul.title.charAt(0)}</span>
                                    </div>
                                    <CardContent className="p-5">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-sky-600 transition-colors">
                                            {ekskul.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                                            {ekskul.description}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <span>Pembina: {ekskul.pembina}</span>
                                            <span>{ekskul.peserta} Anggota</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* News Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
                        <div>
                            <span className="inline-block px-4 py-1.5 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-sm font-medium rounded-full mb-4">
                                Berita & Informasi
                            </span>
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Kabar Terbaru
                            </h2>
                        </div>
                        <Link href="/blog">
                            <Button variant="outline">
                                Lihat Semua <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentNews.map((news) => (
                            <Link key={news.id} href={`/blog/${news.slug}`}>
                                <Card hoverable className="h-full overflow-hidden group">
                                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                                        <BookOpen className="w-12 h-12 text-gray-400" />
                                    </div>
                                    <CardContent className="p-5">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300">
                                                {news.category}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-sky-600 transition-colors line-clamp-2">
                                            {news.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                                            {news.excerpt}
                                        </p>
                                        <p className="text-xs text-gray-500">{news.date}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-sky-500 via-blue-600 to-violet-600">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Bergabunglah Bersama Kami
                    </h2>
                    <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
                        Mari wujudkan generasi yang berilmu, berakhlak mulia, dan berprestasi bersama MTs Maarif NU Sragi.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/kontak">
                            <Button size="lg" className="bg-white text-sky-600 hover:bg-gray-100">
                                Hubungi Kami
                            </Button>
                        </Link>
                        <Link href="/tentang">
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                                Pelajari Lebih Lanjut
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
