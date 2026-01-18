import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import { IGuru } from '@/lib/database/models';
import { getInitials } from '@/lib/utils';

interface GuruCardProps {
    guru: IGuru;
}

export function GuruCard({ guru }: GuruCardProps) {
    return (
        <Card hoverable className="h-full overflow-hidden group text-center">
            {/* Photo */}
            <div className="relative pt-8 pb-4">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-800 shadow-xl">
                    {guru.foto?.url ? (
                        <Image
                            src={guru.foto.url}
                            alt={guru.nama}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">
                                {getInitials(guru.nama)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                    {guru.status === 'aktif' ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                            Aktif
                        </span>
                    ) : (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                            {guru.status}
                        </span>
                    )}
                </div>
            </div>

            <CardContent className="p-5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-sky-600 transition-colors">
                    {guru.nama}
                </h3>

                {/* Jabatan */}
                {guru.jabatan.length > 0 && (
                    <p className="text-sm font-medium text-sky-600 dark:text-sky-400 mb-2">
                        {guru.jabatan.join(', ')}
                    </p>
                )}

                {/* Bidang */}
                {guru.bidang.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1 mb-4">
                        {guru.bidang.slice(0, 3).map((bidang, index) => (
                            <span
                                key={index}
                                className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                            >
                                {bidang}
                            </span>
                        ))}
                        {guru.bidang.length > 3 && (
                            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                                +{guru.bidang.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Bio */}
                {guru.bio && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                        {guru.bio}
                    </p>
                )}

                {/* Contact */}
                {(guru.kontak?.email || guru.kontak?.telepon) && (
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800 space-y-2">
                        {guru.kontak.email && (
                            <a
                                href={`mailto:${guru.kontak.email}`}
                                className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-sky-600 transition-colors"
                            >
                                <Mail className="w-4 h-4" />
                                <span className="truncate">{guru.kontak.email}</span>
                            </a>
                        )}
                        {guru.kontak.telepon && (
                            <a
                                href={`tel:${guru.kontak.telepon}`}
                                className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-sky-600 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                <span>{guru.kontak.telepon}</span>
                            </a>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
