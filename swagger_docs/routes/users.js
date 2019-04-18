import express from 'express';
import userController from '../controllers/users';

const users = express.Router();

users.get('/', (req, res, next) => {
    userController
        .getAllUsers()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.error(`Error while fetching users: `, err);
            res.status(500).send(err.message);
        });
});

users.post('/', (req, res, next) => {
    userController
        .addNewUser(req.body)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(`Error while adding new user:\n `, err);
            err.code === 11000
                ? res.status(400).send(err.message)
                : res.status(500).send(err.message);
        });
});

users.put('/:id', (req, res, next) => {
    userController
        .updateUserById(req.params.id, req.body)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            console.error(`Error while updating user by id: ${err.message}`);
            err.code === 11000
                ? res.status(400).send(err.message)
                : res.status(500).send(err.message);
        });
});

users.delete('/:id', (req, res, next) => {
    userController
        .deleteUserById(req.params.id)
        .then((user) => {
            user === null
                ? res.status(404).send('There is no user with provided id')
                : res.json(user);
        })
        .catch((err) => {
            console.error(`Error while deleting user by id: ${err.message}`);
            console.log(err);
            res.status(500).send(err.message);
        });
});

export default users;
