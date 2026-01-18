'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Beranda', href: '/' },
    { name: 'Ekskul', href: '/ekskul' },
    { name: 'Blog', href: '/blog' },
    { name: 'Guru', href: '/guru' },
    { name: 'Prestasi', href: '/prestasi' },
    { name: 'Galeri', href: '/galeri' },
    {
        name: 'Tentang',
        href: '/tentang',
        children: [
            { name: 'Profil Sekolah', href: '/tentang' },
            { name: 'Visi & Misi', href: '/tentang#visi-misi' },
            { name: 'Kontak', href: '/kontak' },
        ],
    },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Global">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                                <span className="text-white font-bold text-lg">M</span>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                                    MTs Maarif NU
                                </h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-0.5">
                                    Sragi
                                </p>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:items-center lg:gap-1">
                        {navigation.map((item) => (
                            <div
                                key={item.name}
                                className="relative"
                                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                                        'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
                                        'dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                                    )}
                                >
                                    {item.name}
                                    {item.children && <ChevronDown className="w-4 h-4" />}
                                </Link>

                                {/* Dropdown */}
                                {item.children && activeDropdown === item.name && (
                                    <div className="absolute top-full left-0 mt-1 w-48 rounded-xl bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800 py-2 animate-in fade-in slide-in-from-top-2">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.name}
                                                href={child.href}
                                                className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
                                            >
                                                {child.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Admin Login */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link
                            href="/admin/login"
                            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:from-sky-600 hover:to-blue-700"
                        >
                            Admin Login
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 animate-in slide-in-from-top-2">
                        <div className="space-y-1">
                            {navigation.map((item) => (
                                <div key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="block px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 rounded-lg"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                    {item.children && (
                                        <div className="ml-4 space-y-1">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className="block px-4 py-2 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 rounded-lg"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Link
                                href="/admin/login"
                                className="block w-full mt-4 px-4 py-2 text-center text-sm font-medium text-white bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Admin Login
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
