import app from './app';
import routes from './routes';
import cookieParser from './middlewares/cookie-parser';
import queryParser from './middlewares/query-parser';
import { logger } from './logger';

const port = process.env.PORT || 8080;

app.listen(port, () => logger.info(`App listening on port ${port}!`));

app.use(cookieParser);
app.use(queryParser);

app.use('/', routes);
