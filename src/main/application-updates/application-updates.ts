import * as expect from '@fantasticfiasco/expect';
import { ipcMain } from 'electron';

import { isDev, platform, Platform } from 'common';
import { ApplicationUpdatesChannelName } from 'common/application-updates';
import { Analytics } from '../analytics';
import { IApplicationUpdater } from './i-application-updater';
import { DefaultUpdater, MacOSUpdater, MockUpdater } from './updaters';

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
        ipcMain.on(ApplicationUpdatesChannelName.APPLICATION_UPDATES_CHECK, async () => this.checkForUpdatesAsync());
        ipcMain.on(ApplicationUpdatesChannelName.APPLICATION_UPDATES_APPLY, () => this.restartAndUpdate());
    }

    /**
     * Start application updates.
     */
    public start() {
        this.updater.start();
    }

    private async checkForUpdatesAsync(): Promise<void> {
        return this.updater.checkForUpdates();
    }

    private restartAndUpdate() {
        this.updater.restartAndUpdate();
    }

    private createUpdater(analytics: Analytics, window: Electron.BrowserWindow): IApplicationUpdater {
        // Use mocked updater in development
        if (isDev()) {
            return new MockUpdater(window);
        }

        if (platform() === Platform.MacOS) {
            return new MacOSUpdater(analytics, window.webContents);
        }

        return new DefaultUpdater(analytics, window.webContents);
    }
}
