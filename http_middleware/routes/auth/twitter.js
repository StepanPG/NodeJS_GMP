import express from 'express';
import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
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
    new TwitterStrategy.Strategy(
        {
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            includeEmail: true,
            callbackURL: `${process.env.HOST}:${
                process.env.PORT
            }/auth/twitter/callback`,
        },
        (token, tokenSecret, profile, done) => {
            const userProfile = {
                userId: profile.id,
                userName: profile.username,
                displayName: profile.displayName,
                email: profile.email,
                userStrategyUUID: uuidv4(),
                token,
            };

            userController
                .getUserById(userProfile.userId)
                .then((user) => {
                    if (user) {
                        user.token = token;
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

const twitter = express.Router();

twitter.get('/', passport.authenticate('twitter'));

twitter.get(
    '/callback',
    passport.authenticate('twitter', {
        successRedirect: '/api/cities',
        failureRedirect: '/auth/twitter',
    })
);

export default twitter;
