import express from 'express';
import api from './api';
import auth from './auth';
import passport from 'passport';
import jwtParser from '../middlewares/jwt-parser';
import socialChecker from '../middlewares/social-checker';

const routes = express.Router();

console.log(`Current auth type: ${process.env.AUTH_TYPE}`);

if (process.env.AUTH_TYPE === 'jwt') {
    routes.use('/api', jwtParser, api);
} else if (process.env.AUTH_TYPE === 'social') {
    routes.use('/api', socialChecker, api);
} else if (process.env.AUTH_TYPE === 'local') {
    routes.use(
        '/api',
        passport.authenticate('bearer', {
            session: false,
        }),
        api
    );
}

routes.use('/auth', auth);

export default routes;
