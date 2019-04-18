import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        userName: String,
        displayName: String,
        password: String,
        email: String,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

export default User;
