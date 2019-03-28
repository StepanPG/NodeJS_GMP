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
            res.status(500).send(err.message);
        });
});

products.get('/:id', (req, res, next) => {
    productsController
        .getProductById(req.params.id)
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
});

products.get('/:id/reviews', (req, res, next) => {
    productsController
        .getReviewsByProductId(req.params.id)
        .then((reviews) => {
            res.json(reviews);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
});

/**
 * POST request 'body' example:
 *
 * {
 *     "name": "MacBook Pro 13",
 *     "description": "The best notebook",
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
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            logger.error(`Error while adding new product: `, err);
            res.status(500).send(err.message);
        });
});

products.put('/:id', (req, res, next) => {
    productsController
        .updateProductById(req.params.id, req.parsedQuery)
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
});

products.delete('/:id', (req, res, next) => {
    productsController
        .deleteProductById(req.params.id)
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
});

export default products;
