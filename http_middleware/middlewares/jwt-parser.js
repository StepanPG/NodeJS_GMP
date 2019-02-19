import jwt from 'jsonwebtoken';

export default function jwtParser(req, res, next) {
    if (
        req.originalUrl.startsWith('/auth') ||
        req.originalUrl.startsWith('/login')
    ) {
        next();
    } else {
        const token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
                if (err) {
                    res.status(401).json({
                        success: false,
                        message: 'Failed to authenticate token.',
                    });
                } else {
                    next();
                }
            });
        } else {
            res.status(401).send({
                success: false,
                message: 'No token provided.',
            });
        }
    }
}
