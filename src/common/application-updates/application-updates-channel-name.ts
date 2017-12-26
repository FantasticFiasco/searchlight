/**
 * Names of IPC channels between main and renderer.
 */
export enum ApplicationUpdatesChannelName {
    /**
     * Channel name for messages sent from renderer to main, triggering a check
     * to determine whether application has any updates available.
     */
    APPLICATION_UPDATES_CHECK = 'application-updates.check',

    /**
     * Channel name for messages sent from renderer to main, triggering the
     * application to restart and apply the updates.
     */
    APPLICATION_UPDATES_APPLY = 'application-updates.apply',

    /**
     * Channel name for messages sent from main to renderer, describing the
     * responses of checking for updates started on channel
     * APPLICATION_UPDATES_CHECK.
     */
    APPLICATION_UPDATES_CHECK_RESPONSE = 'application-updates.check.response',
}
