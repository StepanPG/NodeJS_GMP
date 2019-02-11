import http from 'http';
import { logger } from '../logger';

const PORT = 3000; // todo: use port from porcess.env
const server = http.createServer();

server.on('request', (req, res) => {
    req.pipe(res);
});

server.on('listening', () => {
    logger.info(`Server listening on port: ${PORT}`);
});

server.on('error', (error) => {
    logger.error(`Error with http echo-server. ${error}`);
});

server.listen(PORT);
