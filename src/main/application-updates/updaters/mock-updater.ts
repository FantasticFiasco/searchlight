import * as expect from '@fantasticfiasco/expect';

import {
    ApplicationUpdatesChannelName,
    DownloadProgressEvent,
    NoUpdatesAvailableEvent,
    RestartRequiredEvent,
} from 'common/application-updates';
import * as log from '../../log';
import { IApplicationUpdater } from '../i-application-updater';

/**
 * Class mocking application updates for development purpose.
 */
export class MockUpdater implements IApplicationUpdater {
    private readonly window: Electron.BrowserWindow;
    private readonly isUpdateAvailable: boolean;

    constructor(window: Electron.BrowserWindow) {
        expect.toExist(window);

        this.window = window;
        this.isUpdateAvailable = true;
    }

    public start() {
        log.info('MockUpdater', 'start');
    }

    public checkForUpdates(): Promise<void> {
        log.info('MockUpdater', 'check for updates');

        setTimeout(
            async () => {
                if (this.isUpdateAvailable) {
                    await this.simulateUpdatesAvailable();
                } else {
                    await this.simulateNoUpdatesAvailable();
                }
            },
            5000);

        return Promise.resolve();
    }

    public restartAndUpdate() {
        log.info('MockUpdater', 'restart and update');

        this.window.close();
    }

    private async simulateUpdatesAvailable(): Promise<void> {
        for (let i = 0; i < 10; i++) {
            const progress = 11.111 * i;

            log.info('MockUpdater', 'send download progress', progress);
            this.send(ApplicationUpdatesChannelName.APPLICATION_UPDATES_CHECK_RESPONSE, new DownloadProgressEvent(progress));

            await this.sleep(1000);
        }

        log.info('MockUpdater', 'send restart required');
        this.send(ApplicationUpdatesChannelName.APPLICATION_UPDATES_CHECK_RESPONSE, new RestartRequiredEvent());
    }

    private async simulateNoUpdatesAvailable(): Promise<void> {
        log.info('MockUpdater', 'send no updates available');
        this.send(ApplicationUpdatesChannelName.APPLICATION_UPDATES_CHECK_RESPONSE, new NoUpdatesAvailableEvent());
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
