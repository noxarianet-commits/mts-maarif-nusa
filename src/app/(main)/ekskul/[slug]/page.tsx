import Link from 'next/link';
import { ArrowLeft, Clock, MapPin, Users, Calendar, Share2, Heart } from 'lucide-react';
import { Button, Card, CardContent } from '@/components/ui';

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Placeholder data - akan diganti dengan fetch dari database
const getEkskul = () => ({
    id: 1,
    title: 'Pramuka',
    slug: 'pramuka',
    description: 'Kegiatan kepanduan yang membentuk karakter dan kedisiplinan siswa.',
    content: `
    <p>Pramuka adalah kegiatan ekstrakurikuler wajib yang bertujuan untuk membentuk karakter, kedisiplinan, dan jiwa kepemimpinan siswa. Melalui berbagai aktivitas outdoor dan indoor, siswa belajar tentang kerjasama tim, ketahanan, dan nilai-nilai luhur bangsa.</p>
    
    <h3>Kegiatan Rutin</h3>
    <ul>
      <li>Latihan baris-berbaris</li>
      <li>Perkemahan</li>
      <li>Hiking dan outbound</li>
      <li>Tali temali</li>
      <li>Pertolongan pertama</li>
    </ul>
    
    <h3>Prestasi</h3>
    <p>Tim Pramuka MTs Maarif NU Sragi telah meraih berbagai prestasi di tingkat kecamatan, kabupaten, hingga provinsi dalam berbagai lomba kepramukaan.</p>
  `,
    images: [],
    pembina: 'Ustadz Ahmad Fauzi, S.Pd',
    ketua: 'Muhammad Alif (Kelas 9A)',
    wakil: 'Fatimah Azzahra (Kelas 9B)',
    jadwal: [
        { hari: 'Jumat', jamMulai: '14:00', jamSelesai: '16:00', tempat: 'Lapangan Sekolah' },
    ],
    kuota: 150,
    peserta: 120,
    featured: true,
    meta: { views: 1250, likes: 45. },
});

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const ekskul = getEkskul();
    return {
        title: `${ekskul.title} - Ekstrakurikuler MTs Maarif NU Sragi`,
        description: ekskul.description,
    };
}

export default async function EkskulDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const ekskul = getEkskul();

    return (
        <div className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <Link href="/ekskul" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Ekskul
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Header Image */}
                        <div className="h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center mb-8 shadow-xl">
                            <span className="text-8xl font-bold text-white/30">{ekskul.title.charAt(0)}</span>
                        </div>

                        {/* Title */}
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                {ekskul.featured && (
                                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700 mb-3">
                                        ⭐ Ekskul Unggulan
                                    </span>
                                )}
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                    {ekskul.title}
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-400">
                                    {ekskul.description}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 mb-8">
                            <Button variant="primary">
                                <Heart className="w-4 h-4" />
                                Minat ({(ekskul.meta.likes as number)})
                            </Button>
                            <Button variant="outline">
                                <Share2 className="w-4 h-4" />
                                Bagikan
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <div dangerouslySetInnerHTML={{ __html: ekskul.content }} />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Info Card */}
                        <Card className="sticky top-24">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                    Informasi Ekskul
                                </h3>

                                <div className="space-y-4">
                                    {/* Schedule */}
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Jadwal Kegiatan</h4>
                                        {ekskul.jadwal.map((jadwal, index) => (
                                            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Calendar className="w-4 h-4 text-sky-500" />
                                                    <span className="font-medium">{jadwal.hari}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{jadwal.jamMulai} - {jadwal.jamSelesai}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>{jadwal.tempat}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Members */}
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Anggota</h4>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Users className="w-4 h-4 text-sky-500" />
                                            <span className="font-medium">{ekskul.peserta}</span>
                                            <span className="text-gray-500">/ {ekskul.kuota} kuota</span>
                                        </div>
                                        <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full"
                                                style={{ width: `${(ekskul.peserta / ekskul.kuota) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Pembina */}
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Pembina</h4>
                                        <p className="font-medium text-gray-900 dark:text-white">{ekskul.pembina}</p>
                                    </div>

                                    {/* Pengurus */}
                                    {(ekskul.ketua || ekskul.wakil) && (
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 mb-2">Pengurus</h4>
                                            {ekskul.ketua && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    <span className="font-medium">Ketua:</span> {ekskul.ketua}
                                                </p>
                                            )}
                                            {ekskul.wakil && (
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    <span className="font-medium">Wakil:</span> {ekskul.wakil}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    {/* Stats */}
                                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                        <p className="text-sm text-gray-500">
                                            👁️ {ekskul.meta.views} kali dilihat
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
