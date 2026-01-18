import Link from 'next/link';
import { ArrowRight, BookOpen, Trophy, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui';

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 text-sm font-medium mb-6 animate-fade-in">
                            <Star className="w-4 h-4" />
                            <span>Selamat Datang di Website Resmi</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                            <span className="block">MTs Maarif NU</span>
                            <span className="block bg-gradient-to-r from-sky-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                                Sragi
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                            Membentuk generasi berilmu, berakhlak mulia, dan berprestasi
                            dengan pendidikan berkualitas berdasarkan nilai-nilai Islam.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/tentang">
                                <Button variant="primary" size="lg">
                                    Kenali Kami
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>
                            <Link href="/kontak">
                                <Button variant="outline" size="lg">
                                    Hubungi Kami
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">500+</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Siswa Aktif</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">50+</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Guru & Staff</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">100+</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Prestasi</div>
                            </div>
                        </div>
                    </div>

                    {/* Image/Illustration Section */}
                    <div className="relative hidden lg:block">
                        <div className="relative z-10">
                            {/* Main Card */}
                            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <BookOpen className="w-12 h-12 text-white" />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Pendidikan Berkualitas
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-6">
                                    Kurikulum modern dengan nilai-nilai Islam untuk membentuk
                                    karakter siswa yang unggul.
                                </p>

                                {/* Feature List */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">Kurikulum Merdeka</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                                            <Trophy className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">Prestasi Gemilang</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900 flex items-center justify-center">
                                            <Users className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">Guru Profesional</span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Cards */}
                            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border border-gray-100 dark:border-gray-700 animate-bounce-subtle">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                                        <Trophy className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900 dark:text-white">Akreditasi A</div>
                                        <div className="text-xs text-gray-500">Terakreditasi</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
