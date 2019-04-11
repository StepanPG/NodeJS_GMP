import mongoose from 'mongoose';

const citySchema = new mongoose.Schema(
    {
        cityId: {
            type: String,
            required: true,
            unique: true,
        },
        name: String,
        country: String,
        location: {
            lat: {
                type: Number,
                min: -90,
                max: 90,
            },
            long: {
                type: Number,
                min: -180,
                max: 180,
            },
        },
        zip: Number,
    },
    {
        timestamps: true,
    }
);

const City = mongoose.model('City', citySchema);

export default City;
