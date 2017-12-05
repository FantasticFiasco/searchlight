import { Platform } from './platform';

/**
 * Returns a value indicating whether application is running in development.
 * @return true if app is running in development; otherwise false
 */
export function isDev(): boolean {
    return process.env.NODE_ENV !== 'production';
}

/**
 * Returns the platform the application is running on.
 */
export function platform(): Platform {
    switch (process.platform) {
        case 'darwin':
            return Platform.MacOS;

        case 'win32':
            return Platform.Windows;

        default:
            return Platform.Linux;
    }
}

/**
 * Return a value indicating whether application is portable.
 * @returns true if application is portable; otherwise false
 */
export function isPortable(): boolean {
    return process.env.PORTABLE_EXECUTABLE_DIR !== undefined;
}
