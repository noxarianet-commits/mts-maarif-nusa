import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEkskulImage {
    url: string;
    cloudinaryId: string;
    caption?: string;
    isFeatured: boolean;
}

export interface IEkskulJadwal {
    hari: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu';
    jamMulai: string;
    jamSelesai: string;
    tempat: string;
}

export interface IEkskul extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    slug: string;
    description: string;
    content: string;
    images: IEkskulImage[];
    pembina: string;
    ketua: string;
    wakil: string;
    jadwal: IEkskulJadwal[];
    kuota: number;
    peserta: number;
    published: boolean;
    featured: boolean;
    order: number;
    meta: {
        views: number;
        likes: number;
        shares: number;
    };
    createdBy: mongoose.Types.ObjectId;
    updatedBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const EkskulImageSchema = new Schema<IEkskulImage>(
    {
        url: { type: String, required: true },
        cloudinaryId: { type: String, required: true },
        caption: String,
        isFeatured: { type: Boolean, default: false },
    },
    { _id: false }
);

const EkskulJadwalSchema = new Schema<IEkskulJadwal>(
    {
        hari: {
            type: String,
            enum: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
            required: true,
        },
        jamMulai: { type: String, required: true },
        jamSelesai: { type: String, required: true },
        tempat: { type: String, required: true },
    },
    { _id: false }
);

const EkskulSchema = new Schema<IEkskul>(
    {
        title: {
            type: String,
            required: [true, 'Judul ekskul wajib diisi'],
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: [true, 'Deskripsi singkat wajib diisi'],
        },
        content: {
            type: String,
            default: '',
        },
        images: [EkskulImageSchema],
        pembina: {
            type: String,
            required: [true, 'Nama pembina wajib diisi'],
        },
        ketua: String,
        wakil: String,
        jadwal: [EkskulJadwalSchema],
        kuota: {
            type: Number,
            default: 0,
        },
        peserta: {
            type: Number,
            default: 0,
        },
        published: {
            type: Boolean,
            default: false,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
        meta: {
            views: { type: Number, default: 0 },
            likes: { type: Number, default: 0 },
            shares: { type: Number, default: 0 },
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

// Create slug from title
EkskulSchema.pre('save', async function () {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
});

const Ekskul: Model<IEkskul> =
    mongoose.models.Ekskul || mongoose.model<IEkskul>('Ekskul', EkskulSchema);

export default Ekskul;
