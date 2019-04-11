import dotenv from 'dotenv/config';
import mongoose from 'mongoose';

const mongoDB = mongoose.connect(
    `mongodb://localhost:${process.env.MONGODB_PORT}/${
        process.env.MONGODB_NAME
    }`,
    {
        useNewUrlParser: true,
    }
);

mongoDB
    .then((db) => {
        console.log('Mongodb has been connected');
    })
    .catch((err) => {
        console.log('Error while trying to connect with mongodb');
    });

export default mongoDB;
