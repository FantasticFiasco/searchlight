import * as expect from '@fantasticfiasco/expect';
import { ipcMain } from 'electron';

import { DownloadProgressEvent, NoUpdatesAvailableEvent, RestartRequiredEvent } from 'common/application-updates';
import * as ChannelNames from 'common/application-updates/channel-names';
import * as log from '../log';
import { IApplicationUpdates } from './i-application-updates';

/**
 * Class mocking application updates for development purpose.
 */
export class ApplicationUpdatesMock implements IApplicationUpdates {
    private readonly window: Electron.BrowserWindow;
    private readonly isUpdateAvailable: boolean;

    /**
     * Initializes a new instance of the class.
     * @param analytics capable of reporting to Universal Analytics
     */
    constructor(window: Electron.BrowserWindow) {
        expect.toExist(window);

        this.window = window;
        this.isUpdateAvailable = true;

        // Register for messages sent from the renderer
        ipcMain.on(ChannelNames.APPLICATION_UPDATES_CHECK, () => this.checkForUpdates());
        ipcMain.on(ChannelNames.APPLICATION_UPDATES_APPLY, () => this.restartAndUpdate());
    }

    /**
     * Start application updates.
     */
    public start() {
        log.info('ApplicationUpdatesMock', 'start');
    }

    private checkForUpdates() {
        log.info('ApplicationUpdatesMock', 'check for updates');

        setTimeout(
            async () => {
                if (this.isUpdateAvailable) {
                    for (let i = 0; i < 10; i++) {
                        const progress = 11.111 * i;
                        log.info('ApplicationUpdatesMock', 'send download progress', progress);
                        this.send(ChannelNames.APPLICATION_UPDATES, new DownloadProgressEvent(progress));
                        await this.sleep(1000);
                    }
                    log.info('ApplicationUpdatesMock', 'send restart required');
                    this.send(ChannelNames.APPLICATION_UPDATES, new RestartRequiredEvent());
                } else {
                    log.info('ApplicationUpdatesMock', 'send no updates available');
                    this.send(ChannelNames.APPLICATION_UPDATES, new NoUpdatesAvailableEvent());
                }
            },
            5000);
    }

    private restartAndUpdate() {
        log.info('ApplicationUpdatesMock', 'restart and update');

        this.window.close();
    }

    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

    private send(channel: string, ...args: any[]) {
        if (!this.window.webContents.isDestroyed()) {
            this.window.webContents.send(channel, ...args);
        }
    }
}
