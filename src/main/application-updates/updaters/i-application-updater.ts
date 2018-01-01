/**
 * Interface responsible for knowing when application updates are availale, and
 * how those updates are applied.
 */
export interface IApplicationUpdater {
    /**
     * Start application updates.
     */
    start(): void;

    /**
     * Check whether any application updates are available.
     */
    checkForUpdates(): Promise<void>;

    /**
     * Apply application updates. On most platforms this requires a restart.
     */
    applyUpdates(): void;
}
