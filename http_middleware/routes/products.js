import express from 'express';
import { logger } from '../logger';
import productsController from '../controllers/products';

const products = express.Router();

products.get('/', (req, res, next) => {
    productsController
        .getAllProducts()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            logger.error(`Error while fetching products: `, err);
        });
});

products.get('/:id', (req, res, next) => {
    const productId = parseInt(req.params.id, 10);
    productsController
        .getProductById(productId)
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            logger.error(`Error while fetching product by id: `, err);
        });
});

products.get('/:id/reviews', (req, res, next) => {
    const productId = parseInt(req.params.id, 10);
    productsController
        .getReviewsByProductId(productId)
        .then((reviews) => {
            res.json(reviews);
        })
        .catch((err) => {
            logger.error(`Error while fetching reviews by product id: `, err);
        });
});

/**
 * POST request 'body' example:
 *
 * {
 *     "name": "MacBook Pro 13",
 *     "properties": {
 *         "color": "silver",
 *         "ram": 8
 *     },
 *     "reviews": [{
 *         "content": "this is review of new MacBook Pro 13"
 *     }]
 * }
 *
 */

products.post('/', (req, res, next) => {
    const newProduct = req.body;
    productsController
        .addNewProduct(newProduct)
        .then((result) => {
            if (result) {
                res.json(newProduct);
            }
            res.end('somethig wrong.');
        })
        .catch((err) => {
            logger.error(`Error while adding new product: `, err);
        });
});

export default products;
