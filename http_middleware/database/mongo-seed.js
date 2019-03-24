import mongoDB from './mongoose';
import mongoose from 'mongoose';
import citiesMock from './mock/cities.json';
import productsMock from './mock/products.json';
import usersMock from './mock/users.json';
import CityModel from '../models/city';
import ProductModel from '../models/product';
import UserModel from '../models/user';

function fillMongoWithCities() {
    return new Promise((resolve, reject) => {
        CityModel.deleteMany({}, (err) => {
            err && reject(err);
            citiesMock.forEach((city) => {
                const location = city.location.split(', ');
                new CityModel({
                    ...city,
                    'location.lat': parseFloat(location[0], 10),
                    'location.long': parseFloat(location[1], 10),
                }).save((err, result) => (err ? reject(err) : resolve(result)));
            });
        });
    });
}

function fillMongoWithProducts() {
    return new Promise((resolve, reject) => {
        ProductModel.deleteMany({}, (err) => {
            err && reject(err);
            productsMock.forEach((product) => {
                new ProductModel(product).save((err, result) =>
                    err ? reject(err) : resolve(result)
                );
            });
        });
    });
}

function fillMongoWithUsers() {
    return new Promise((resolve, reject) => {
        UserModel.deleteMany({}, (err) => {
            err && reject(err);
            usersMock.forEach((user) => {
                new UserModel(user).save((err, result) =>
                    err ? reject(err) : resolve(result)
                );
            });
        });
    });
}

Promise.all([
    fillMongoWithCities(),
    fillMongoWithProducts(),
    fillMongoWithUsers(),
])
    .then(() => {
        mongoose.connection.close();
    })
    .catch((err) => {
        console.log(`Error in mongo-seed script: ${err}`);
    });
