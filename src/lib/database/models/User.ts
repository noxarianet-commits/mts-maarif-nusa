import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    username: string;
    password: string;
    role: 'superadmin' | 'admin' | 'editor';
    avatar?: string;
    lastLogin?: Date;
    permissions: string[];
    isActive: boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Nama wajib diisi'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email wajib diisi'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        username: {
            type: String,
            required: [true, 'Username wajib diisi'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password wajib diisi'],
            minlength: [6, 'Password minimal 6 karakter'],
            select: false,
        },
        role: {
            type: String,
            enum: ['superadmin', 'admin', 'editor'],
            default: 'editor',
        },
        avatar: String,
        lastLogin: Date,
        permissions: {
            type: [String],
            default: [],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date,
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
UserSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
UserSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
