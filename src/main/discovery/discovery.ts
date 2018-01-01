import { ipcMain } from 'electron';

import { isDev } from 'common';
import { DiscoveryChannelName } from 'common/discovery';
import { IDiscovery, MockDiscovery, SsdpDiscovery } from './discoveries';

/**
 * Class discovering Axis devices on the network.
 */
export class Discovery {
    private readonly discovery: IDiscovery;

    /**
     * Initializes a new instance of the class.
     * @param webContents the target for events sent from this class
     */
    constructor(webContents: Electron.WebContents) {
        this.discovery = isDev() ?
            new MockDiscovery(webContents) :
            new SsdpDiscovery(webContents);

        // Register for messages sent from the renderer
        ipcMain.on(DiscoveryChannelName.Search, async () => await this.discovery.search());
    }

    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    public start(): Promise<void> {
        return this.discovery.start();
    }

    /**
     * Stop listening for device advertisements.
     */
    public stop(): Promise<void> {
        return this.discovery.stop();
    }
}
