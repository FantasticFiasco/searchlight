import { ipcRenderer } from 'electron';

import { ApplicationUpdatesChannelName, CheckForUpdatesEventTypes } from 'common/application-updates';
import {
    ApplicationUpdatesState,
    store,
    UPDATE_DOWNLOAD_PROGRESS_MUTATION,
    UPDATE_STATE_MUTATION,
} from '../store';

/**
 * Key for the application updates service in the Vue dependency injection framework.
 */
export const APPLICATION_UPDATES_SERVICE = Symbol();

/**
 * Class acting as a proxy between the main and renderer process, capable of
 * knowing when application updates are availale, and how those updates are
 * applied. The service has the responsible of keeping the store up to date.
 */
export class ApplicationUpdatesService {
    /**
     * Initializes a new instance of the class.
     */
    constructor() {
        ipcRenderer.on(
            ApplicationUpdatesChannelName.APPLICATION_UPDATES_CHECK_RESPONSE,
            (event: any, args: CheckForUpdatesEventTypes) => this.onEvent(args));
    }

    /**
     * Check whether any application updates are available.
     */
    public checkForUpdates() {
        store.commit(UPDATE_STATE_MUTATION, ApplicationUpdatesState.CHECKING);
        ipcRenderer.send(ApplicationUpdatesChannelName.APPLICATION_UPDATES_CHECK);
    }

    /**
     * Restart and update the application.
     */
    public restartToUpdate() {
        ipcRenderer.send(ApplicationUpdatesChannelName.APPLICATION_UPDATES_APPLY);
    }

    private onEvent(event: CheckForUpdatesEventTypes) {
        switch (event.kind) {
            case 'no-updates-available':
                store.commit(UPDATE_STATE_MUTATION, ApplicationUpdatesState.IDLE);
                break;

            case 'download-progress':
                store.commit(UPDATE_DOWNLOAD_PROGRESS_MUTATION, event.progress);
                break;

            case 'restart-required':
                store.commit(UPDATE_STATE_MUTATION, ApplicationUpdatesState.RESTART_REQUIRED);
                break;
        }
    }
}
