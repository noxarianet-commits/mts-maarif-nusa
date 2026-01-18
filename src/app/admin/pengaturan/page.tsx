'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; // Need to check if available or implement basic tabs

interface Setting {
    _id: string;
    key: string;
    value: string;
    label: string;
    type: 'text' | 'number' | 'boolean' | 'textarea' | 'image' | 'json';
    kategori: string;
    description?: string;
}

export default function PengaturanPage() {
    const router = useRouter();
    const [settings, setSettings] = useState<Setting[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/pengaturan');
            const json = await res.json();
            if (json.success) {
                setSettings(json.data);
                // Initialize form data
                const initialData: Record<string, any> = {};
                json.data.forEach((s: Setting) => {
                    initialData[s.key] = s.value;
                });
                setFormData(initialData);
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/pengaturan', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const json = await res.json();
            if (json.success) {
                alert('Settings saved successfully');
                router.refresh();
            } else {
                alert('Failed to save settings');
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('Error saving settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    // Group settings by category
    const groupedSettings = settings.reduce((acc, setting) => {
        const cat = setting.kategori || 'umum';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(setting);
        return acc;
    }, {} as Record<string, Setting[]>);

    const categories = Object.keys(groupedSettings);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Pengaturan</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Manage website configuration and settings.
                </p>
            </div>

            {settings.length === 0 ? (
                <div className="p-12 text-center bg-gray-50 rounded-xl">
                    <p className="text-gray-500">No settings found in database. Please seed the database first.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl border dark:border-gray-700 shadow-sm p-6">
                    <div className="flex flex-col gap-6">
                        {categories.map(cat => (
                            <div key={cat} className="space-y-4">
                                <h3 className="text-lg font-semibold capitalize border-b pb-2">{cat}</h3>
                                <div className="grid gap-4">
                                    {groupedSettings[cat].map(setting => (
                                        <div key={setting.key} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                                            <Label htmlFor={setting.key} className="md:pt-2 md:col-span-1 text-base">
                                                {setting.label}
                                            </Label>
                                            <div className="md:col-span-3">
                                                {setting.type === 'textarea' ? (
                                                    <Textarea
                                                        id={setting.key}
                                                        value={formData[setting.key] || ''}
                                                        onChange={(e) => handleChange(setting.key, e.target.value)}
                                                        rows={4}
                                                    />
                                                ) : (
                                                    <Input
                                                        id={setting.key}
                                                        type={setting.type === 'number' ? 'number' : 'text'}
                                                        value={formData[setting.key] || ''}
                                                        onChange={(e) => handleChange(setting.key, e.target.value)}
                                                    />
                                                )}
                                                {setting.description && (
                                                    <p className="text-sm text-gray-400 mt-1">{setting.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-end pt-4 border-t">
                            <Button type="submit" disabled={saving}>
                                {saving ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Changes
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}
