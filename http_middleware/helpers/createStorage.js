import fs from 'fs';
import config from '../config';
import { logger } from '../logger';

const fsPromises = fs.promises;

function createStorage() {
    // todo: check for folder before creating storage file
    fsPromises
        .writeFile(config.storagePath, JSON.stringify(config.defaultData))
        .then(() => {
            logger.info(`DB has been successfully initialized`);
        })
        .catch((err) => {
            logger.error(`Error while DB initialization: ${err}`);
        });
}

createStorage();
