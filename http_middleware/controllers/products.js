import ProductModel from '../models/product';
import { logger } from '../logger';

class ProductsController {
    getAllProducts() {
        return ProductModel.findAll();
    }

    getProductById(productId) {
        return ProductModel.findById(productId);
    }

    getReviewsByProductId(productId) {
        // todo: implement reviews in different table with relations
    }

    addNewProduct(product) {
        return ProductModel.build({
            ...product,
            reviews: product.reviews.map((review) => JSON.stringify(review)),
        })
            .save()
            .then((newProduct) => {
                return newProduct;
            })
            .catch((err) => {
                logger.error(`Error while saving data to DB: `, err);
                return Promise.reject(err);
            });
    }
}

export default new ProductsController();
