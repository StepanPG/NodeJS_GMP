import express from 'express';
import products from './products';
import users from './users';
import cities from './cities';

const api = express.Router();

api.use('/products', products);
api.use('/users', users);
api.use('/cities', cities);

export default api;
