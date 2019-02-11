export default function cookieParser(req, res, next) {
    const cookies = {};
    const cookiesArray = req.headers.cookie
        ? req.headers.cookie.split(';')
        : [];
    cookiesArray.forEach((cookie) => {
        cookie = cookie.trim();
        const [key, value] = cookie.split('=');
        cookies[key.trim()] = value.trim();
    });

    req.parsedCookies = cookies;
    next();
}
