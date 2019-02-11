export default function queryParser(req, res, next) {
    /*
        I am a little bit confused with task point 7, because express already parses query string into object.
        https://expressjs.com/en/4x/api.html#req.query
    */
    req.parsedQuery = req.query;
    next();
}
