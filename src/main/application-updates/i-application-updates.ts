/**
 * Interface responsible for knowing when application updates are availale, and
 * how those updates are applied.
 */
export interface IApplicationUpdates {
    /**
     * Start application updates.
     */
    start(): void;
}
