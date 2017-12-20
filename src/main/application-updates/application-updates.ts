import * as expect from '@fantasticfiasco/expect';
import { ipcMain } from 'electron';

import { isDev } from 'common';
import * as ChannelNames from 'common/application-updates/channel-names';
import { Analytics } from '../analytics';
import * as log from '../log';
import { IApplicationUpdater } from './i-application-updater';
import { DefaultUpdater, MockUpdater } from './updaters';

/**
 * Class responsible for knowing when application updates are availale, and how
 * those updates are applied.
 */
export class ApplicationUpdates {
    private readonly updater: IApplicationUpdater;

    /**
     * Initializes a new instance of the class.
     * @param analytics capable of reporting to Universal Analytics
     * @param window the target for events sent from this class
     */
    constructor(analytics: Analytics, window: Electron.BrowserWindow) {
        expect.toExist(analytics);
        expect.toExist(window);

        this.updater = this.createUpdater(analytics, window);

        // Register for messages sent from the renderer
        ipcMain.on(ChannelNames.APPLICATION_UPDATES_CHECK, async () => this.checkForUpdatesAsync());
        ipcMain.on(ChannelNames.APPLICATION_UPDATES_APPLY, () => this.restartAndUpdate());
    }

    /**
     * Start application updates.
     */
    public start() {
        log.info('ApplicationUpdates', 'start');

        this.updater.start();
    }

    private async checkForUpdatesAsync(): Promise<void> {
        log.info('ApplicationUpdates', 'check for updates');

        return this.updater.checkForUpdates();
    }

    private restartAndUpdate() {
        log.info('ApplicationUpdates', 'restart and update');

        this.restartAndUpdate();
    }

    private createUpdater(analytics: Analytics, window: Electron.BrowserWindow): IApplicationUpdater {
        // Use mocked updater in development
        if (isDev()) {
            return new MockUpdater(window);
        }

        return new DefaultUpdater(analytics, window.webContents);
    }
}
