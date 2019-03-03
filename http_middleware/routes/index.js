import express from 'express';
import api from './api';
import auth from './auth';
import passport from 'passport';

const routes = express.Router();

console.log(`Current auth type: ${process.env.AUTH_TYPE}`);

if (
    process.env.AUTH_TYPE === 'jwt' ||
    process.env.AUTH_TYPE === 'facebook' ||
    process.env.AUTH_TYPE === 'twitter' ||
    process.env.AUTH_TYPE === 'google'
) {
    routes.use('/api', api);
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
