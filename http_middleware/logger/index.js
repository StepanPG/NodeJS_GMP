import winston from 'winston';

const cliLogger = winston.createLogger({
    format: winston.format.combine(winston.format.cli()),
    transports: [new winston.transports.Console()],
});

const logger = winston.createLogger({
    format: winston.format.combine(winston.format.prettyPrint()),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: `${__dirname}/../logs/log`,
        }),
    ],
});

module.exports = {
    cliLogger,
    logger,
};
