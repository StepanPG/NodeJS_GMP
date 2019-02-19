import express from 'express';
import { logger } from '../logger';
import storage from '../db/storage.json';
import jwt from 'jsonwebtoken';

const auth = express.Router();

auth.post('/', (req, res, next) => {
    const user = storage.users.find((user) => user.email === req.body.email);

    if (user && user.password !== req.body.password) {
        res.status(404).send({
            code: 404,
            message: 'Not Found',
            data: {
                additionalMessage: 'Wrong user/password combination',
            },
        });
    } else {
        const payload = {
            sub: user.id,
            user: user.username,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TOKEN_EXPIRES,
        });

        res.send({
            code: 200,
            message: 'OK',
            data: {
                user: {
                    email: user.email,
                    username: user.username,
                },
            },
            token,
        });
    }
});

export default auth;
