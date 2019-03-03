import express from 'express';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
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
            const user = {
                userId: profile.id,
                userName: profile.displayName,
            };

            done(null, user);
        }
    )
);

const facebook = express.Router();

facebook.get('/', passport.authenticate('facebook'));

facebook.get(
    '/callback',
    passport.authenticate('facebook', {
        successRedirect: '/api/users',
        failureRedirect: '/auth/facebook',
    })
);

export default facebook;
