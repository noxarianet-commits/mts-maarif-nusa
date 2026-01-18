'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import {
    LayoutDashboard, Users, BookOpen, Trophy, Image, Settings, LogOut,
    Menu, X, ChevronRight, GraduationCap, Newspaper
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Ekskul', href: '/admin/ekskul', icon: Users },
    { name: 'Blog', href: '/admin/blog', icon: Newspaper },
    { name: 'Guru', href: '/admin/guru', icon: GraduationCap },
    { name: 'Prestasi', href: '/admin/prestasi', icon: Trophy },
    { name: 'Media', href: '/admin/media', icon: Image },
    { name: 'Pengaturan', href: '/admin/pengaturan', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Mobile sidebar toggle */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b px-4 h-14 flex items-center justify-between">
                <button onClick={() => setSidebarOpen(true)} className="p-2">
                    <Menu className="w-6 h-6" />
                </button>
                <span className="font-bold">Admin Panel</span>
                <div className="w-10" />
            </div>

            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform lg:translate-x-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="h-16 flex items-center justify-between px-4 border-b">
                        <Link href="/admin/dashboard" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold">M</span>
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white">Admin Panel</span>
                        </Link>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                        {navigation.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400"
                                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.name}
                                    {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            <LogOut className="w-5 h-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main content */}
            <main className="lg:pl-64 pt-14 lg:pt-0 min-h-screen">
                <div className="p-6">{children}</div>
            </main>
        </div>
    );
}
