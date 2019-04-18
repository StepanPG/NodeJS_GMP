import dotenv from 'dotenv/config';
import mongoDB from './database/mongoose';
import app from './app';
import routes from './routes';
import { cookieParser, bodyParser } from './middlewares';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./swagger_docs.yaml');
const port = process.env.PORT || 8080;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.use(cookieParser);
app.use(bodyParser);

app.use('/', routes);
