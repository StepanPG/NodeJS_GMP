#!/usr/bin/env node

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const { Writable, Transform } = require('stream');

const log = require('../logger');
const csv2json = require('csv2json');
const through2 = require('through2');

const helpMessage = `
Usage: ./streams.js --action=<actionName> [--file=<fileName>, textToTransform]

Options:
    -a, --action    Execute action
    -f, --file      Specify file name
    -h, --help      Show help
    -p, --path      Specify path

Actions:
    reverse(string)
    transform(string)
    outputFile(filePath)
    convertFromFile(filePath)
    convertToFile(filePath)
    cssBundler(path)`;

const cssToAddToBundle = `
.ngmp18 {
  background-color: #fff;
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
}

.ngmp18__hw3 {
  color: #333;
}

.ngmp18__hw3--t7 {
  font-weight: bold;
}`;

function reverse(str) {
    console.log(
        str
            .split('')
            .reverse()
            .join('')
    );
}

function transform(str) {
    console.log(str.toUpperCase());
}

function transformV2(str) {
    const writer = new Writable({
        write(chunk, encoding, callback) {
            console.log(
                chunk
                    .toString()
                    .trim()
                    .toUpperCase()
            );
            callback();
        },
    });
    process.stdin.pipe(writer);
}

function transformV3(str) {
    const upperCaseTr = new Transform({
        transform(chunk, encoding, callback) {
            this.push(chunk.toString().toUpperCase());
            callback();
        },
    });

    process.stdin.pipe(upperCaseTr).pipe(process.stdout);
}

function transformV4(str) {
    process.stdin
        .pipe(
            through2(function(chunk, enc, callback) {
                this.push(chunk.toString().toUpperCase());
                callback();
            })
        )
        .pipe(process.stdout);
}

function outputFile(filePath) {
    const reader = fs.createReadStream(filePath);
    reader.on('error', (error) => {
        log.error(`Error while reading file: ${filePath}\n\t ${error.message}`);
    });

    reader.pipe(process.stdout);
}

function convertFromFile(filePath) {
    if (path.extname(filePath) === '.csv') {
        const reader = fs.createReadStream(filePath);
        reader.on('error', (error) => {
            log.error(
                `Error while reading file: ${filePath}\n\t ${error.message}`
            );
        });

        reader.pipe(csv2json()).pipe(process.stdout);
    } else {
        log.error(`Error with file extention`);
        log.info(
            `'convertFromFile' action acsepts only '.csv' file extentions`
        );
    }
}

function convertToFile(filePath) {
    if (path.extname(filePath) === '.csv') {
        fsPromises
            .access(filePath)
            .then(() => {
                const fileName = path.basename(filePath).slice(0, -4);
                const reader = fs.createReadStream(filePath);
                const writer = fs.createWriteStream(`./${fileName}.json`);

                reader.on('error', (error) => {
                    log.error(
                        `Error while reading file: ${filePath}\n\t ${
                            error.message
                        }`
                    );
                });
                writer.on('finish', () => {
                    log.info(`file: ${filePath} finished writing`);
                });

                reader.pipe(csv2json()).pipe(writer);
            })
            .catch(() => {
                log.error(
                    `Error while reading file: ${filePath}. Please check help.`
                );
            });
    } else {
        log.error(`Error with file extention`);
        log.info(
            `'convertFromFile' action acsepts only '.csv' file extentions`
        );
    }
}

function cssBundler(dirPath) {
    fsPromises
        .access(`${dirPath}/bundle.css`)
        .then(() => {
            return fsPromises.unlink(`${dirPath}/bundle.css`);
        })
        .then(() => {
            bundleCss(dirPath);
        })
        .catch(() => {
            bundleCss(dirPath);
        })
        .catch((err) => log.error(err));
}

function bundleCss(dirPath) {
    fsPromises
        .readdir(dirPath)
        .then((files) => {
            const cssFilesList = files.filter(
                (file) => path.extname(file) === '.css'
            );
            const cssPromises = cssFilesList.map((cssFile) => {
                return fsPromises.readFile(`${dirPath}/${cssFile}`);
            });
            return Promise.all(cssPromises);
        })
        .then((data) => {
            return fsPromises.appendFile(
                `${dirPath}/bundle.css`,
                data.join('\n') + cssToAddToBundle
            );
        })
        .catch((err) => log.error(err));
}

function showHelp(message) {
    message.length ? log.error(message) : '';
    console.log(helpMessage);
}

function handleActionWithFile(action, args) {
    if (args[0] === '-f') {
        action(args[1]);
    } else if (args[0].startsWith('--file=')) {
        action(args[0].slice(7));
    } else {
        log.error('"--file" option is required for this action');
    }
}

function handleActions(actionName, args) {
    const filteredArgs = args.filter((arg) => arg !== '-h' && arg !== '--help');
    switch (actionName) {
        case 'reverse':
            reverse(args.join(' '));
            break;

        case 'transform':
            transform(args.join(' '));
            break;

        case 'transformV2':
            transformV2(args.join(' '));
            break;

        case 'transformV3':
            transformV3(args.join(' '));
            break;

        case 'transformV4':
            transformV4(args.join(' '));
            break;

        case 'outputFile':
            handleActionWithFile(outputFile, filteredArgs);
            break;

        case 'convertFromFile':
            handleActionWithFile(convertFromFile, filteredArgs);
            break;

        case 'convertToFile':
            handleActionWithFile(convertToFile, filteredArgs);
            break;

        case 'cssBundler':
            if (args[0] === '-p') {
                cssBundler(filteredArgs[1]);
            } else if (args[0].startsWith('--path=')) {
                cssBundler(filteredArgs[0].slice(7));
            } else {
                log.error('"--path" option is required for this action');
            }
            break;

        default:
            showHelp('Unknown action, please read help');
            break;
    }
}

const args = process.argv.slice(2);

if (args.length === 0 || args[0] === '-h' || args[0] === '--help') {
    !!args.length ? showHelp() : showHelp('Please use options');
} else if (args[0] === '-a') {
    handleActions(args[1], args.slice(2));
} else if (args[0].startsWith('--action=')) {
    handleActions(args[0].slice(9), args.slice(1));
} else {
    showHelp('Please provide valid options');
}
