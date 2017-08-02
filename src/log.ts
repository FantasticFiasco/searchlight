import * as log from 'electron-log';

export function debug(...params: any[]) {
    log.debug(...params);
}

export function info(...params: any[]) {
    log.info(...params);
}

export function warn(...params: any[]) {
    log.warn(...params);
}

export function error(...params: any[]) {
    log.error(...params);
}

log.transports.console.level = 'debug';
log.transports.file.level = 'debug';
