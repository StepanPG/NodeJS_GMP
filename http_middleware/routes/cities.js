import express from 'express';
import { logger } from '../logger';
import citiesController from '../controllers/cities';

const cities = express.Router();

cities.get('/', (req, res, next) => {
    citiesController
        .getAllCities()
        .then((cities) => {
            res.json(cities);
        })
        .catch((err) => {
            logger.error(`Error while fetching cities: `, err);
            res.status(500).send(err.message);
        });
});

/**
 * POST request 'body' example:
 *  {
 *      "name" : "Lafayette",
 *      "country" : "United States",
 *      "zip" : 26716,
 *      "location" : {
 *          "lat" : 36.3415,
 *          "long" : -51.70051
 *      }
 *  }
 */

cities.post('/', (req, res, next) => {
    citiesController
        .addNewCity(req.parsedQuery)
        .then((city) => {
            res.json(city);
        })
        .catch((err) => {
            logger.error(`Error while adding new city: `, err);
            res.status(500).send(err.message);
        });
});

cities.put('/:id', (req, res, next) => {
    citiesController
        .updateCityById(req.params.id, req.parsedQuery)
        .then((city) => {
            res.json(city);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
});

cities.delete('/:id', (req, res, next) => {
    citiesController
        .deleteCityById(req.params.id)
        .then((city) => {
            res.json(city);
        })
        .catch((err) => {
            res.status(500).send(err.message);
        });
});

export default cities;
