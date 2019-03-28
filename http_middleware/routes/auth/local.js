import express from 'express';
import jwt from 'jsonwebtoken';
import userController from '../../controllers/users';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import BearerStrategy from 'passport-http-bearer';

const local = express.Router();

passport.use(
    new LocalStrategy.Strategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            session: false,
        },
        function(username, password, done) {
            userController
                .getUserByEmail(username)
                .then((user) => {
                    if (user && user.password === password) {
                        done(null, user);
                    } else {
                        done(null, false, 'Bad username/password combination');
                    }
                })
                .catch((err) => {
                    console.log(
                        `Error on local login: ${err} \n\nFor user: ${username}`
                    );
                });
        }
    )
);

passport.use(
    new BearerStrategy.Strategy(function(token, done) {
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
                if (err) {
                    done(null, false);
                } else {
                    done(null, decoded);
                }
            });
        } else {
            done(null, false);
        }
    })
);

local.post(
    '/',
    passport.authenticate('local', {
        session: false,
    }),
    (req, res, next) => {
        const payload = {
            user: req.user.userName,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TOKEN_EXPIRES,
        });

        res.json(token);
    }
);

export default local;
