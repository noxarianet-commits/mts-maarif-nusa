import Image from "next/image";

export const metadata = {
    title: "Tentang Kami - MTs Maarif NU Sragi",
    description: "Profil dan Sejarah MTs Maarif NU Sragi",
};

export default function TentangPage() {
    console.log("Rendering Tentang Page"); // Debugging log

    return (
        <main className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-sky-900 mb-6 text-center">Tentang Kami</h1>

                <div className="bg-white rounded-2xl shadow-sm border p-8 max-w-4xl mx-auto">
                    <div className="prose prose-lg max-w-none text-gray-600">
                        <p className="lead">
                            MTs Maarif NU Sragi adalah lembaga pendidikan yang berkomitmen untuk mencetak generasi yang berilmu, beramal, dan berakhlakul karimah.
                        </p>

                        <h2 className="text-2xl font-bold text-sky-800 mt-8 mb-4">Visi</h2>
                        <p>
                            "Terwujudnya Generasi Muslim yang Beriman, Bertaqwa, Berilmu, Terampil dan Berakhlaqul Karimah"
                        </p>

                        <h2 className="text-2xl font-bold text-sky-800 mt-8 mb-4">Misi</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Melaksanakan pembelajaran dan bimbingan secara efektif.</li>
                            <li>Menumbuhkan semangat keunggulan secara intensif kepada seluruh warga madrasah.</li>
                            <li>Mendorong dan membantu setiap siswa untuk mengenali potensi dirinya.</li>
                            <li>Menumbuhkan penghayatan terhadap ajaran agama Islam dan budaya bangsa.</li>
                            <li>Menerapkan manajemen partisipatif dengan melibatkan seluruh warga madrasah.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-sky-800 mt-8 mb-4">Sejarah Singkat</h2>
                        <p>
                            Berdiri sejak tahun [Tahun Berdiri], MTs Maarif NU Sragi telah berkiprah dalam mendidik putra-putri bangsa dengan memadukan kurikulum nasional dan nilai-nilai keislaman Ahlussunnah wal Jamaah an-Nahdliyah.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
