import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import csv from 'csvtojson';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

class Importer {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;

        /**
         *  I can see two options:
         *  1. Store converted data from csv file in some local variable;
         *  2. Write converted files in .json files and return it's contents on
         *  .import(path) and .importSync(path) methods;
         *  From my point of wiew second option is better for big .csv files.
         *  Because big files are easier to store on disk instead of RAM to increase performance.
         *  */
        this.convertedData = {};
        this.eventEmitter.on('changed', (newFileNames) => {
            this.processDataToFile(newFileNames);
            this.processDataToVariable(newFileNames);
        });
    }

    processDataToFile(fileNames) {
        console.log(`Processing data from files: ${fileNames.join(', ')}`);

        for (let i = 0; i < fileNames.length; i++) {
            csv()
                .fromFile(`${__dirname}/../data/${fileNames[i]}`)
                .then((json) => {
                    const fileName = path.basename(fileNames[i], '.csv');
                    if (fs.existsSync(`${__dirname}/../parsed_data/`)) {
                        return writeFileAsync(
                            `${__dirname}/../parsed_data/${fileName}.json`,
                            JSON.stringify(json, null, '  ')
                        );
                    } else {
                        fs.mkdirSync(`${__dirname}/../parsed_data/`);
                        return writeFileAsync(
                            `${__dirname}/../parsed_data/${fileName}.json`,
                            JSON.stringify(json, null, '  ')
                        );
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    import(filePath) {
        const fileName = path.basename(filePath, '.csv');
        return readFileAsync(`${__dirname}/../parsed_data/${fileName}.json`, {
            encoding: 'utf-8',
        })
            .then((data) => JSON.parse(data))
            .catch((err) => {
                console.log(err);
            });
    }

    importSync(filePath) {
        const fileName = path.basename(filePath, '.csv');
        return JSON.parse(
            fs.readFileSync(`${__dirname}/../parsed_data/${fileName}.json`)
        );
    }

    processDataToVariable(fileNames) {
        for (let i = 0; i < fileNames.length; i++) {
            const fileName = path.basename(fileNames[i], '.csv');
            csv()
                .fromFile(`${__dirname}/../data/${fileNames[i]}`)
                .then((json) => {
                    this.convertedData[fileName] = json;
                });
        }
    }

    importFromLocal(filePath) {
        const fileName = path.basename(filePath, '.csv');
        return this.convertedData[fileName];
    }
}

module.exports = Importer;
