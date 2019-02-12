import fs from 'fs';
import config from '../config';
import { logger } from '../logger';
import combineProductsAndReviews from '../helpers/combineProductsAndReviews';
import getUpdatedDB from '../helpers/getUpdatedDB';

const fsPromises = fs.promises;

class ProductsController {
    getAllProducts() {
        return fsPromises
            .readFile(config.storagePath, 'utf8')
            .then((data) => {
                const parsedData = JSON.parse(data);
                return parsedData;
            })
            .then((data) => {
                const products = combineProductsAndReviews(
                    data.products,
                    data.reviews
                );
                return products;
            })
            .catch((err) => {
                logger.error(`Error while reading data from DB file: `, err);
                return Promise.reject(err);
            });
    }

    getProductById(productId) {
        return fsPromises
            .readFile(config.storagePath, 'utf8')
            .then((data) => {
                const parsedData = JSON.parse(data);
                return combineProductsAndReviews(
                    parsedData.products,
                    parsedData.reviews
                );
            })
            .then((allProducts) => {
                return allProducts.filter(
                    (product) => product.id === productId
                );
            })
            .catch((err) => {
                logger.error(`Error while reading data from DB file: `, err);
                return Promise.reject(err);
            });
    }

    getReviewsByProductId(productId) {
        return fsPromises
            .readFile(config.storagePath, 'utf8')
            .then((data) => {
                const parsedData = JSON.parse(data);
                const allProducts = combineProductsAndReviews(
                    parsedData.products,
                    parsedData.reviews
                );
                return allProducts.filter(
                    (product) => product.id === productId
                );
            })
            .then(([product]) => {
                return product.reviews;
            })
            .catch((err) => {
                logger.error(`Error while reading data from DB file: `, err);
                return Promise.reject(err);
            });
    }

    addNewProduct(product) {
        return fsPromises
            .readFile(config.storagePath, 'utf8')
            .then((data) => {
                const parsedData = JSON.parse(data);

                return getUpdatedDB(parsedData, product);
            })
            .then((newData) => {
                return fsPromises.writeFile(
                    config.storagePath,
                    JSON.stringify(newData)
                );
            })
            .then(() => product)
            .catch((err) => {
                logger.error(`Error while reading data from DB file: `, err);
                return Promise.reject(err);
            });
    }
}

export default new ProductsController();
