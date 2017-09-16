import * as expect from '@fantasticfiasco/expect';
import * as Axis from 'axis-discovery';
import { ipcMain } from 'electron';

import * as ChannelNames from 'common/channel-names';
import * as log from '../log';
import { IDiscovery } from './';

/**
 * Class mocking discovered Axis devices on the network for development
 * purpose.
 */
export class DiscoveryMock implements IDiscovery {
    private readonly webContents: Electron.WebContents;

    /**
     * Initializes a new instance of the class.
     */
    constructor(webContents: Electron.WebContents) {
        expect.toExist(webContents);

        this.webContents = webContents;

        // Register for messages sent from the renderer
        ipcMain.on(ChannelNames.DISCOVERY_SEARCH, () => this.onSearch());
    }

    /**
     * Start listen for device advertisements on all network interface
     * addresses and repeatedly trigger a search for devices.
     */
    public start(): Promise<void> {
        log.info('DiscoveryMock - start');
        return Promise.resolve();
    }

    /**
     * Stop listening for device advertisements.
     */
    public stop(): Promise<void> {
        log.info('DiscoveryMock - stop');
        return Promise.resolve();
    }

    private onSearch() {
        log.info('DiscoveryMock - search');

        for (let index = 0; index < 9; index++) {
            this.webContents.send(ChannelNames.DISCOVERY_DEVICE_HELLO, this.createDevice(index));
        }
    }

    private createDevice(index: number): Axis.Device {
        return new Axis.Device(
            `10.10.1.${index}`,
            undefined,
            80,
            `ACCC0000000${index}`,
            `Camera ${index}`,
            'AXIS M1014',
            'AXIS M1014 Fixed Network Camera',
            'M1014',
            `http://10.10.1.${index}:80/`);
    }
}
