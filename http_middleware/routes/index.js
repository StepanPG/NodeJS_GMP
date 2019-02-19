import express from 'express';
import api from './api';
import auth from './auth';
import login from './login';

const routes = express.Router();

routes.use('/api', api);
routes.use('/auth', auth);
routes.use('/login', login);

export default routes;
