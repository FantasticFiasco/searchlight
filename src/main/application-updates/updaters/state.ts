/**
 * Enum describing the current state of application updates.
 */
export enum State {
    /**
     * Idling state.
     */
    Idle,
    /**
     * Checking for avaibable application updates. This state has been preceded
     * by Idle.
     */
    CheckingForUpdates,
    /**
     * Application updates are available. This state has been preceded by
     * CheckingForUpdates.
     */
    UpdatesAvailable,
    /**
     * Downloading application updates. This state has been preceded by
     * UpdatesAvailable.
     */
    DownloadingUpdates,
    /**
     * Downloaded application updates. This state has been preceded by
     * DownloadingUpdates.
     */
    DownloadedUpdates,
}
