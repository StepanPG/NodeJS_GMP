export function bodyParser(req, res, next) {
    let data = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on('end', () => {
        try {
            req.body = data.length ? JSON.parse(data) : {};
            next();
        } catch (err) {
            next(err);
        }
    });
}
