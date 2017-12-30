/**
 * Names of IPC channels between main and renderer.
 */
export enum ApplicationUpdatesChannelName {
    /**
     * Channel name for messages sent from renderer to main, triggering a check
     * to determine whether application has any updates available.
     */
    Check = 'application-updates.check',

    /**
     * Channel name for messages sent from renderer to main, triggering the
     * application to restart and apply the updates.
     */
    Apply = 'application-updates.apply',

    /**
     * Channel name for messages sent from main to renderer, describing the
     * responses of checking for updates started on channel Check.
     */
    CheckResponse = 'application-updates.check.response',
}
