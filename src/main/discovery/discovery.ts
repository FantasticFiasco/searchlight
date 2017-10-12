import * as expect from '@fantasticfiasco/expect';
import * as Axis from 'axis-discovery';
import { ipcMain } from 'electron';

import * as ChannelNames from 'common/channel-names';
import * as log from '../log';
import { IDiscovery } from './';

/**
 * Class discovering Axis devices on the network.
 */
export class Discovery implements IDiscovery {
    private readonly discovery: Axis.Discovery;
    private readonly webContents: Electron.WebContents;

    /**
     * Initializes a new instance of the class.
     */
    constructor(webContents: Electron.WebContents) {
        expect.toExist(webContents);

        this.discovery = new Axis.Discovery();
        this.discovery.onHello((device: Axis.Device) => this.onHello(device));
        this.discovery.onGoodbye((device: Axis.Device) => this.onGoodbye(device));
        this.webContents = webContents;

        // Register for messages sent from the renderer
        ipcMain.on(ChannelNames.DISCOVERY_SEARCH, async () => await this.onSearch());
    }

    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    public start(): Promise<void> {
        log.info('Discovery - start');
        return this.discovery.start();
    }

    /**
     * Stop listening for device advertisements.
     */
    public stop(): Promise<void> {
        log.info('Discovery - stop');
        return this.discovery.stop();
    }

    private onSearch(): Promise<void> {
        log.info('Discovery - search');
        return this.discovery.search();
    }

    private onHello(device: Axis.Device) {
        log.debug(`Discovery - hello from ${device.macAddress}`);
        this.send(ChannelNames.DISCOVERY_DEVICE_HELLO, device);
    }

    private onGoodbye(device: Axis.Device) {
        log.debug(`Discovery - goodbye from ${device.macAddress}`);
        this.send(ChannelNames.DISCOVERY_DEVICE_GOODBYE, device);
    }

    private send(channel: string, ...args: any[]) {
        if (!this.webContents.isDestroyed()) {
            this.webContents.send(channel, ...args);
        }
    }
}
