import ProductModel from '../models/product';
import { logger } from '../logger';
import { addLastModifiedDate } from '../helpers';

class ProductsController {
    getAllProducts() {
        return ProductModel.find();
    }

    getProductById(productId) {
        return ProductModel.findById(productId).catch((err) => {
            logger.error(`Error while reading data from DB: ${err.message}`);
            console.log(err.stack);
            return Promise.reject(err);
        });
    }

    getReviewsByProductId(productId) {
        return ProductModel.findById(productId)
            .then((product) => {
                return product.reviews;
            })
            .catch((err) => {
                logger.error(
                    `Error while reading data from DB: ${err.message}`
                );
                console.log(err.stack);
                return Promise.reject(err);
            });
    }

    addNewProduct(product) {
        return new ProductModel(addLastModifiedDate(product)).save();
    }

    updateProductById(productId, newData) {
        return ProductModel.findByIdAndUpdate(
            productId,
            addLastModifiedDate(newData),
            {
                upsert: true,
            }
        ).catch((err) => {
            logger.error(`Error while updating product by id: ${err.message}`);
            console.log(err.stack);
            return Promise.reject(err);
        });
    }

    deleteProductById(productId) {
        return ProductModel.findByIdAndDelete(productId).catch((err) => {
            logger.error(`Error while deleting product by id: ${err.message}`);
            console.log(err.stack);
            return Promise.reject(err);
        });
    }
}

export default new ProductsController();
