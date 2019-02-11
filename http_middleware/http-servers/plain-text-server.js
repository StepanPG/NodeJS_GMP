import http from 'http';
import { logger } from '../logger';

const PORT = 3000; // todo: use port from porcess.env
const server = http.createServer();

server.on('request', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
    });
    res.write('Hello World');
    res.end();
});

server.on('listening', () => {
    logger.info(`Server listening on port: ${PORT}`);
});

server.on('error', (error) => {
    logger.error(`Error with http plain-text-server. ${error}`);
});

server.listen(PORT);
