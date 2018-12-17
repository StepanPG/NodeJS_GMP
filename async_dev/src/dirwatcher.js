import fs from 'fs';
import { promisify } from 'util';
import difference from 'lodash.difference';

const readDirAsync = promisify(fs.readdir);

class DirWatcher {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.checkedFileNames = [];
    }

    getNewFileNames(path) {
        return readDirAsync(path)
            .then((files) => {
                const newFileNames = difference(files, this.checkedFileNames);
                this.checkedFileNames = files;

                return newFileNames;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    async watch(path, delay) {
        console.log(`Started watching path: ${path} with delay: ${delay}`);
        await this.getNewFileNames(path);

        setInterval(() => {
            this.getNewFileNames(path)
                .then((newFileNames) => {
                    if (newFileNames.length) {
                        this.eventEmitter.emit('changed', newFileNames);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }, delay);
    }
}

module.exports = DirWatcher;
