import Link from 'next/link';
import { BookOpen, Users, Trophy, Newspaper, Image, Eye, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, Button } from '@/components/ui';

// Stats cards data
const stats = [
    { name: 'Total Ekskul', value: '12', icon: Users, color: 'sky', href: '/admin/ekskul' },
    { name: 'Total Blog', value: '45', icon: Newspaper, color: 'amber', href: '/admin/blog' },
    { name: 'Total Guru', value: '25', icon: BookOpen, color: 'violet', href: '/admin/guru' },
    { name: 'Total Prestasi', value: '78', icon: Trophy, color: 'emerald', href: '/admin/prestasi' },
];

const recentActivity = [
    { type: 'blog', title: 'Peringatan Maulid Nabi', time: '2 jam lalu', action: 'diterbitkan' },
    { type: 'ekskul', title: 'Pramuka', time: '5 jam lalu', action: 'diperbarui' },
    { type: 'prestasi', title: 'Juara MTQ', time: '1 hari lalu', action: 'ditambahkan' },
    { type: 'guru', title: 'Ustadz Ahmad', time: '2 hari lalu', action: 'diperbarui' },
];

const colorClasses: Record<string, string> = {
    sky: 'from-sky-500 to-blue-600',
    amber: 'from-amber-500 to-orange-600',
    violet: 'from-violet-500 to-purple-600',
    emerald: 'from-emerald-500 to-teal-600',
};

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">Selamat datang di panel admin MTs Maarif NU Sragi</p>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Link key={stat.name} href={stat.href}>
                        <Card hoverable className="overflow-hidden">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</p>
                                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                                    </div>
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[stat.color]} flex items-center justify-center`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Quick Stats */}
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-sky-500" />
                            Statistik Singkat
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Total Views Bulan Ini</span>
                                <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
                                    <Eye className="w-4 h-4" /> 1,234
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Blog Diterbitkan</span>
                                <span className="font-bold text-gray-900 dark:text-white">32</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Media Diupload</span>
                                <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
                                    <Image className="w-4 h-4" /> 156
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardContent className="p-6">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-amber-500" />
                            Aktivitas Terbaru
                        </h3>
                        <div className="space-y-3">
                            {recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                    <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
                                        <Newspaper className="w-4 h-4 text-sky-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{activity.title}</p>
                                        <p className="text-xs text-gray-500">{activity.action} • {activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardContent className="p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">Aksi Cepat</h3>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/admin/blog/baru"><Button variant="primary">+ Tulis Blog</Button></Link>
                        <Link href="/admin/ekskul/baru"><Button variant="secondary">+ Tambah Ekskul</Button></Link>
                        <Link href="/admin/prestasi/baru"><Button variant="secondary">+ Tambah Prestasi</Button></Link>
                        <Link href="/"><Button variant="outline">Lihat Website</Button></Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
