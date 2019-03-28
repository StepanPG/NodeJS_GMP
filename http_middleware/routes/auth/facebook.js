import express from 'express';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
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
    new FacebookStrategy.Strategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: `${process.env.HOST}:${
                process.env.PORT
            }/auth/facebook/callback`,
        },
        (accessToken, refreshToken, profile, done) => {
            const userProfile = {
                userId: profile.id,
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

const facebook = express.Router();

facebook.get('/', passport.authenticate('facebook'));

facebook.get(
    '/callback',
    passport.authenticate('facebook', {
        successRedirect: '/api/cities',
        failureRedirect: '/auth/facebook',
    })
);

export default facebook;
