import ProductModel from '../models/product';

class ProductsController {
    getAllProducts() {
        return ProductModel.find();
    }

    addNewProduct(product) {
        return new ProductModel(product).save();
    }

    getProductById(productId) {
        return ProductModel.findOne({ productId });
    }

    updateProductById(productId, newData) {
        return ProductModel.findOneAndUpdate({ productId }, newData, {
            upsert: true,
            new: true,
        });
    }

    deleteProductById(productId) {
        return ProductModel.findOneAndDelete({ productId });
    }
}

export default new ProductsController();
