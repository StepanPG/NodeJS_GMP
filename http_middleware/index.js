import dotenv from 'dotenv/config';
import app from './app';
import routes from './routes';
import cookieParser from './middlewares/cookie-parser';
import queryParser from './middlewares/query-parser';
import jwtParser from './middlewares/jwt-parser';
import passport from 'passport';
import { logger } from './logger';

const port = process.env.PORT || 8080;

app.listen(port, () => logger.info(`App listening on port ${port}!`));

app.use(cookieParser);
app.use(queryParser);
if (process.env.AUTH_TYPE === 'jwt') {
    app.use(jwtParser);
} else {
    app.use(passport.initialize());
}

app.use('/', routes);
