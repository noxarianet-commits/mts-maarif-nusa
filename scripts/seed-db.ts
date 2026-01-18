import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sekolah_db';

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await mongoose.connection.dropDatabase();
        console.log('Database cleared');

        // Create admin user
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash('Admin123!', salt);

        const User = mongoose.model('User', new mongoose.Schema({
            name: String,
            email: String,
            username: String,
            password: String,
            role: String,
            isActive: Boolean,
            permissions: [String],
        }, { timestamps: true }));

        await User.create({
            name: 'Administrator',
            email: 'admin@sekolah.sch.id',
            username: 'admin',
            password: hashedPassword,
            role: 'superadmin',
            isActive: true,
            permissions: ['*'],
        });
        console.log('Admin user created');

        // Create sample pengaturan
        const Pengaturan = mongoose.model('Pengaturan', new mongoose.Schema({
            kategori: String,
            key: String,
            value: mongoose.Schema.Types.Mixed,
            label: String,
            type: String,
        }, { timestamps: true }));

        await Pengaturan.insertMany([
            { kategori: 'umum', key: 'nama_sekolah', value: 'MTs Maarif NU Sragi', label: 'Nama Sekolah', type: 'text' },
            { kategori: 'umum', key: 'alamat', value: 'Jl. Contoh No. 123, Sragi, Pekalongan', label: 'Alamat', type: 'textarea' },
            { kategori: 'umum', key: 'telepon', value: '(0285) 123-456', label: 'Telepon', type: 'text' },
            { kategori: 'umum', key: 'email', value: 'info@mtsmaarifsragi.sch.id', label: 'Email', type: 'text' },
            { kategori: 'sosial', key: 'facebook', value: 'https://facebook.com/mtsmaarifnusragi', label: 'Facebook', type: 'text' },
            { kategori: 'sosial', key: 'instagram', value: 'https://instagram.com/mtsmaarifnusragi', label: 'Instagram', type: 'text' },
        ]);
        console.log('Settings created');

        console.log('\n✅ Seed completed successfully!');
        console.log('\nAdmin credentials:');
        console.log('  Username: admin');
        console.log('  Password: Admin123!');

        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
}

seed();
