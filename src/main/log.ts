import * as log from 'electron-log';

import * as environment from 'common/environment';

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

if (environment.isDev()) {
    log.transports.console.level = 'debug';
    log.transports.file.level = 'debug';
} else {
    log.transports.console.level = false;
    log.transports.file.level = 'info';
}
