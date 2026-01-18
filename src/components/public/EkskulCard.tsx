import Link from 'next/link';
import Image from 'next/image';
import { Clock, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import { IEkskul } from '@/lib/database/models';

interface EkskulCardProps {
    ekskul: IEkskul;
}

export function EkskulCard({ ekskul }: EkskulCardProps) {
    const featuredImage = ekskul.images.find(img => img.isFeatured) || ekskul.images[0];
    const firstSchedule = ekskul.jadwal[0];

    return (
        <Link href={`/ekskul/${ekskul.slug}`}>
            <Card hoverable className="h-full overflow-hidden group">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    {featuredImage ? (
                        <Image
                            src={featuredImage.url}
                            alt={ekskul.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                            <span className="text-4xl font-bold text-white/30">
                                {ekskul.title.charAt(0)}
                            </span>
                        </div>
                    )}

                    {/* Featured Badge */}
                    {ekskul.featured && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                            Unggulan
                        </div>
                    )}
                </div>

                <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {ekskul.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                        {ekskul.description}
                    </p>

                    <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                        {firstSchedule && (
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{firstSchedule.hari}, {firstSchedule.jamMulai} - {firstSchedule.jamSelesai}</span>
                            </div>
                        )}

                        {firstSchedule?.tempat && (
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{firstSchedule.tempat}</span>
                            </div>
                        )}

                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{ekskul.peserta}/{ekskul.kuota || '∞'} Anggota</span>
                        </div>
                    </div>

                    {/* Pembina */}
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Pembina: <span className="font-medium text-gray-700 dark:text-gray-300">{ekskul.pembina}</span>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
