import dotenv from 'dotenv/config';
import app from './app';
import routes from './routes';
import cookieParser from './middlewares/cookie-parser';
import queryParser from './middlewares/query-parser';
import passport from 'passport';
import { logger } from './logger';
import mongoDB from './database/mongoose';
import session from 'express-session';

const port = process.env.PORT || 8080;

app.listen(port, () => logger.info(`App listening on port ${port}!`));

app.use(cookieParser);
app.use(queryParser);

if (process.env.AUTH_TYPE === 'social') {
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: true,
            saveUninitialized: true,
        })
    );
    app.use(passport.initialize());
    app.use(passport.session());
}

app.use('/', routes);
