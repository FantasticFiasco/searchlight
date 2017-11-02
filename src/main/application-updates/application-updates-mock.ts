import * as expect from '@fantasticfiasco/expect';

import * as ChannelNames from 'common/application-updates/channel-names';
import * as log from '../log';

/**
 * Class mocking application updates for development purpose.
 */
export class ApplicationUpdatesMock {
    private readonly webContents: Electron.WebContents;

    /**
     * Initializes a new instance of the class.
     * @param analytics capable of reporting to Universal Analytics
     */
    constructor(webContents: Electron.WebContents) {
        expect.toExist(webContents);

        this.webContents = webContents;

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

    private async checkForUpdates() {
        log.info('ApplicationUpdatesMock', 'check for updates');
    }

    private restartAndUpdate() {
        log.info('ApplicationUpdatesMock', 'restart and update');
    }
}
