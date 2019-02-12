/*
    I am a little bit confused with task point 7, because express already parses query string into object.
    https://expressjs.com/en/4x/api.html#req.query
*/

export default function queryParser(req, res, next) {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on('end', () => {
        try {
            req.parsedQuery = data.length ? JSON.parse(data) : {};
            next();
        } catch (err) {
            next(err);
        }
    });
}
