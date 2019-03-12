import http from 'http';
import { logger } from '../logger';
import CityModel from '../models/city';
import mongoDB from '../database/mongoose';

const PORT = process.env.PORT || 3000;
const server = http.createServer();

server.on('request', (req, res) => {
    CityModel.aggregate([
        {
            $sample: {
                size: 1,
            },
        },
    ])
        .then((city) => {
            res.writeHead(200, {
                'Content-Type': 'application/json',
            });
            res.write(JSON.stringify(city));
            res.end();
        })
        .catch((error) => {
            logger.error(`Error with random-city-server. ${error}`);
        });
});

server.on('listening', () => {
    logger.info(`Server listening on port: ${PORT}`);
});

server.on('error', (error) => {
    logger.error(`Error with http random-city-server. ${error}`);
});

server.listen(PORT);
