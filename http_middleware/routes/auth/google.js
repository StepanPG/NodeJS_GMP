import express from 'express';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth2';

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
            const user = {
                userId: profile.id,
                userName: profile.displayName,
            };

            done(null, user);
        }
    )
);

const google = express.Router();

google.get(
    '/',
    passport.authenticate('google', {
        scope: ['profile'],
    })
);

google.get(
    '/callback',
    passport.authenticate('google', {
        successRedirect: '/api/users',
        failureRedirect: '/auth/google',
    })
);

export default google;
