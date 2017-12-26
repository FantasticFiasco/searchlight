import * as expect from '@fantasticfiasco/expect';
import { ProgressInfo, UpdateInfo } from 'builder-util-runtime';
import { autoUpdater } from 'electron-updater';

import {
    ApplicationUpdatesChannelName,
    DownloadProgressEvent,
    NoUpdatesAvailableEvent,
    RestartRequiredEvent,
    UpdatesAvailableEvent,
} from 'common/application-updates';
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
        this.state = State.Idle;
    }

    public start() {
        expect.toBeTrue(this.state === State.Idle, 'Cannot start unless state is Idle');

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
        expect.toBeTrue(this.state === State.DownloadedUpdates, 'Cannot restart until updates are downloaded');

        log.info('DefaultUpdater', 'restart and update');

        try {
            autoUpdater.quitAndInstall();
        } catch (error) {
            this.onError(error);
        }
    }

    private onCheckingForUpdates() {
        log.info('DefaultUpdater', 'checking for updates');

        this.state = State.CheckingForUpdates;
    }

    private onUpdateAvailable(version: UpdateInfo) {
        log.info('DefaultUpdater', `update available with version ${version.version}`);

        this.state = State.UpdatesAvailable;
        this.send(ApplicationUpdatesChannelName.CheckResponse, new UpdatesAvailableEvent());
    }

    private onUpdateNotAvailable(version: UpdateInfo) {
        log.info('DefaultUpdater', `update not available (latest version: ${version.version}, downgrade is ${autoUpdater.allowDowngrade ? 'allowed' : 'disallowed'})`);

        this.state = State.Idle;
        this.send(ApplicationUpdatesChannelName.CheckResponse, new NoUpdatesAvailableEvent());
    }

    private onDownloadProgress(progress: ProgressInfo) {
        log.info('DefaultUpdater', `download progress ${progress.percent.toFixed(2)}% (${progress.bytesPerSecond / 1024} kB/s)`);

        this.state = State.DownloadingUpdates;
        this.send(ApplicationUpdatesChannelName.CheckResponse, new DownloadProgressEvent(progress.percent));
    }

    private onUpdateDownloaded(version: UpdateInfo) {
        log.info('DefaultUpdater', `update with version ${version.version} has been downloaded`);

        this.state = State.DownloadedUpdates;
        this.send(ApplicationUpdatesChannelName.CheckResponse, new RestartRequiredEvent());
    }

    private onError(error: Error) {
        log.error('DefaultUpdater', error);

        this.state = State.Idle;
        this.send(ApplicationUpdatesChannelName.CheckResponse, new NoUpdatesAvailableEvent());

        this.analytics.reportException(`${error.name}: ${error.message}`);
    }

    private send(channel: string, ...args: any[]) {
        if (!this.webContents.isDestroyed()) {
            this.webContents.send(channel, ...args);
        }
    }
}
