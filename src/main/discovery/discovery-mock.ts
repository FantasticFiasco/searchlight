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
    private readonly connectedDevices: Axis.Device[];
    private readonly disconnectedDevices: Axis.Device[];

    /**
     * Initializes a new instance of the class.
     */
    constructor(webContents: Electron.WebContents) {
        expect.toExist(webContents);

        this.webContents = webContents;
        this.connectedDevices = [];
        this.disconnectedDevices = [];

        // Register for messages sent from the renderer
        ipcMain.on(ChannelNames.DISCOVERY_SEARCH, () => this.onSearch());

        for (let index = 1; index <= 5; index++) {
            this.connectedDevices.push(this.createDevice(index));
        }

        setInterval(() => this.onSimulateConnectionStatus(), 5000);
    }

    /**
     * Start listen for device advertisements on all network interface
     * addresses.
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

        for (const device of this.connectedDevices) {
            this.webContents.send(ChannelNames.DISCOVERY_DEVICE_HELLO, device);
        }
    }

    private onSimulateConnectionStatus() {
        const result = Math.random();

        if (result < 0.5) {
            log.info('DiscoveryMock - no connect/disconnect update');
            return;
        }

        if (result < 0.75 && this.connectedDevices.length > 0) {
            log.info('DiscoveryMock - simulate disconnection');

            const index = Math.floor(this.connectedDevices.length * Math.random());
            const disconnectedDevice = this.connectedDevices.splice(index, 1)[0];
            this.disconnectedDevices.push(disconnectedDevice);

            this.webContents.send(ChannelNames.DISCOVERY_DEVICE_GOODBYE, disconnectedDevice);
        } else if (this.disconnectedDevices.length > 0) {
            log.info('DiscoveryMock - simulate connection');

            const index = Math.floor(this.disconnectedDevices.length * Math.random());
            const connectedDevice = this.disconnectedDevices.splice(index, 1)[0];
            this.connectedDevices.push(connectedDevice);

            this.webContents.send(ChannelNames.DISCOVERY_DEVICE_HELLO, connectedDevice);
        }
    }

    private createDevice(index: number): Axis.Device {
        const address = `10.10.1.${index}`;
        const linkLocalAddress = `192.168.1.${index}`;
        const port = Math.random() > 0.5 ? 80 : 443;
        const macAddress = `ACCCABCDEFG${index}`;
        const friendlyName = 'Name |' + Array(Math.floor(40 * Math.random())).join('a') + '|';
        const modelName = 'AXIS M1014';
        const modelDescription = 'AXIS M1014 Fixed Network Camera';
        const modelNumber = 'M1014';
        const presentationUrl = `http://${address}:${port}/`;

        return new Axis.Device(
            address,
            linkLocalAddress,
            port,
            macAddress,
            friendlyName,
            modelName,
            modelDescription,
            modelNumber,
            presentationUrl);
    }
}
