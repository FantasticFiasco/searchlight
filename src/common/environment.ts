const isDevelopment = process.env.NODE_ENV !== 'production';

/**
 * Returns a value indicating whether application is running in development.
 * @return true if app is running in development; otherwise false
 */
export function isDev(): boolean {
    return isDevelopment;
}
