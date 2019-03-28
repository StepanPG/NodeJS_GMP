import express from 'express';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';
import userController from '../../controllers/users';
import uuidv4 from 'uuid/v4';

passport.serializeUser((user, done) => {
    done(null, user.userStrategyUUID);
});

passport.deserializeUser((userStrategyUUID, done) => {
    userController.getUserByUUID(userStrategyUUID).then((user) => {
        if (user) {
            done(null, user);
        }
    });
});

passport.use(
    new GoogleStrategy.Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.HOST}:${
                process.env.PORT
            }/auth/google/callback`,
        },
        (accessToken, refreshToken, profile, done) => {
            const userProfile = {
                userId: profile.id,
                userName: profile.displayName,
                email: profile.email,
                userStrategyUUID: uuidv4(),
                token: accessToken,
            };

            userController
                .getUserById(userProfile.userId)
                .then((user) => {
                    if (user) {
                        user.token = accessToken;
                        return user;
                    } else {
                        return userController.addNewUser(userProfile);
                    }
                })
                .then((user) => {
                    done(null, user);
                })
                .catch((err) => {
                    console.log(`User not found in DB. error: ${err}`);
                });
        }
    )
);

const google = express.Router();

google.get(
    '/',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    })
);

google.get(
    '/callback',
    passport.authenticate('google', {
        successRedirect: '/api/cities',
        failureRedirect: '/auth/google',
    })
);

export default google;
