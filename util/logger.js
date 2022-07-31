'use strict';

const winston = require('winston');
const _ = require('lodash');
const moment = require('moment-timezone');
const { createLogger, format } = require('winston');
const { combine, label, printf } = format;

const defaultLogTransports = [
  new winston.transports.Console({
    json: true,
    colorize: true
  })
];

const errorLogTransports = [
  new winston.transports.Console({
    json: true,
    colorize: true,
    level: 'error'
  })
];

const getLogger = () => createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    label({
      label: 'URL-Parser'
    }),
    format.splat(),
    winston.format.colorize(),
    printf(info => `${moment().format()} [${info.label}] ${info.level}: ${info.message}`)
  ),
  transports: _.uniq(_.concat(defaultLogTransports, errorLogTransports)),
  exceptionHandlers: [
    new winston.transports.Console({
      json: true,
      colorize: true,
      level: 'error'
    })
  ],
  exitOnError: false
});

module.exports = { getLogger };