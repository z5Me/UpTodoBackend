import mongoose from 'mongoose';

export default async function connectDB(url) {
    try {
        await mongoose.connect(url);

        console.log('Connect DB success');
    } catch (error) {
        console.log('Connect Database fail');
        process.exit(1);
    }
}