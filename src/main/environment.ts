const development = process.env.NODE_ENV === 'development';

/**
 * @return true if app is running in development; otherwise false
 */
export function isDev(): boolean {
    return development;
}
