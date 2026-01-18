import Link from 'next/link';
import { ArrowLeft, Mail, Phone, GraduationCap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import { getInitials } from '@/lib/utils';

// Placeholder data
const guruList = [
    { id: 1, nama: 'Drs. H. Muhammad Ridwan, M.Pd', jabatan: ['Kepala Sekolah'], bidang: ['Fiqih'], status: 'aktif' },
    { id: 2, nama: 'Hj. Siti Aminah, S.Ag', jabatan: ['Wakil Kepala Kurikulum'], bidang: ['Bahasa Arab'], status: 'aktif' },
    { id: 3, nama: 'Ahmad Fauzi, S.Pd.I', jabatan: ['Wakil Kepala Kesiswaan'], bidang: ['Aqidah Akhlak'], status: 'aktif' },
    { id: 4, nama: 'Hasan Basri, S.Pd', jabatan: ['Guru'], bidang: ['Matematika'], status: 'aktif' },
    { id: 5, nama: 'Sarah Fatimah, S.Pd', jabatan: ['Guru'], bidang: ['Bahasa Inggris'], status: 'aktif' },
    { id: 6, nama: 'Muhammad Yusuf, S.Pd', jabatan: ['Guru'], bidang: ['IPA'], status: 'aktif' },
    { id: 7, nama: 'Fatimah Azzahra, S.Pd', jabatan: ['Guru'], bidang: ['Bahasa Indonesia'], status: 'aktif' },
    { id: 8, nama: 'Ibrahim Al-Ghazali, S.Pd.I', jabatan: ['Guru'], bidang: ['Al-Quran Hadits'], status: 'aktif' },
];

const kepalaSekolah = guruList.find(g => g.jabatan.includes('Kepala Sekolah'));
const wakilKepala = guruList.filter(g => g.jabatan.some(j => j.includes('Wakil')));
const guruBiasa = guruList.filter(g => !g.jabatan.includes('Kepala Sekolah') && !g.jabatan.some(j => j.includes('Wakil')));

export const metadata = {
    title: 'Profil Guru - MTs Maarif NU Sragi',
    description: 'Daftar guru dan tenaga pendidik di MTs Maarif NU Sragi',
};

export default function GuruPage() {
    return (
        <div className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Beranda
                </Link>

                <div className="mb-12">
                    <span className="inline-block px-4 py-1.5 bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300 text-sm font-medium rounded-full mb-4">
                        Tenaga Pendidik
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Profil Guru & Staff
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                        Tenaga pendidik berkualitas dengan dedikasi tinggi untuk mencerdaskan generasi bangsa.
                    </p>
                </div>

                {/* Kepala Sekolah */}
                {kepalaSekolah && (
                    <div className="mb-12">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Kepala Sekolah</h2>
                        <Card className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border-sky-200 dark:border-sky-800">
                            <CardContent className="p-8">
                                <div className="flex flex-col sm:flex-row items-center gap-6">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-xl">
                                        <span className="text-4xl font-bold text-white">
                                            {getInitials(kepalaSekolah.nama)}
                                        </span>
                                    </div>
                                    <div className="text-center sm:text-left">
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                            {kepalaSekolah.nama}
                                        </h3>
                                        <p className="text-lg text-sky-600 dark:text-sky-400 font-medium mb-2">
                                            {kepalaSekolah.jabatan.join(', ')}
                                        </p>
                                        <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                                            {kepalaSekolah.bidang.map((b, i) => (
                                                <span key={i} className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                                    {b}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Wakil Kepala */}
                {wakilKepala.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Wakil Kepala Sekolah</h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {wakilKepala.map((guru) => (
                                <Card key={guru.id} hoverable className="text-center">
                                    <CardContent className="p-6">
                                        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mb-4 shadow-lg">
                                            <span className="text-2xl font-bold text-white">
                                                {getInitials(guru.nama)}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                            {guru.nama}
                                        </h3>
                                        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-3">
                                            {guru.jabatan.join(', ')}
                                        </p>
                                        <div className="flex flex-wrap justify-center gap-1">
                                            {guru.bidang.map((b, i) => (
                                                <span key={i} className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                                    {b}
                                                </span>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Guru */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Dewan Guru</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {guruBiasa.map((guru) => (
                            <Card key={guru.id} hoverable className="text-center">
                                <CardContent className="p-5">
                                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center mb-3 shadow">
                                        <span className="text-xl font-bold text-white">
                                            {getInitials(guru.nama)}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                                        {guru.nama}
                                    </h3>
                                    <div className="flex flex-wrap justify-center gap-1">
                                        {guru.bidang.map((b, i) => (
                                            <span key={i} className="px-2 py-0.5 text-xs font-medium rounded-full bg-sky-100 dark:bg-sky-900 text-sky-600 dark:text-sky-400">
                                                {b}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-16 grid sm:grid-cols-3 gap-6">
                    <Card className="text-center bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20">
                        <CardContent className="p-6">
                            <GraduationCap className="w-10 h-10 mx-auto text-sky-600 mb-3" />
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">{guruList.length}</div>
                            <div className="text-sm text-gray-500">Total Guru</div>
                        </CardContent>
                    </Card>
                    <Card className="text-center bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
                        <CardContent className="p-6">
                            <Mail className="w-10 h-10 mx-auto text-emerald-600 mb-3" />
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">85%</div>
                            <div className="text-sm text-gray-500">S1/S2</div>
                        </CardContent>
                    </Card>
                    <Card className="text-center bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20">
                        <CardContent className="p-6">
                            <Phone className="w-10 h-10 mx-auto text-violet-600 mb-3" />
                            <div className="text-3xl font-bold text-gray-900 dark:text-white">15+</div>
                            <div className="text-sm text-gray-500">Tahun Pengalaman</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
