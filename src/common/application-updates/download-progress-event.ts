/**
 * Event describing the progress of downloading application updates.
 */
export class DownloadProgressEvent {
    /**
     * The event kind.
     */
    public readonly kind = 'download-progress';

    /**
     * Initializes a new instance of the class.
     * @param progress progress in the range of 0-100
     */
    constructor(
        /**
         * The progress in the range of 0-100.
         */
        public readonly progress: number,
    ) {
    }
}
