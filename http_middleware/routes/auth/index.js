import express from 'express';
import jwt from './jwt';
import local from './local';
import facebook from './facebook';
import twitter from './twitter';
import google from './google';

const auth = express.Router();

auth.use('/jwt', jwt);
auth.use('/local', local);
auth.use('/facebook', facebook);
auth.use('/twitter', twitter);
auth.use('/google', google);

export default auth;
