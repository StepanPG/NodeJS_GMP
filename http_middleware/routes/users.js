import express from 'express';
import { logger } from '../logger';
import userController from '../controllers/users';

const users = express.Router();

users.get('/', (req, res, next) => {
    userController
        .getAllUsers()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            logger.error(`Error while fetching users: `, err);
            res.status(500).send(err.message);
        });
});

/**
 * POST request 'body' example:
 *  {
 *      "firstName" : "Wade",
 *      "lastName" : "Jimenez",
 *      "email" : "Donec@Crasdictumultricies.co.uk",
 *      "password" : "Jg1d86iw4Ly",
 *  }
 */
users.post('/', (req, res, next) => {
    userController
        .addNewUser(req.parsedQuery)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            logger.error(`Error while adding new user: `, err);
            res.status(500).send(err.message);
        });
});

users.put('/:id', (req, res, next) => {
    userController
        .updateUserById(req.params.id, req.parsedQuery)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
});

users.delete('/:id', (req, res, next) => {
    userController
        .deleteUserById(req.params.id)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
});

export default users;
