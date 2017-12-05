import * as expect from '@fantasticfiasco/expect';
import { UpdateInfo } from 'builder-util-runtime';
import { autoUpdater } from 'electron-updater';

import { NoUpdatesAvailableEvent } from 'common/application-updates';
import * as ChannelNames from 'common/application-updates/channel-names';
import { Analytics } from '../../analytics';
import * as log from '../../log';
import { IApplicationUpdater } from '../i-application-updater';
import { State } from './state';

/**
 * Portable Windows updater responsible for knowing when application updates
 * are availale, and how those updates are applied.
 */
export class PortableWinUpdater implements IApplicationUpdater {
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

        log.info('PortableWinUpdater', 'start');

        autoUpdater.autoDownload = false;
        autoUpdater.logger = null;

        autoUpdater.on('checking-for-update', () => this.onCheckingForUpdates());
        autoUpdater.on('update-available', (version: UpdateInfo) => this.onUpdateAvailable(version));
        autoUpdater.on('update-not-available', (version: UpdateInfo) => this.onUpdateNotAvailable(version));
        autoUpdater.on('error', (error: Error) => this.onError(error));
    }

    public async checkForUpdates(): Promise<void> {
        log.info('PortableWinUpdater', 'check for updates');

        try {
            await autoUpdater.checkForUpdates();
        } catch (error) {
            this.onError(error);
        }
    }

    public restartAndUpdate() {
        // TODO: Implement
        // expect.toBeTrue(this.state === State.DOWNLOADED_UPDATES, 'Cannot restart until updates are downloaded');

        // log.info('PortableWinUpdater', 'restart and update');

        // try {
        //     autoUpdater.quitAndInstall();
        // } catch (error) {
        //     this.onError(error);
        // }
    }

    private onCheckingForUpdates() {
        log.info('PortableWinUpdater', 'checking for updates');

        this.state = State.CHECKING_FOR_UPDATES;
    }

    private onUpdateAvailable(version: UpdateInfo) {
        log.info('PortableWinUpdater', `update available with version ${version.version}`);

        this.state = State.UPDATES_AVAILABLE;
    }

    private onUpdateNotAvailable(version: UpdateInfo) {
        log.info('PortableWinUpdater', `update not available (latest version: ${version.version}, downgrade is ${autoUpdater.allowDowngrade ? 'allowed' : 'disallowed'})`);

        this.state = State.IDLE;
        this.send(ChannelNames.APPLICATION_UPDATES_CHECK_RESPONSE, new NoUpdatesAvailableEvent());
    }

    private onError(error: Error) {
        this.state = State.IDLE;
        this.send(ChannelNames.APPLICATION_UPDATES_CHECK_RESPONSE, new NoUpdatesAvailableEvent());

        this.analytics.reportException(`${error.name}: ${error.message}`);
    }

    private send(channel: string, ...args: any[]) {
        if (!this.webContents.isDestroyed()) {
            this.webContents.send(channel, ...args);
        }
    }
}
