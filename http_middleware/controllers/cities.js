import { logger } from '../logger';
import CityModel from '../models/city';
import { addLastModifiedDate } from '../helpers';

class CitiesController {
    getAllCities() {
        return CityModel.find();
    }

    addNewCity(newCity) {
        return new CityModel(addLastModifiedDate(newCity)).save();
    }

    updateCityById(cityId, newData) {
        return CityModel.findByIdAndUpdate(
            cityId,
            addLastModifiedDate(newData),
            {
                upsert: true,
            }
        ).catch((err) => {
            logger.error(`Error while updating city by id: ${err.message}`);
            console.log(err.stack);
            return Promise.reject(err);
        });
    }

    deleteCityById(cityId) {
        return CityModel.findByIdAndDelete(cityId).catch((err) => {
            logger.error(`Error while deleting city by id: ${err.message}`);
            console.log(err.stack);
            return Promise.reject(err);
        });
    }
}

export default new CitiesController();
