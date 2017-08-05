const development = process.env.NODE_ENV === 'development';

/**
 * Returns a value indicating whether application is running in development
 * @return true if app is running in development; otherwise false
 */
export function isDev(): boolean {
    return development;
}
