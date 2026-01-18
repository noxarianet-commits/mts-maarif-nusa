import Link from 'next/link';
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button, Card, CardContent, Input, Textarea, Label } from '@/components/ui';

export const metadata = {
    title: 'Kontak Kami - MTs Maarif NU Sragi',
    description: 'Hubungi MTs Maarif NU Sragi untuk informasi lebih lanjut',
};

export default function KontakPage() {
    return (
        <div className="py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Beranda
                </Link>

                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Hubungi Kami</h1>
                    <p className="text-gray-600 dark:text-gray-400">Kami siap menjawab pertanyaan Anda.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <Card>
                        <CardContent className="p-8">
                            <h2 className="text-xl font-bold mb-6">Kirim Pesan</h2>
                            <form className="space-y-4">
                                <div><Label required>Nama</Label><Input placeholder="Nama lengkap" /></div>
                                <div><Label required>Email</Label><Input type="email" placeholder="email@contoh.com" /></div>
                                <div><Label required>Pesan</Label><Textarea placeholder="Tulis pesan..." /></div>
                                <Button type="submit" className="w-full"><Send className="w-4 h-4" />Kirim</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <Card><CardContent className="p-6 flex gap-4"><MapPin className="w-6 h-6 text-sky-500" /><div><h3 className="font-bold">Alamat</h3><p className="text-sm text-gray-600">Jl. Contoh No. 123, Sragi, Pekalongan</p></div></CardContent></Card>
                        <Card><CardContent className="p-6 flex gap-4"><Phone className="w-6 h-6 text-emerald-500" /><div><h3 className="font-bold">Telepon</h3><p className="text-sm text-gray-600">(0285) 123-456</p></div></CardContent></Card>
                        <Card><CardContent className="p-6 flex gap-4"><Mail className="w-6 h-6 text-violet-500" /><div><h3 className="font-bold">Email</h3><p className="text-sm text-gray-600">info@mtsmaarifsragi.sch.id</p></div></CardContent></Card>
                        <Card><CardContent className="p-6 flex gap-4"><Clock className="w-6 h-6 text-amber-500" /><div><h3 className="font-bold">Jam</h3><p className="text-sm text-gray-600">Senin-Sabtu: 07:00-14:00</p></div></CardContent></Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
