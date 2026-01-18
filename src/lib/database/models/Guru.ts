import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGuru extends Document {
    _id: mongoose.Types.ObjectId;
    nama: string;
    nip?: string;
    nuptk?: string;
    jabatan: string[];
    bidang: string[];
    foto: {
        url: string;
        cloudinaryId: string;
    };
    bio: string;
    pendidikan: {
        jenjang: string;
        jurusan: string;
        institusi: string;
        tahun: number;
    }[];
    pengalaman: {
        posisi: string;
        institusi: string;
        tahunMulai: number;
        tahunSelesai?: number;
    }[];
    kontak: {
        email?: string;
        telepon?: string;
    };
    urutan: number;
    status: 'aktif' | 'pensiun' | 'mutasi';
    createdAt: Date;
    updatedAt: Date;
}

const PendidikanSchema = new Schema(
    {
        jenjang: { type: String, required: true },
        jurusan: { type: String, required: true },
        institusi: { type: String, required: true },
        tahun: { type: Number, required: true },
    },
    { _id: false }
);

const PengalamanSchema = new Schema(
    {
        posisi: { type: String, required: true },
        institusi: { type: String, required: true },
        tahunMulai: { type: Number, required: true },
        tahunSelesai: Number,
    },
    { _id: false }
);

const GuruSchema = new Schema<IGuru>(
    {
        nama: {
            type: String,
            required: [true, 'Nama guru wajib diisi'],
            trim: true,
        },
        nip: {
            type: String,
            trim: true,
            sparse: true,
        },
        nuptk: {
            type: String,
            trim: true,
            sparse: true,
        },
        jabatan: [{ type: String, trim: true }],
        bidang: [{ type: String, trim: true }],
        foto: {
            url: { type: String, default: '' },
            cloudinaryId: { type: String, default: '' },
        },
        bio: {
            type: String,
            default: '',
        },
        pendidikan: [PendidikanSchema],
        pengalaman: [PengalamanSchema],
        kontak: {
            email: String,
            telepon: String,
        },
        urutan: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ['aktif', 'pensiun', 'mutasi'],
            default: 'aktif',
        },
    },
    {
        timestamps: true,
    }
);

const Guru: Model<IGuru> =
    mongoose.models.Guru || mongoose.model<IGuru>('Guru', GuruSchema);

export default Guru;
