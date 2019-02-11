import express from 'express';

const app = express();

app.use(express.json()); // build in body-parser

export default app;
