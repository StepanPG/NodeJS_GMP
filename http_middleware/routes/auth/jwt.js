import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import userController from '../../controllers/users';

const jwt = express.Router();

jwt.post('/', (req, res, next) => {
    userController.getUserByEmail(req.body.email).then((user) => {
        if (user && user.password === req.body.password) {
            const payload = {
                user: user.userName,
            };

            const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_TOKEN_EXPIRES,
            });

            res.send({
                code: 200,
                message: 'OK',
                data: {
                    user: {
                        username: user.userName,
                    },
                },
                token,
            });
        } else {
            res.status(404).send({
                code: 404,
                message: 'Not Found',
                data: {
                    additionalMessage: 'Wrong user/password combination',
                },
            });
        }
    });
});

export default jwt;
