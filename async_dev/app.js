import { Importer, DirWatcher } from './src';
import { EventEmitter } from 'events';
const dirWatchEE = new EventEmitter();

const dirWatcher = new DirWatcher(dirWatchEE);
const importer = new Importer(dirWatchEE);
dirWatcher.watch('./data', 5000);

dirWatchEE.on('changed', (files) => {
    setTimeout(() => {
        for (let i = 0; i < files.length; i++) {
            console.log(`\n.importSync(path) from file: ${files[i]}`);
            const dataCSV = importer.importSync(files[i]);
            console.log(dataCSV);

            importer.import(files[i]).then((data) => {
                console.log(`\n.import(path) from file: ${files[i]}`);
                console.log(data);
            });
        }
    }, 5000);
});
