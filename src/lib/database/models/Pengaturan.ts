import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPengaturan extends Document {
    _id: mongoose.Types.ObjectId;
    kategori: 'umum' | 'tampilan' | 'seo' | 'sosial' | 'email';
    key: string;
    value: string | number | boolean | object;
    label: string;
    type: 'text' | 'number' | 'boolean' | 'textarea' | 'image' | 'json';
    group: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const PengaturanSchema = new Schema<IPengaturan>(
    {
        kategori: {
            type: String,
            enum: ['umum', 'tampilan', 'seo', 'sosial', 'email'],
            required: true,
        },
        key: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        value: {
            type: Schema.Types.Mixed,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['text', 'number', 'boolean', 'textarea', 'image', 'json'],
            default: 'text',
        },
        group: {
            type: String,
            default: 'general',
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Create indexes
PengaturanSchema.index({ kategori: 1, key: 1 });

const Pengaturan: Model<IPengaturan> =
    mongoose.models.Pengaturan || mongoose.model<IPengaturan>('Pengaturan', PengaturanSchema);

export default Pengaturan;
