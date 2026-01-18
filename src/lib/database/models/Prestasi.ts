import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPrestasi extends Document {
    _id: mongoose.Types.ObjectId;
    jenis: 'siswa' | 'guru' | 'sekolah';
    nama: string;
    prestasi: string;
    deskripsi: string;
    event: string;
    tingkat: 'sekolah' | 'kecamatan' | 'kabupaten' | 'provinsi' | 'nasional' | 'internasional';
    kategori: string;
    tanggal: Date;
    tahun: number;
    penyelenggara: string;
    bukti: {
        url: string;
        cloudinaryId: string;
        type: 'image' | 'pdf' | 'sertifikat';
    }[];
    peserta: string[];
    pembimbing?: string;
    published: boolean;
    urutan: number;
    createdAt: Date;
    updatedAt: Date;
}

const BuktiSchema = new Schema(
    {
        url: { type: String, required: true },
        cloudinaryId: { type: String, required: true },
        type: {
            type: String,
            enum: ['image', 'pdf', 'sertifikat'],
            default: 'image',
        },
    },
    { _id: false }
);

const PrestasiSchema = new Schema<IPrestasi>(
    {
        jenis: {
            type: String,
            enum: ['siswa', 'guru', 'sekolah'],
            required: true,
        },
        nama: {
            type: String,
            required: [true, 'Nama peraih prestasi wajib diisi'],
            trim: true,
        },
        prestasi: {
            type: String,
            required: [true, 'Nama prestasi wajib diisi'],
            trim: true,
        },
        deskripsi: {
            type: String,
            default: '',
        },
        event: {
            type: String,
            required: [true, 'Nama event wajib diisi'],
        },
        tingkat: {
            type: String,
            enum: ['sekolah', 'kecamatan', 'kabupaten', 'provinsi', 'nasional', 'internasional'],
            required: true,
        },
        kategori: {
            type: String,
            required: true,
        },
        tanggal: {
            type: Date,
            required: true,
        },
        tahun: {
            type: Number,
            required: true,
        },
        penyelenggara: {
            type: String,
            required: true,
        },
        bukti: [BuktiSchema],
        peserta: [{ type: String, trim: true }],
        pembimbing: String,
        published: {
            type: Boolean,
            default: true,
        },
        urutan: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
PrestasiSchema.index({ tahun: -1, tingkat: 1 });
PrestasiSchema.index({ jenis: 1, published: 1 });

const Prestasi: Model<IPrestasi> =
    mongoose.models.Prestasi || mongoose.model<IPrestasi>('Prestasi', PrestasiSchema);

export default Prestasi;
