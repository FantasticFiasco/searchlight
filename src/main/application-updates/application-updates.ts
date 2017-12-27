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
        ipcMain.on(ApplicationUpdatesChannelName.Check, () => this.checkForUpdatesAsync());
        ipcMain.on(ApplicationUpdatesChannelName.Apply, () => this.applyUpdates());
    }

    /**
     * Start application updates.
     */
    public start() {
        this.updater.start();
    }

    private checkForUpdatesAsync(): Promise<void> {
        return this.updater.checkForUpdates();
    }

    private applyUpdates() {
        this.updater.applyUpdates();
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
