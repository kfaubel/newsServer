"use strict";

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

// Set up winston logging.
const logFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(
        label({ label: 'app.js' }),
        format.colorize(),
        format.simple(),
        format.timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console({timestamp: true}),
        new transports.File({ filename: 'PhotoData.log', timestamp: true })
    ]
});

//logger.level = 'silly';
logger.exitOnError = false;

logger.setLevel = (level) => { logger.level = level};

module.exports=logger;