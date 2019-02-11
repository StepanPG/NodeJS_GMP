import fs from 'fs';
import config from '../config';
import { logger } from '../logger';

const fsPromises = fs.promises;

class UsersController {
    getAllUsers() {
        return fsPromises
            .readFile(config.storagePath, 'utf8')
            .then((data) => {
                const parsedData = JSON.parse(data);
                return parsedData.users;
            })
            .catch((err) => {
                logger.error(`Error while reading data from DB file: `, err);
            });
    }
}

export default new UsersController();
