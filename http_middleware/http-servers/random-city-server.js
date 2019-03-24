import http from 'http';
import { logger } from '../logger';
import MongoClient from 'mongodb';
import dotenv from 'dotenv/config';

const PORT = process.env.PORT || 3000;
const server = http.createServer();

server.on('request', (req, res) => {
    MongoClient.connect(
        `mongodb://localhost:${process.env.MONGODB_PORT}/${
            process.env.MONGODB_NAME
        }`,
        function(err, client) {
            Promise.resolve()
                .then(() => {
                    const db = client.db(process.env.MONGODB_NAME);
                    return db
                        .collection('cities')
                        .aggregate([
                            {
                                $sample: {
                                    size: 1,
                                },
                            },
                        ])
                        .toArray();
                })
                .then((cities) => {
                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                    });
                    res.write(JSON.stringify(cities[0]));
                    res.end();
                    client.close();
                })
                .catch((error) => {
                    logger.error(
                        `Error on request to random-city-server. ${error}`
                    );
                });
        }
    );
});

server.on('listening', () => {
    logger.info(`Server listening on port: ${PORT}`);
});

server.on('error', (error) => {
    logger.error(`Error with http random-city-server. ${error}`);
});

server.listen(PORT);
