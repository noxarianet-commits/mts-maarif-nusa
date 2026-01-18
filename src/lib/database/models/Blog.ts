import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
    _id: mongoose.Types.ObjectId;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: {
        url: string;
        cloudinaryId: string;
        alt: string;
    };
    author: {
        name: string;
        avatar?: string;
    };
    category: 'berita' | 'pengumuman' | 'kegiatan' | 'prestasi';
    tags: string[];
    published: boolean;
    publishedAt: Date;
    featured: boolean;
    allowComments: boolean;
    meta: {
        views: number;
        readTime: number;
        wordCount: number;
    };
    seo: {
        title?: string;
        description?: string;
        keywords: string[];
        ogImage?: string;
    };
    createdBy: mongoose.Types.ObjectId;
    updatedBy: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
    {
        title: { type: String, required: [true, 'Judul wajib diisi'], trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        excerpt: { type: String, required: [true, 'Ringkasan wajib diisi'], maxlength: [300, 'Ringkasan maksimal 300 karakter'] },
        content: { type: String, required: [true, 'Konten wajib diisi'] },
        coverImage: {
            url: { type: String, required: true },
            cloudinaryId: { type: String, required: true },
            alt: { type: String, default: '' },
        },
        author: {
            name: { type: String, required: true },
            avatar: String,
        },
        category: { type: String, enum: ['berita', 'pengumuman', 'kegiatan', 'prestasi'], required: true },
        tags: [{ type: String, trim: true }],
        published: { type: Boolean, default: false },
        publishedAt: Date,
        featured: { type: Boolean, default: false },
        allowComments: { type: Boolean, default: true },
        meta: {
            views: { type: Number, default: 0 },
            readTime: { type: Number, default: 0 },
            wordCount: { type: Number, default: 0 },
        },
        seo: {
            title: String,
            description: String,
            keywords: [String],
            ogImage: String,
        },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
        updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
);

// Create slug from title - using async function without callback for mongoose 8.x
BlogSchema.pre('save', async function () {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    if (this.isModified('content')) {
        const words = this.content.split(/\s+/).length;
        this.meta.wordCount = words;
        this.meta.readTime = Math.ceil(words / 200);
    }
});

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
