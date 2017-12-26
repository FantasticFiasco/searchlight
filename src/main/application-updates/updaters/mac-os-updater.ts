import * as expect from '@fantasticfiasco/expect';
import { UpdateInfo } from 'builder-util-runtime';
import { shell } from 'electron';
import { autoUpdater } from 'electron-updater';

import { ApplicationUpdatesChannelName, NoUpdatesAvailableEvent, UpdatesAvailableEvent } from 'common/application-updates';
import { Analytics } from '../../analytics';
import * as log from '../../log';
import { IApplicationUpdater } from '../i-application-updater';
import { Asset, GitHub, Release } from './git-hub';
import { State } from './state';

/**
 * macOS updater responsible for knowing when application updates are
 * availale. The updater can only notify the user, it can't automatically apply
 * them. The reason for the poor usability is the fact that the application
 * isn't signed. If it was, we would be able to provide a more integrated
 * update flow. In other words, if the application get signed, this class
 * should be removed.
 */
export class MacOSUpdater implements IApplicationUpdater {
    private readonly analytics: Analytics;
    private readonly webContents: Electron.WebContents;
    private readonly gitHub: GitHub;

    private state: State;
    private downloadUrl: string;

    constructor(analytics: Analytics, webContents: Electron.WebContents) {
        expect.toExist(analytics);
        expect.toExist(webContents);

        this.analytics = analytics;
        this.webContents = webContents;
        this.gitHub = new GitHub();
        this.state = State.Idle;
    }

    public start() {
        expect.toBeTrue(this.state === State.Idle, 'Cannot start unless state is Idle');

        log.info('MacOSUpdater', 'start');

        autoUpdater.autoDownload = false;
        autoUpdater.logger = null;

        autoUpdater.on('checking-for-update', () => this.onCheckingForUpdates());
        autoUpdater.on('update-available', async (version: UpdateInfo) => await this.onUpdateAvailable(version));
        autoUpdater.on('update-not-available', (version: UpdateInfo) => this.onUpdateNotAvailable(version));
        autoUpdater.on('error', (error: Error) => this.onError(error));
    }

    public async checkForUpdates(): Promise<void> {
        log.info('MacOSUpdater', 'check for updates');

        try {
            await autoUpdater.checkForUpdates();
        } catch (error) {
            this.onError(error);
        }
    }

    public restartAndUpdate() {
        expect.toBeTrue(this.state === State.UpdatesAvailable, 'Cannot download and restart until updates available');

        log.info('MacOSUpdater', 'download and restart');

        try {
            shell.openExternal(this.downloadUrl);
        } catch (error) {
            this.onError(error);
        }
    }

    private onCheckingForUpdates() {
        log.info('MacOSUpdater', 'checking for updates');

        this.state = State.CheckingForUpdates;
    }

    private async onUpdateAvailable(version: UpdateInfo): Promise<void> {
        log.info('MacOSUpdater', `update available with version ${version.version}`);

        const latestRelease: Release = await this.gitHub.getLatestRelease();

        const dmgRegex = /.*\.dmg$/i;
        const dmg: Asset | undefined = latestRelease.assets.find((asset: Asset) => dmgRegex.test(asset.name));

        if (dmg && dmg.url) {
            this.downloadUrl = dmg.url;
            this.state = State.UpdatesAvailable;
            this.send(ApplicationUpdatesChannelName.CheckResponse, new UpdatesAvailableEvent());
        } else {
            log.error('MacOSUpdater', 'update available but without matching asset', dmg);
            this.onUpdateNotAvailable(version);
        }
    }

    private onUpdateNotAvailable(version: UpdateInfo) {
        log.info('MacOSUpdater', `update not available (latest version: ${version.version}, downgrade is ${autoUpdater.allowDowngrade ? 'allowed' : 'disallowed'})`);

        this.state = State.Idle;
        this.send(ApplicationUpdatesChannelName.CheckResponse, new NoUpdatesAvailableEvent());
    }

    private onError(error: Error) {
        log.error('MacOSUpdater', error);

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
