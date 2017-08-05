import { ProgressInfo } from 'electron-builder-http';
import { autoUpdater, UpdateCheckResult } from 'electron-updater';

import { VersionInfo } from 'electron-builder-http/out/updateInfo';
import * as log from './log';

export class Updates {
    constructor() {
        autoUpdater.logger = null;

        // The following callbacks are available:
        // - 'checking-for-update'
        // - 'update-available'
        // - 'update-not-available'
        // - 'download-progress'
        // - 'update-downloaded'
        // - 'error'
        autoUpdater.on('checking-for-update', () => {
            log.info('Updates - checking for update');
        });

        autoUpdater.on('update-available', (versionInfo: VersionInfo) => {
            log.info(`Updates - update available with version ${versionInfo.version}`);
        });

        autoUpdater.on('update-not-available', (versionInfo: VersionInfo) => {
            log.info(`Updates - update not available (latest version: ${versionInfo.version}, downgrade is ${autoUpdater.allowDowngrade ? 'allowed' : 'disallowed'})`);
        });

        autoUpdater.on('download-progress', (progress: ProgressInfo) => {
            log.debug(`Updates - download progress ${progress.percent.toFixed(2)}%`);
        });

        autoUpdater.on('update-downloaded', (versionInfo: VersionInfo) => {
            log.info(`Updates - update with version ${versionInfo.version} has been downloaded, starting installation`);
            autoUpdater.quitAndInstall();
        });

        autoUpdater.on('error', (error: Error) => {
            log.error('Updates', error);
        });
    }

    public checkForUpdates(): Promise<UpdateCheckResult> {
        return autoUpdater.checkForUpdates();
    }
}
