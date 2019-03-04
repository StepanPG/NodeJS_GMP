import fs from 'fs';
import path from 'path';
import config from '../config';
import { logger } from '../logger';

const fsPromises = fs.promises;
let dbPath = path.dirname(config.storagePath);

function createStorage() {
    fsPromises
        .readdir(dbPath)
        .catch(() => {
            return fsPromises.mkdir(dbPath);
        })
        .then(() => {
            return fsPromises.writeFile(
                config.storagePath,
                JSON.stringify(config.defaultData)
            );
        })
        .then(() => {
            logger.info(`DB has been successfully initialized`);
        })
        .catch((err) => {
            logger.error(`Error while DB initialization: ${err}`);
        });
}

createStorage();
