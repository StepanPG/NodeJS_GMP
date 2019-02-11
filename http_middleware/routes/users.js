import express from 'express';
import { logger } from '../logger';
import userController from '../controllers/users';

const users = express.Router();

users.get('/', (req, res, next) => {
    userController
        .getAllUsers()
        .then((users) => {
            logger.info(users);
            res.json(users);
        })
        .catch((err) => {
            logger.error(`Error while fetching users: `, err);
        });
});

export default users;
