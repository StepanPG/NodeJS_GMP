import express from 'express';
import citiesController from '../controllers/cities';

const cities = express.Router();

cities.get('/', (req, res, next) => {
    citiesController
        .getAllCities()
        .then((cities) => {
            res.json(cities);
        })
        .catch((err) => {
            console.error(`Error while fetching cities: `, err);
            res.status(500).send(err.message);
        });
});

cities.post('/', (req, res, next) => {
    citiesController
        .addNewCity(req.body)
        .then((city) => {
            res.json(city);
        })
        .catch((err) => {
            console.error(`Error while adding new city: `, err);
            err.code === 11000
                ? res.status(400).send(err.message)
                : res.status(500).send(err.message);
        });
});

cities.put('/:id', (req, res, next) => {
    citiesController
        .updateCityById(req.params.id, req.body)
        .then((city) => {
            res.json(city);
        })
        .catch((err) => {
            console.error(`Error while updating city by id: ${err.message}`);
            err.code === 11000
                ? res.status(400).send(err.message)
                : res.status(500).send(err.message);
        });
});

cities.delete('/:id', (req, res, next) => {
    citiesController
        .deleteCityById(req.params.id)
        .then((city) => {
            city === null
                ? res.status(404).send('There is no city with provided id')
                : res.json(city);
        })
        .catch((err) => {
            console.error(`Error while deleting city by id: ${err.message}`);
            console.log(err);
            res.status(500).send(err.message);
        });
});

export default cities;
