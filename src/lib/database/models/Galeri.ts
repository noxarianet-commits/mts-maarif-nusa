import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGaleri extends Document {
    _id: mongoose.Types.ObjectId;
    judul: string;
    slug: string;
    deskripsi: string;
    kategori: 'kegiatan' | 'ekskul' | 'acara' | 'infrastruktur';
    coverImage: {
        url: string;
        cloudinaryId: string;
    };
    images: {
        url: string;
        cloudinaryId: string;
        caption: string;
        width: number;
        height: number;
    }[];
    tanggal: Date;
    published: boolean;
    views: number;
    createdBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const GaleriImageSchema = new Schema(
    {
        url: { type: String, required: true },
        cloudinaryId: { type: String, required: true },
        caption: { type: String, default: '' },
        width: { type: Number, default: 0 },
        height: { type: Number, default: 0 },
    },
    { _id: false }
);

const GaleriSchema = new Schema<IGaleri>(
    {
        judul: {
            type: String,
            required: [true, 'Judul album wajib diisi'],
            trim: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        deskripsi: {
            type: String,
            default: '',
        },
        kategori: {
            type: String,
            enum: ['kegiatan', 'ekskul', 'acara', 'infrastruktur'],
            required: true,
        },
        coverImage: {
            url: { type: String, required: true },
            cloudinaryId: { type: String, required: true },
        },
        images: [GaleriImageSchema],
        tanggal: {
            type: Date,
            default: Date.now,
        },
        published: {
            type: Boolean,
            default: false,
        },
        views: {
            type: Number,
            default: 0,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

// Create slug from title
GaleriSchema.pre('save', async function () {
    if (this.isModified('judul') && !this.slug) {
        this.slug = this.judul
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
});

const Galeri: Model<IGaleri> =
    mongoose.models.Galeri || mongoose.model<IGaleri>('Galeri', GaleriSchema);

export default Galeri;
