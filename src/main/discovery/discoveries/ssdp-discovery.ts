import * as expect from '@fantasticfiasco/expect';
import { Device, Discovery } from 'axis-discovery-ssdp';

import { DiscoveryChannelName } from 'common/discovery';
import { HttpClient } from 'common/net';
import * as log from '../../log';
import { Cache } from './cache';
import { IDiscovery } from './i-discovery';

/**
 * Class discovering Axis devices on the network using SSDP.
 */
export class SsdpDiscovery implements IDiscovery {
    private readonly cache: Cache;
    private readonly discovery: Discovery;
    private readonly webContents: Electron.WebContents;

    /**
     * Initializes a new instance of the class.
     * @param webContents the target for events sent from this class
     */
    constructor(webContents: Electron.WebContents) {
        expect.toExist(webContents);

        this.cache = new Cache();
        this.discovery = new Discovery({ httpClient: new HttpClient() });
        this.discovery.onHello((device: Device) => this.onHello(device));
        this.discovery.onGoodbye((device: Device) => this.onGoodbye(device));
        this.webContents = webContents;
    }

    public start(): Promise<void> {
        log.info('SsdpDiscovery', 'start');
        return this.discovery.start();
    }

    public stop(): Promise<void> {
        log.info('SsdpDiscovery', 'stop');
        return this.discovery.stop();
    }

    public search(): Promise<void> {
        log.info('SsdpDiscovery', 'search');
        return this.discovery.search();
    }

    private onHello(device: Device) {
        log.debug('SsdpDiscovery', `hello from ${device.macAddress}`);
        device = this.cache.update(device);
        this.send(DiscoveryChannelName.Hello, device);
    }

    private onGoodbye(device: Device) {
        log.debug('SsdpDiscovery', `goodbye from ${device.macAddress}`);
        device = this.cache.update(device);
        this.send(DiscoveryChannelName.Goodbye, device);
    }

    private send(channel: string, ...args: any[]) {
        if (!this.webContents.isDestroyed()) {
            this.webContents.send(channel, ...args);
        }
    }
}
