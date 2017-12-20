/**
 * Enum describing the current state of application updates.
 */
export enum State {
    /**
     * Idling state.
     */
    IDLE,
    /**
     * Checking for avaibable application updates. This state has been preceded
     * by IDLE.
     */
    CHECKING_FOR_UPDATES,
    /**
     * Application updates are available. This state has been preceded by
     * CHECKING_FOR_UPDATES.
     */
    UPDATES_AVAILABLE,
    /**
     * Downloading application updates. This state has been preceded by
     * UPDATES_AVAILABLE.
     */
    DOWNLOADING_UPDATES,
    /**
     * Downloaded application updates. This state has been preceded by
     * DOWNLOADING_UPDATES.
     */
    DOWNLOADED_UPDATES,
}
