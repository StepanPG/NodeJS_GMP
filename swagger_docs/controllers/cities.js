import CityModel from '../models/city';

class CitiesController {
    getAllCities() {
        return CityModel.find();
    }

    addNewCity(newCity) {
        return new CityModel(newCity).save();
    }

    updateCityById(cityId, newData) {
        return CityModel.findOneAndUpdate({ cityId }, newData, {
            upsert: true,
            new: true,
        });
    }

    deleteCityById(cityId) {
        return CityModel.findOneAndDelete({ cityId });
    }
}

export default new CitiesController();
