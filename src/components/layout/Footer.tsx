import Link from 'next/link';
import {
    MapPin,
    Phone,
    Mail,
    Facebook,
    Instagram,
    Youtube,
    Clock
} from 'lucide-react';

const quickLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Ekskul', href: '/ekskul' },
    { name: 'Blog', href: '/blog' },
    { name: 'Guru', href: '/guru' },
    { name: 'Prestasi', href: '/prestasi' },
    { name: 'Galeri', href: '/galeri' },
];

const infoLinks = [
    { name: 'Profil Sekolah', href: '/tentang' },
    { name: 'Visi & Misi', href: '/tentang#visi-misi' },
    { name: 'Kontak Kami', href: '/kontak' },
];

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* School Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-xl">M</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">MTs Maarif NU</h3>
                                <p className="text-sm text-gray-400">Sragi</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Madrasah Tsanawiyah yang berkomitmen untuk memberikan pendidikan
                            berkualitas dengan nilai-nilai Islam dan karakter yang kuat.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-sky-500 flex items-center justify-center transition-colors duration-200"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 flex items-center justify-center transition-all duration-200"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-red-500 flex items-center justify-center transition-colors duration-200"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Menu Utama</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Informasi</h4>
                        <ul className="space-y-3">
                            {infoLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Kontak</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-400 text-sm">
                                    Jl. Contoh No. 123, Sragi, Pekalongan, Jawa Tengah
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-sky-500 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">(0285) 123456</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-sky-500 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">info@mtsmaarifsragi.sch.id</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-sky-500 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">Senin - Sabtu: 07:00 - 14:00</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} MTs Maarif NU Sragi. All rights reserved.
                        </p>
                        <p className="text-gray-500 text-xs">
                            Dibuat dengan ❤️ untuk pendidikan yang lebih baik
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
