import express from 'express';
import storage from '../../db/storage.json';
import passport from 'passport';
import LocalStrategy from 'passport-local';

const login = express.Router();

passport.use(
    new LocalStrategy.Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        },
        function(username, password, done) {
            const user = storage.users.find((user) => user.email === username);

            if (user && user.password !== password) {
                done(null, false, 'Bad username/password combination');
            } else {
                done(null, user);
            }
        }
    )
);

login.post(
    '/',
    passport.authenticate('local', { session: false }),
    (req, res, next) => {
        res.send({
            code: 200,
            message: 'OK',
            data: {
                user: {
                    email: req.user.email,
                    username: req.user.username,
                },
            },
        });
    }
);

export default login;
