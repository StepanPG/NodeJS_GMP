import express from 'express';
import loginLocal from './login-local';

const login = express.Router();

login.use('/local', loginLocal);

export default login;
