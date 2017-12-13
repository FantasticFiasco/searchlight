/**
 * Event describing that application updates are available, i.e. the current
 * version is latest.
 */
export class UpdatesAvailableEvent {
    /**
     * The event kind.
     */
    public readonly kind = 'updates-available';

    /**
     * Initializes a new instance of the class.
     * @param version the updated version
     * @param files the update files
     */
    constructor(
        /**
         * The updated version.
         */
        public readonly version: string,
        /**
         * The update files.
         */
        public readonly files: string[],
    ) {
    }
}
