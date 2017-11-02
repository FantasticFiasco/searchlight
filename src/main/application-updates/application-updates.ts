import * as expect from '@fantasticfiasco/expect';
import { ProgressInfo } from 'builder-util-runtime';
import { ipcMain } from 'electron';
import { autoUpdater, VersionInfo } from 'electron-updater';

import { DownloadProgressEvent, NoUpdatesAvailableEvent, RestartRequiredEvent } from 'common/application-updates';
import * as ChannelNames from 'common/application-updates/channel-names';
import { Analytics } from '../analytics';
import * as log from '../log';
import { IApplicationUpdates } from './i-application-updates';
import { State } from './state';

/**
 * Class responsible for knowing when application updates are availale, and how
 * those updates are applied.
 */
export class ApplicationUpdates implements IApplicationUpdates {
    private readonly analytics: Analytics;
    private readonly webContents: Electron.WebContents;

    /**
     * The state of application updates.
     */
    public state: State;

    /**
     * Initializes a new instance of the class.
     * @param analytics capable of reporting to Universal Analytics
     * @param webContents the target for events sent from this class
     */
    constructor(analytics: Analytics, webContents: Electron.WebContents) {
        expect.toExist(analytics);
        expect.toExist(webContents);

        this.analytics = analytics;
        this.webContents = webContents;
        this.state = State.IDLE;

        // Register for messages sent from the renderer
        ipcMain.on(ChannelNames.APPLICATION_UPDATES_CHECK, () => this.checkForUpdates());
        ipcMain.on(ChannelNames.APPLICATION_UPDATES_APPLY, () => this.restartAndUpdate());
    }

    /**
     * Start application updates.
     */
    public start() {
        expect.toBeTrue(this.state === State.IDLE, 'Cannot start unless state is IDLE');

        log.info('ApplicationUpdates', 'start');

        autoUpdater.autoDownload = true;
        autoUpdater.logger = null;

        autoUpdater.on('checking-for-update', () => this.onCheckingForUpdates());
        autoUpdater.on('update-available', (version: VersionInfo) => this.onUpdateAvailable(version));
        autoUpdater.on('update-not-available', (version: VersionInfo) => this.onUpdateNotAvailable(version));
        autoUpdater.on('download-progress', (progress: ProgressInfo) => this.onDownloadProgress(progress));
        autoUpdater.on('update-downloaded', (version: VersionInfo) => this.onUpdateDownloaded(version));
        autoUpdater.on('error', (error: Error) => this.onError(error));
    }

    private async checkForUpdates() {
        log.info('ApplicationUpdates', 'check for updates');

        try {
            await autoUpdater.checkForUpdates();
        } catch (error) {
            this.onError(error);
        }
    }

    private restartAndUpdate() {
        expect.toBeTrue(this.state === State.DOWNLOADED_UPDATES, 'Cannot restart until updates are downloaded');

        log.info('ApplicationUpdates', 'restart and update');

        try {
            autoUpdater.quitAndInstall();
        } catch (error) {
            this.onError(error);
        }
    }

    private onCheckingForUpdates() {
        log.info('ApplicationUpdates', 'checking for updates');

        this.state = State.CHECKING_FOR_UPDATES;
    }

    private onUpdateAvailable(version: VersionInfo) {
        log.info('ApplicationUpdates', `update available with version ${version.version}`);

        this.state = State.UPDATES_AVAILABLE;
    }

    private onUpdateNotAvailable(version: VersionInfo) {
        log.info('ApplicationUpdates', `update not available (latest version: ${version.version}, downgrade is ${autoUpdater.allowDowngrade ? 'allowed' : 'disallowed'})`);

        this.state = State.IDLE;
        this.send(ChannelNames.APPLICATION_UPDATES, new NoUpdatesAvailableEvent());
    }

    private onDownloadProgress(progress: ProgressInfo) {
        log.debug('ApplicationUpdates', `download progress ${progress.percent.toFixed(2)}%`);

        this.state = State.DOWNLOADING_UPDATES;
        this.send(ChannelNames.APPLICATION_UPDATES, new DownloadProgressEvent(progress.percent));
    }

    private onUpdateDownloaded(version: VersionInfo) {
        log.info('ApplicationUpdates', `update with version ${version.version} has been downloaded`);

        this.state = State.DOWNLOADED_UPDATES;
        this.send(ChannelNames.APPLICATION_UPDATES, new RestartRequiredEvent());
    }

    private onError(error: Error) {
        log.error('ApplicationUpdates', 'error', error);

        this.state = State.IDLE;
        this.analytics.reportException(`${error.name}: ${error.message}`);
    }

    private send(channel: string, ...args: any[]) {
        if (!this.webContents.isDestroyed()) {
            this.webContents.send(channel, ...args);
        }
    }
}
