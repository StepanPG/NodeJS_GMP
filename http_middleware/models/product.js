import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: String,
        reviews: {
            type: Array,
            default: [],
            required: true,
        },
        lastModifiedDate: Date,
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
