import http from 'http';
import { logger } from '../logger';

const PORT = 3000; // todo: use port from porcess.env
const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: '99.99',
    options: [
        {
            color: 'blue',
        },
        {
            size: 'XL',
        },
    ],
};
const server = http.createServer();

server.on('request', (req, res) => {
    let productToSend = '';
    try {
        productToSend = JSON.stringify(product);
    } catch (error) {
        logger.error('Error while parsing product. Please provide valid JSON.');
        logger.error(error);
        res.statusCode = 500;
        res.statusMessage = 'Internal Server Error';
        res.end();
        return;
    }

    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    res.write(productToSend);
    res.end();
});

server.on('listening', () => {
    logger.info(`Server listening on port: ${PORT}`);
});

server.on('error', (error) => {
    logger.error(`Error with http json-server. ${error}`);
});

server.listen(PORT);
