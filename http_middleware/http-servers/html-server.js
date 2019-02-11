import http from 'http';
import fs from 'fs';
import through from 'through2';
import { logger } from '../logger';

const PORT = 3000; // todo: use port from porcess.env
const server = http.createServer();

/*
server.on('request', (req, res) => {
    const HTML_PATH = __dirname + '/index.html';
    const data = fs.readFileSync(HTML_PATH, 'utf8');
    const newMessage = 'Hello World';
    const replacedData = data.replace('{message}', newMessage);

    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write(replacedData);
    res.end();
})
*/

server.on('request', (req, res) => {
    const HTML_PATH = __dirname + '/index.html';
    const newMessage = 'Hello World';
    const readable = fs.createReadStream(HTML_PATH);

    res.writeHead(200, {
        'Content-Type': 'text/html',
    });
    readable
        .pipe(
            through(function(chunk, enc, callback) {
                this.push(chunk.toString().replace(/{message}/g, newMessage));
                callback();
            })
        )
        .pipe(res);
    // Q: what to do with this handler ??? ???
    // .on('end', () => {
    //     res.end();
    // });
});

server.on('listening', () => {
    logger.log(`Server listening on port: ${PORT}`);
});

server.on('error', (error) => {
    logger.error(`Error with http html-server. ${error}`);
});

server.listen(PORT);
