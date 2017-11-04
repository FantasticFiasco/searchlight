import * as log from 'electron-log';

export function debug(context: string, ...params: any[]) {
    log.debug(`${context} -`, ...params);
}

export function info(context: string, ...params: any[]) {
    log.info(`${context} -`, ...params);
}

export function warn(context: string, ...params: any[]) {
    log.warn(`${context} -`, ...params);
}

export function error(context: string, ...params: any[]) {
    log.error(`${context} -`, ...params);
}

log.transports.console.level = 'debug';
log.transports.file.level = 'debug';
