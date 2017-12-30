import * as expect from '@fantasticfiasco/expect';
import * as ssdp from 'axis-discovery-ssdp';
import { ipcMain } from 'electron';

import * as channelNames from 'common/discovery/channel-names';
import * as log from '../log';
import { HttpClient } from './http-client';
import { IDiscovery } from './i-discovery';

/**
 * Class discovering Axis devices on the network.
 */
export class Discovery implements IDiscovery {
    private readonly discovery: ssdp.Discovery;
    private readonly webContents: Electron.WebContents;

    /**
     * Initializes a new instance of the class.
     * @param webContents the target for events sent from this class
     */
    constructor(webContents: Electron.WebContents) {
        expect.toExist(webContents);

        this.discovery = new ssdp.Discovery({ httpClient: new HttpClient() });
        this.discovery.onHello((device: ssdp.Device) => this.onHello(device));
        this.discovery.onGoodbye((device: ssdp.Device) => this.onGoodbye(device));
        this.webContents = webContents;

        // Register for messages sent from the renderer
        ipcMain.on(channelNames.DISCOVERY_SEARCH, async () => await this.onSearch());
    }

    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    public start(): Promise<void> {
        log.info('Discovery', 'start');
        return this.discovery.start();
    }

    /**
     * Stop listening for device advertisements.
     */
    public stop(): Promise<void> {
        log.info('Discovery', 'stop');
        return this.discovery.stop();
    }

    private onSearch(): Promise<void> {
        log.info('Discovery', 'search');
        return this.discovery.search();
    }

    private onHello(device: ssdp.Device) {
        log.debug('Discovery', `hello from ${device.macAddress}`);
        this.send(channelNames.DISCOVERY_DEVICE_HELLO, device);
    }

    private onGoodbye(device: ssdp.Device) {
        log.debug('Discovery', `goodbye from ${device.macAddress}`);
        this.send(channelNames.DISCOVERY_DEVICE_GOODBYE, device);
    }

    private send(channel: string, ...args: any[]) {
        if (!this.webContents.isDestroyed()) {
            this.webContents.send(channel, ...args);
        }
    }
}
