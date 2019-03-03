import express from 'express';
import passport from 'passport';
import TwitterStrategy from 'passport-twitter';
import session from 'express-session';

passport.use(
    new TwitterStrategy.Strategy(
        {
            consumerKey: process.env.TWITTER_CONSUMER_KEY,
            consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
            callbackURL: `${process.env.HOST}:${
                process.env.PORT
            }/auth/twitter/callback`,
        },
        (token, tokenSecret, profile, done) => {
            const user = {
                userId: profile.id,
                userName: profile.username,
            };

            done(null, user);
        }
    )
);

const twitter = express.Router();

twitter.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    })
);

twitter.get('/', passport.authenticate('twitter'));

twitter.get(
    '/callback',
    passport.authenticate('twitter', {
        successRedirect: '/api/users',
        failureRedirect: '/auth/twitter',
    })
);

export default twitter;
