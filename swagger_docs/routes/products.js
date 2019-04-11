import express from 'express';
import productsController from '../controllers/products';

const products = express.Router();

products.get('/', (req, res, next) => {
    productsController
        .getAllProducts()
        .then((products) => {
            res.json(products);
        })
        .catch((err) => {
            console.error(`Error while fetching products: `, err);
            res.status(500).send(err.message);
        });
});

products.post('/', (req, res, next) => {
    productsController
        .addNewProduct(req.body)
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            console.error(`Error while adding new product: `, err);
            err.code === 11000
                ? res.status(400).send(err.message)
                : res.status(500).send(err.message);
        });
});

products.get('/:id', (req, res, next) => {
    productsController
        .getProductById(req.params.id)
        .then((product) => {
            res.json(product);
        })
        .catch((err) => {
            console.log(`Error while fetching product by id: ${err}`);
            res.status(500).send(err.message);
        });
});

products.put('/:id', (req, res, next) => {
    productsController
        .updateProductById(req.params.id, req.body)
        .then((product) => {
            product === null
                ? res.status(201).send('Product was created')
                : res.json(product);
        })
        .catch((err) => {
            console.error(`Error while updating product by id: ${err.message}`);
            err.code === 11000
                ? res.status(400).send(err.message)
                : res.status(500).send(err.message);
        });
});

products.delete('/:id', (req, res, next) => {
    productsController
        .deleteProductById(req.params.id)
        .then((product) => {
            product === null
                ? res.status(404).send('There is no product with provided id')
                : res.json(product);
        })
        .catch((err) => {
            console.error(`Error while deleting product by id: ${err.message}`);
            console.log(err);
            res.status(500).send(err.message);
        });
});

products.get('/:id/reviews', (req, res, next) => {
    productsController
        .getProductById(req.params.id)
        .then((product) => {
            product === null
                ? res.status(404).send('There is no product with provided id')
                : res.json(product.reviews);
        })
        .catch((err) => {
            console.error(
                `Error while fetching reviews by product id: ${err.message}`
            );
            console.log(err);
            res.status(500).send(err.message);
        });
});

export default products;
