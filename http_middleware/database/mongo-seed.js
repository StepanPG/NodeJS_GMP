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
            const citiesPromises = [];
            citiesMock.forEach((city) => {
                const location = city.location.split(', ');
                citiesPromises.push(
                    new Promise((resolve, reject) => {
                        new CityModel({
                            ...city,
                            'location.lat': parseFloat(location[0], 10),
                            'location.long': parseFloat(location[1], 10),
                        }).save((err, result) =>
                            err ? reject(err) : resolve(result)
                        );
                    })
                );
            });

            Promise.all(citiesPromises)
                .then((res) => {
                    mongoose.connection.close();
                    resolve(res);
                })
                .catch((err) => reject(err));
        });
    });
}

function fillMongoWithProducts() {
    return new Promise((resolve, reject) => {
        ProductModel.deleteMany({}, (err) => {
            err && reject(err);
            const productsPromises = [];
            productsMock.forEach((product) => {
                productsPromises.push(
                    new Promise((resolve, reject) => {
                        new ProductModel({
                            ...product,
                        }).save((err, result) =>
                            err ? reject(err) : resolve(result)
                        );
                    })
                );
            });

            Promise.all(productsPromises)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    });
}

function fillMongoWithUsers() {
    return new Promise((resolve, reject) => {
        UserModel.deleteMany({}, (err) => {
            err && reject(err);
            const userPromises = [];
            usersMock.forEach((user) => {
                userPromises.push(
                    new Promise((resolve, reject) => {
                        new UserModel({
                            ...user,
                        }).save((err, result) =>
                            err ? reject(err) : resolve(result)
                        );
                    })
                );
            });

            Promise.all(userPromises)
                .then((res) => resolve(res))
                .catch((err) => reject(err));
        });
    });
}

Promise.all([
    fillMongoWithCities(),
    fillMongoWithProducts(),
    fillMongoWithUsers(),
]).then(() => {
    mongoose.connection.close();
});
