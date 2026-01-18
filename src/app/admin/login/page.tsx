'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, Eye, EyeOff } from 'lucide-react';
import { Button, Card, CardContent, Input, Label } from '@/components/ui';

export default function AdminLoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({ username: '', password: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!data.success) {
                setError(data.message);
                return;
            }

            router.push('/admin/dashboard');
        } catch {
            setError('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-xl mb-4">
                        <span className="text-2xl font-bold text-white">M</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">MTs Maarif NU Sragi</p>
                </div>

                <Card className="shadow-xl">
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label required>Username</Label>
                                <Input
                                    icon={<User className="w-4 h-4" />}
                                    placeholder="Masukkan username"
                                    value={form.username}
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label required>Password</Label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        icon={<Lock className="w-4 h-4" />}
                                        placeholder="Masukkan password"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" size="lg" className="w-full" isLoading={isLoading}>
                                Masuk
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="text-center text-sm text-gray-500 mt-6">
                    &copy; {new Date().getFullYear()} MTs Maarif NU Sragi
                </p>
            </div>
        </div>
    );
}
