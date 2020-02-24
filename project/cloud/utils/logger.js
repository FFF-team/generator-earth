const fs = require('fs');
const moment = require('moment');
const _ = require('lodash');

const winston = require('winston');
const dailyRotateFile = require('winston-daily-rotate-file');
const format = winston.format;



const _info = function(...args) {
    mainLogger.log('info', ...args)
}

const _error = function(...args) {
    mainLogger.log('error', ...args)
}



/**
 * Log info trace
 * @param {Object} args
 */
const info = function(...args) {
    let currTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    _info(
        '%s %s',
        currTime, _stringIt(args),
    );
}

/**
 * Log error trace
 * @param {Object} args
 */
const error = function(...args) {
    let currTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    _error(
        '%s %s',
        currTime, _stringIt(args),
    );
}



/**
 * Log info trace
 * @param {Object} ctx
 * @param {array-like} messages, each item can be a string/object/array
 */
const infoWithCtx = function(ctx, ...messages) {
    let currTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    _info(
        '%s %s %s ||| %s ||| %s',
        currTime, ctx.method, ctx.path + ctx.search,
        _stringIt(messages),
        ctx.ip,
    );
}

/**
 * Log error trace
 * @param {Object} ctx
 * @param {array-like} messages, each item can be a string/object/array/Error
 * best to place Error to the last
 */
const errorWithCtx = function(ctx, ...messages) {
    let currTime = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    _error(
        '%s %s %s ||| %s ||| %s',
        currTime, ctx.method, ctx.path + ctx.search,
        _stringIt(messages),
        ctx.ip,
    );
}



function _stringIt(messages) {
    return _.chain(messages)
            .map(function(msg){
                if ( _.isString(msg) ) {
                    return msg;
                } else if  ( _.isError(msg) ) {
                    return '\n' + msg.stack || msg.message || msg.toString() + '\n' ;
                } else {
                    return JSON.stringify(msg);
                }
            })
            .value()
            .join('|');
}




// cache
let mainLogger;


function init(LOG_DIR) {
    
    (function assureLogDir() {
        try {
            fs.statSync(LOG_DIR).isDirectory();
        } catch (err) {
            fs.mkdirSync(LOG_DIR)
        }
    })();
    
    mainLogger = winston.createLogger({
        level: 'info',
        format: format.combine(
            format.splat(),
            format.simple()
        ),
        transports: [
            new (winston.transports.Console)(),
            new (dailyRotateFile)({
                dirname: LOG_DIR,
                filename: 'app.log',
                datePattern: 'YYYY-MM-DD',
            }),
            new (dailyRotateFile)({
                dirname: LOG_DIR,
                filename: 'app.error.log',
                datePattern: 'YYYY-MM-DD',
                level: 'error',
            }),
        ]
    });
}



module.exports = function(LOG_DIR) {
    
    if (!mainLogger) {
        init(LOG_DIR);
    }
    
    return {
        info,
        error,
        infoWithCtx,
        errorWithCtx
    }
}
