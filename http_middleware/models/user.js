import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        userName: String,
        displayName: String,
        password: String,
        email: String,
        userStrategyUUID: String,
        token: String,
        lastModifiedDate: Date,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

export default User;
