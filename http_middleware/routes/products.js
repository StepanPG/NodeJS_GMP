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
            res.sendStatus(500);
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
            res.sendStatus(500);
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
            res.sendStatus(500);
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
    const newProduct = req.parsedQuery;
    productsController
        .addNewProduct(newProduct)
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            logger.error(`Error while adding new product: `, err);
            res.sendStatus(500);
        });
});

export default products;
