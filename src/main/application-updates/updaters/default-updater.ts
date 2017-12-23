import * as expect from '@fantasticfiasco/expect';
import { ProgressInfo, UpdateInfo } from 'builder-util-runtime';
import { autoUpdater } from 'electron-updater';

import { DownloadProgressEvent, NoUpdatesAvailableEvent, RestartRequiredEvent } from 'common/application-updates';
import * as channelNames from 'common/application-updates/channel-names';
import { Analytics } from '../../analytics';
import * as log from '../../log';
import { IApplicationUpdater } from '../i-application-updater';
import { State } from './state';

/**
 * Default updater responsible for knowing when application updates are
 * availale, and how those updates are applied.
 */
export class DefaultUpdater implements IApplicationUpdater {
    private readonly analytics: Analytics;
    private readonly webContents: Electron.WebContents;

    private state: State;

    constructor(analytics: Analytics, webContents: Electron.WebContents) {
        expect.toExist(analytics);
        expect.toExist(webContents);

        this.analytics = analytics;
        this.webContents = webContents;
        this.state = State.IDLE;
    }

    public start() {
        expect.toBeTrue(this.state === State.IDLE, 'Cannot start unless state is IDLE');

        log.info('DefaultUpdater', 'start');

        autoUpdater.autoDownload = true;
        autoUpdater.logger = null;

        autoUpdater.on('checking-for-update', () => this.onCheckingForUpdates());
        autoUpdater.on('update-available', (version: UpdateInfo) => this.onUpdateAvailable(version));
        autoUpdater.on('update-not-available', (version: UpdateInfo) => this.onUpdateNotAvailable(version));
        autoUpdater.on('download-progress', (progress: ProgressInfo) => this.onDownloadProgress(progress));
        autoUpdater.on('update-downloaded', (version: UpdateInfo) => this.onUpdateDownloaded(version));
        autoUpdater.on('error', (error: Error) => this.onError(error));
    }

    public async checkForUpdates(): Promise<void> {
        log.info('DefaultUpdater', 'check for updates');

        try {
            await autoUpdater.checkForUpdates();
        } catch (error) {
            this.onError(error);
        }
    }

    public restartAndUpdate() {
        expect.toBeTrue(this.state === State.DOWNLOADED_UPDATES, 'Cannot restart until updates are downloaded');

        log.info('DefaultUpdater', 'restart and update');

        try {
            autoUpdater.quitAndInstall();
        } catch (error) {
            this.onError(error);
        }
    }

    private onCheckingForUpdates() {
        log.info('DefaultUpdater', 'checking for updates');

        this.state = State.CHECKING_FOR_UPDATES;
    }

    private onUpdateAvailable(version: UpdateInfo) {
        log.info('DefaultUpdater', `update available with version ${version.version}`);

        this.state = State.UPDATES_AVAILABLE;
    }

    private onUpdateNotAvailable(version: UpdateInfo) {
        log.info('DefaultUpdater', `update not available (latest version: ${version.version}, downgrade is ${autoUpdater.allowDowngrade ? 'allowed' : 'disallowed'})`);

        this.state = State.IDLE;
        this.send(channelNames.APPLICATION_UPDATES_CHECK_RESPONSE, new NoUpdatesAvailableEvent());
    }

    private onDownloadProgress(progress: ProgressInfo) {
        log.info('DefaultUpdater', `download progress ${progress.percent.toFixed(2)}% (${progress.bytesPerSecond / 1024} kB/s)`);

        this.state = State.DOWNLOADING_UPDATES;
        this.send(channelNames.APPLICATION_UPDATES_CHECK_RESPONSE, new DownloadProgressEvent(progress.percent));
    }

    private onUpdateDownloaded(version: UpdateInfo) {
        log.info('DefaultUpdater', `update with version ${version.version} has been downloaded`);

        this.state = State.DOWNLOADED_UPDATES;
        this.send(channelNames.APPLICATION_UPDATES_CHECK_RESPONSE, new RestartRequiredEvent());
    }

    private onError(error: Error) {
        log.error('DefaultUpdater', error);

        this.state = State.IDLE;
        this.send(channelNames.APPLICATION_UPDATES_CHECK_RESPONSE, new NoUpdatesAvailableEvent());

        this.analytics.reportException(`${error.name}: ${error.message}`);
    }

    private send(channel: string, ...args: any[]) {
        if (!this.webContents.isDestroyed()) {
            this.webContents.send(channel, ...args);
        }
    }
}
