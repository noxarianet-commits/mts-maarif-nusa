import Link from 'next/link';
import { ArrowLeft, Clock, MapPin, Users, Calendar } from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';

// Placeholder data
const ekskulList = [
    {
        id: 1,
        title: 'Pramuka',
        slug: 'pramuka',
        description: 'Kegiatan kepanduan yang membentuk karakter dan kedisiplinan siswa melalui berbagai aktivitas outdoor dan kepemimpinan.',
        pembina: 'Ustadz Ahmad Fauzi',
        peserta: 120,
        kuota: 150,
        jadwal: [{ hari: 'Jumat', jamMulai: '14:00', jamSelesai: '16:00', tempat: 'Lapangan Sekolah' }],
        featured: true
    },
    {
        id: 2,
        title: 'Tahfidz Quran',
        slug: 'tahfidz',
        description: 'Program menghafal Al-Quran dengan metode yang efektif dan menyenangkan untuk para santri.',
        pembina: 'Ustadz Muhammad Ridwan',
        peserta: 80,
        kuota: 100,
        jadwal: [{ hari: 'Senin', jamMulai: '07:00', jamSelesai: '08:00', tempat: 'Masjid Sekolah' }],
        featured: true
    },
    {
        id: 3,
        title: 'Seni Hadrah',
        slug: 'hadrah',
        description: 'Seni musik Islami yang memadukan rebana dengan sholawat nabi dalam pertunjukan yang indah.',
        pembina: 'Ustadz Hasan Basri',
        peserta: 45,
        kuota: 60,
        jadwal: [{ hari: 'Rabu', jamMulai: '15:00', jamSelesai: '17:00', tempat: 'Aula Sekolah' }],
        featured: false
    },
    {
        id: 4,
        title: 'Futsal',
        slug: 'futsal',
        description: 'Olahraga sepak bola dalam ruangan untuk mengembangkan bakat dan kebugaran siswa.',
        pembina: 'Bapak Darmawan',
        peserta: 35,
        kuota: 40,
        jadwal: [{ hari: 'Sabtu', jamMulai: '08:00', jamSelesai: '10:00', tempat: 'Lapangan Futsal' }],
        featured: false
    },
    {
        id: 5,
        title: 'English Club',
        slug: 'english-club',
        description: 'Klub bahasa Inggris untuk meningkatkan kemampuan speaking dan writing siswa.',
        pembina: 'Ibu Sarah Fatimah',
        peserta: 55,
        kuota: 80,
        jadwal: [{ hari: 'Kamis', jamMulai: '14:00', jamSelesai: '15:30', tempat: 'Lab Bahasa' }],
        featured: false
    },
    {
        id: 6,
        title: 'Kaligrafi',
        slug: 'kaligrafi',
        description: 'Seni menulis indah huruf Arab yang mengasah kreativitas dan ketelitian siswa.',
        pembina: 'Ustadz Ibrahim',
        peserta: 30,
        kuota: 40,
        jadwal: [{ hari: 'Selasa', jamMulai: '15:00', jamSelesai: '16:30', tempat: 'Ruang Seni' }],
        featured: false
    },
];

export const metadata = {
    title: 'Ekstrakurikuler - MTs Maarif NU Sragi',
    description: 'Daftar kegiatan ekstrakurikuler di MTs Maarif NU Sragi',
};

export default function EkskulPage() {
    return (
        <div className="py-12">
            {/* Header */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Beranda
                </Link>

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div>
                        <span className="inline-block px-4 py-1.5 bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-sm font-medium rounded-full mb-4">
                            Ekstrakurikuler
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Kegiatan Ekstrakurikuler
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                            Berbagai kegiatan ekstrakurikuler untuk mengembangkan bakat, minat, dan karakter siswa.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-medium">{ekskulList.length}</span> Kegiatan tersedia
                    </div>
                </div>
            </div>

            {/* Featured Section */}
            {ekskulList.filter(e => e.featured).length > 0 && (
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-12">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        ⭐ Ekskul Unggulan
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {ekskulList.filter(e => e.featured).map((ekskul) => (
                            <Link key={ekskul.id} href={`/ekskul/${ekskul.slug}`}>
                                <Card hoverable className="h-full overflow-hidden group bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border-sky-200 dark:border-sky-800">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 mb-2">
                                                    Unggulan
                                                </span>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-sky-600 transition-colors">
                                                    {ekskul.title}
                                                </h3>
                                            </div>
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                                                <span className="text-xl font-bold text-white">{ekskul.title.charAt(0)}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                                            {ekskul.description}
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Users className="w-4 h-4" />
                                                <span>{ekskul.peserta}/{ekskul.kuota} Anggota</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Clock className="w-4 h-4" />
                                                <span>{ekskul.jadwal[0]?.hari}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <MapPin className="w-4 h-4" />
                                                <span>{ekskul.jadwal[0]?.tempat}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-500">
                                                <Calendar className="w-4 h-4" />
                                                <span>{ekskul.jadwal[0]?.jamMulai}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <p className="text-sm text-gray-500">
                                                <span className="font-medium">Pembina:</span> {ekskul.pembina}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* All Ekskul Grid */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                    Semua Ekstrakurikuler
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ekskulList.map((ekskul) => (
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

                                    <div className="space-y-2 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{ekskul.jadwal[0]?.hari}, {ekskul.jadwal[0]?.jamMulai}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            <span>{ekskul.peserta} Anggota</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
                <Card className="bg-gradient-to-r from-sky-500 to-blue-600 border-0 overflow-hidden">
                    <CardContent className="p-8 sm:p-12 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Tertarik Bergabung?
                        </h3>
                        <p className="text-white/80 mb-6 max-w-xl mx-auto">
                            Hubungi kami untuk informasi lebih lanjut tentang pendaftaran kegiatan ekstrakurikuler.
                        </p>
                        <Link href="/kontak">
                            <Button size="lg" className="bg-white text-sky-600 hover:bg-gray-100">
                                Hubungi Kami
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
