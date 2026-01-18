import Link from 'next/link';
import { ArrowLeft, Trophy, Medal, Award, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';

// Placeholder data
const prestasiList = [
    { id: 1, nama: 'Muhammad Alif', prestasi: 'Juara 1 MTQ', event: 'MTQ Tingkat Kabupaten', tingkat: 'kabupaten', kategori: 'Akademik', tahun: 2026 },
    { id: 2, nama: 'Fatimah Azzahra', prestasi: 'Juara 2 Pidato Bahasa Arab', event: 'Lomba Bahasa Arab', tingkat: 'provinsi', kategori: 'Akademik', tahun: 2026 },
    { id: 3, nama: 'Team Pramuka', prestasi: 'Juara 1 Lomba Pionering', event: 'Jambore Pramuka', tingkat: 'kabupaten', kategori: 'Non-Akademik', tahun: 2025 },
    { id: 4, nama: 'Tim Futsal', prestasi: 'Juara 3 Futsal', event: 'Turnamen Antar MTs', tingkat: 'kecamatan', kategori: 'Olahraga', tahun: 2025 },
    { id: 5, nama: 'Ahmad Faiz', prestasi: 'Juara 1 Kaligrafi', event: 'Festival Seni Islami', tingkat: 'nasional', kategori: 'Seni', tahun: 2025 },
    { id: 6, nama: 'Siti Maryam', prestasi: 'Juara 2 Tahfidz 5 Juz', event: 'Musabaqah Hifdzil Quran', tingkat: 'provinsi', kategori: 'Keagamaan', tahun: 2025 },
];

const tingkatColors: Record<string, string> = {
    sekolah: 'bg-gray-100 text-gray-700',
    kecamatan: 'bg-blue-100 text-blue-700',
    kabupaten: 'bg-emerald-100 text-emerald-700',
    provinsi: 'bg-amber-100 text-amber-700',
    nasional: 'bg-purple-100 text-purple-700',
    internasional: 'bg-rose-100 text-rose-700',
};

const tingkatIcons: Record<string, React.ReactNode> = {
    sekolah: <Award className="w-5 h-5" />,
    kecamatan: <Medal className="w-5 h-5" />,
    kabupaten: <Medal className="w-5 h-5" />,
    provinsi: <Trophy className="w-5 h-5" />,
    nasional: <Trophy className="w-5 h-5" />,
    internasional: <Star className="w-5 h-5" />,
};

export const metadata = {
    title: 'Prestasi - MTs Maarif NU Sragi',
    description: 'Daftar prestasi siswa, guru, dan sekolah MTs Maarif NU Sragi',
};

export default function PrestasiPage() {
    const prestasiByYear = prestasiList.reduce((acc, p) => {
        if (!acc[p.tahun]) acc[p.tahun] = [];
        acc[p.tahun].push(p);
        return acc;
    }, {} as Record<number, typeof prestasiList>);

    const years = Object.keys(prestasiByYear).sort((a, b) => Number(b) - Number(a));

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
                        🏆 Prestasi
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Prestasi Membanggakan
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                        Capaian gemilang siswa dan sekolah dalam berbagai kompetisi dan lomba.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
                    <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-purple-600">{prestasiList.filter(p => p.tingkat === 'nasional').length}</div>
                            <div className="text-xs text-gray-500">Nasional</div>
                        </CardContent>
                    </Card>
                    <Card className="text-center bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-amber-600">{prestasiList.filter(p => p.tingkat === 'provinsi').length}</div>
                            <div className="text-xs text-gray-500">Provinsi</div>
                        </CardContent>
                    </Card>
                    <Card className="text-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-emerald-600">{prestasiList.filter(p => p.tingkat === 'kabupaten').length}</div>
                            <div className="text-xs text-gray-500">Kabupaten</div>
                        </CardContent>
                    </Card>
                    <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                        <CardContent className="p-4">
                            <div className="text-2xl font-bold text-blue-600">{prestasiList.length}</div>
                            <div className="text-xs text-gray-500">Total</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Prestasi by Year */}
                {years.map((year) => (
                    <div key={year} className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <span className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center text-sky-600 dark:text-sky-400 text-sm font-bold">
                                {year.slice(2)}
                            </span>
                            Tahun {year}
                        </h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {prestasiByYear[Number(year)].map((prestasi) => (
                                <Card key={prestasi.id} hoverable>
                                    <CardContent className="p-5">
                                        <div className="flex items-start justify-between mb-3">
                                            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${tingkatColors[prestasi.tingkat]}`}>
                                                {tingkatIcons[prestasi.tingkat]}
                                                {prestasi.tingkat.charAt(0).toUpperCase() + prestasi.tingkat.slice(1)}
                                            </span>
                                            <span className="text-xs text-gray-500">{prestasi.kategori}</span>
                                        </div>

                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                            {prestasi.prestasi}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                            {prestasi.event}
                                        </p>

                                        <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
                                            <p className="text-sm text-gray-500">
                                                <span className="font-medium">Peraih:</span> {prestasi.nama}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
