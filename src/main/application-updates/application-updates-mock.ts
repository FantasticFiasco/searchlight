import * as expect from '@fantasticfiasco/expect';
import { ipcMain } from 'electron';

import { DownloadProgressEvent, NoUpdatesAvailableEvent, RestartRequiredEvent } from 'common/application-updates';
import * as ChannelNames from 'common/application-updates/channel-names';
import * as log from '../log';
import { IApplicationUpdates } from './i-application-updates';
import { State } from './state';

/**
 * Class mocking application updates for development purpose.
 */
export class ApplicationUpdatesMock implements IApplicationUpdates {
    private readonly window: Electron.BrowserWindow;
    private readonly isUpdateAvailable: boolean;

    /**
     * The state of application updates.
     */
    public state: State;

    /**
     * Initializes a new instance of the class.
     * @param window the target for events sent from this class
     */
    constructor(window: Electron.BrowserWindow) {
        expect.toExist(window);

        this.window = window;
        this.isUpdateAvailable = true;
        this.state = State.IDLE;

        // Register for messages sent from the renderer
        ipcMain.on(ChannelNames.APPLICATION_UPDATES_CHECK, () => this.checkForUpdatesAsync());
        ipcMain.on(ChannelNames.APPLICATION_UPDATES_APPLY, () => this.restartAndUpdate());
    }

    /**
     * Start application updates.
     */
    public start() {
        log.info('ApplicationUpdatesMock', 'start');
    }

    private checkForUpdatesAsync() {
        log.info('ApplicationUpdatesMock', 'check for updates');

        this.state = State.CHECKING_FOR_UPDATES;

        setTimeout(
            async () => {
                if (this.isUpdateAvailable) {
                    await this.simulateUpdatesAvailable();
                } else {
                    await this.simulateNoUpdatesAvailable();
                }
            },
            5000);
    }

    private restartAndUpdate() {
        log.info('ApplicationUpdatesMock', 'restart and update');

        this.window.close();
    }

    private async simulateUpdatesAvailable(): Promise<void> {
        this.state = State.DOWNLOADING_UPDATES;

        for (let i = 0; i < 10; i++) {
            const progress = 11.111 * i;

            log.info('ApplicationUpdatesMock', 'send download progress', progress);
            this.send(ChannelNames.APPLICATION_UPDATES_CHECK_RESPONSE, new DownloadProgressEvent(progress));

            await this.sleep(1000);
        }

        this.state = State.DOWNLOADED_UPDATES;

        log.info('ApplicationUpdatesMock', 'send restart required');
        this.send(ChannelNames.APPLICATION_UPDATES_CHECK_RESPONSE, new RestartRequiredEvent());
    }

    private async simulateNoUpdatesAvailable(): Promise<void> {
        this.state = State.IDLE;

        log.info('ApplicationUpdatesMock', 'send no updates available');
        this.send(ChannelNames.APPLICATION_UPDATES_CHECK_RESPONSE, new NoUpdatesAvailableEvent());
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
