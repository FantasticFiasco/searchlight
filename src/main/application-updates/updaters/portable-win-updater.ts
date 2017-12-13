import { autoUpdater } from 'electron-updater';

import { Analytics } from '../../analytics';
import { DefaultUpdater } from './default-updater';

/**
 * Portable Windows updater responsible for knowing when application updates
 * are availale, and how those updates are applied.
 */
export class PortableWinUpdater extends DefaultUpdater {
    constructor(analytics: Analytics, webContents: Electron.WebContents) {
        super(analytics, webContents);

        autoUpdater.autoDownload = false;
    }
}
