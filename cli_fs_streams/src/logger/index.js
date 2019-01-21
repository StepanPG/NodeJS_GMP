const winston = require('winston');

const logger = winston.createLogger({
    format: winston.format.combine(winston.format.cli()),
    transports: [new winston.transports.Console()],
});

module.exports = logger;
