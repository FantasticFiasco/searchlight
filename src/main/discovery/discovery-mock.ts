import * as expect from '@fantasticfiasco/expect';
import * as ssdp from 'axis-discovery-ssdp';
import { ipcMain } from 'electron';

import * as channelNames from 'common/discovery/channel-names';
import * as log from '../log';
import { IDiscovery } from './i-discovery';

/**
 * Class mocking discovered Axis devices on the network for development
 * purpose.
 */
export class DiscoveryMock implements IDiscovery {
    private readonly webContents: Electron.WebContents;
    private readonly connectedDevices: ssdp.Device[];
    private readonly disconnectedDevices: ssdp.Device[];

    /**
     * Initializes a new instance of the class.
     */
    constructor(webContents: Electron.WebContents) {
        expect.toExist(webContents);

        this.webContents = webContents;
        this.connectedDevices = [];
        this.disconnectedDevices = [];

        // Register for messages sent from the renderer
        ipcMain.on(channelNames.DISCOVERY_SEARCH, () => this.onSearch());

        for (const device of this.createDevices()) {
            this.connectedDevices.push(device);
        }

        setInterval(() => this.onSimulateConnectionStatus(), 5000);
    }

    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    public start(): Promise<void> {
        log.info('DiscoveryMock', 'start');
        return Promise.resolve();
    }

    /**
     * Stop listening for device advertisements.
     */
    public stop(): Promise<void> {
        log.info('DiscoveryMock', 'stop');
        return Promise.resolve();
    }

    private onSearch() {
        log.info('DiscoveryMock', 'search');

        for (const device of this.connectedDevices) {
            this.send(channelNames.DISCOVERY_DEVICE_HELLO, device);
        }
    }

    private onSimulateConnectionStatus() {
        const result = Math.random();

        if (result < 0.5) {
            log.info('DiscoveryMock', 'no connect/disconnect update');
            return;
        }

        if (result < 0.75 && this.connectedDevices.length > 0) {
            log.info('DiscoveryMock', 'simulate disconnection');

            const index = Math.floor(this.connectedDevices.length * Math.random());
            const disconnectedDevice = this.connectedDevices.splice(index, 1)[0];
            this.disconnectedDevices.push(disconnectedDevice);

            this.send(channelNames.DISCOVERY_DEVICE_GOODBYE, disconnectedDevice);
        } else if (this.disconnectedDevices.length > 0) {
            log.info('DiscoveryMock', 'simulate connection');

            const index = Math.floor(this.disconnectedDevices.length * Math.random());
            const connectedDevice = this.disconnectedDevices.splice(index, 1)[0];
            this.connectedDevices.push(connectedDevice);

            this.send(channelNames.DISCOVERY_DEVICE_HELLO, connectedDevice);
        }
    }

    private send(channel: string, ...args: any[]) {
        if (!this.webContents.isDestroyed()) {
            this.webContents.send(channel, ...args);
        }
    }

    private createDevices(): ssdp.Device[] {
        return [
            this.createDevice('10.15.123.217', '000000000000', 'AXIS P7210 Group 2 - 00408CB9F75B', 'AXIS P7210', 'AXIS P7210 Video Encoder', 'P7210'),
            this.createDevice('172.25.125.59', '111111111111', 'AXIS M3014 - 00408C99C075', 'AXIS M3014', 'AXIS M3014 Network Fixed Dome Camera', 'M3014'),
            this.createDevice('200.122.225.163', '999999999999', 'AXIS A1001 - 00408C184CC2', 'AXIS A1001', 'AXIS A1001 Network Door Controller', 'A1001'),
            this.createDevice('2.3.4.5', '666666666666', 'AXIS P3367 - ACCC8E039BAA', 'AXIS P3367', 'AXIS P3367 Fixed Dome Network Camera', 'P3367'),
            this.createDevice('10.25.125.158', 'AAAAAAAAAAAA', 'AXIS P1346 - 00408CDD131C', 'AXIS P1346', 'AXIS P1346 Network Camera', 'P1346'),
            this.createDevice('10.25.125.93', 'FFFFFFFFFFFF', 'AXIS M3007 - 00408CC65921', 'AXIS M3007', 'AXIS M3007 Network Camera', 'M3007'),
            this.createDevice('13.25.125.0', '222222222222', 'AXIS P1347 - 00408CAD1600', 'AXIS P1347', 'AXIS P1347 Network Camera', 'P1347'),
            this.createDevice('124.25.126.178', 'BBBBBBBBBBBB', 'AXIS M5014 - 00408CC10F31', 'AXIS M5014', 'AXIS M5014 PTZ Dome Network Camera', 'M5014'),
            this.createDevice('178.25.125.228', '777777777777', 'AXIS M3025 - ACCC8E69569B', 'AXIS M3025', 'AXIS M3025 Network Camera', 'M3025'),
            this.createDevice('177.25.127.26', '1234567890ABCD', 'AXIS P3344 - 00408CB58276', 'AXIS P3344', 'AXIS P3344 Fixed Dome Network Camera', 'P3344'),
            this.createDevice('126.25.127.220', 'DCBA0987654321', 'AXIS P3343 - 00408C10126F', 'AXIS P3343', 'AXIS P3343 Fixed Dome Network Camera', 'P3343'),
            this.createDevice('143.25.125.146', 'DDCCBBAA001122', 'AXIS M3005 - 00408CE36125', 'AXIS M3005', 'AXIS M3005 Network Camera', 'M3005'),
            this.createDevice('121.25.127.46', 'EEEEEEEEEEEEEE', 'AXIS P1344 - 00408CA0C186', 'AXIS P1344', 'AXIS P1344 Network Camera', 'P1344'),
            this.createDevice('167.25.127.162', 'EEBBEEBBEEBBEE', 'AXIS P3301 - 00408C9B004E', 'AXIS P3301', 'AXIS P3301 Network Fixed Dome Camera', 'P3301'),
            this.createDevice('112.25.126.253', '33333333333333', 'AXIS P1425-E - ACCC8E261613', 'AXIS P1425-E', 'AXIS P1425-E Network Camera', 'P1425-E'),
            this.createDevice('22.25.127.156', '44444444444444', 'AXIS Q6035-E - 00408CDD0155', 'AXIS Q6035-E', 'AXIS Q6035-E PTZ Dome Network Camera', 'Q6035-E'),
            this.createDevice('52.25.126.47', '55555555555555', 'AXIS Q1765-LE - ACCC8E05DD61', 'AXIS Q1765-LE', 'AXIS Q1765-LE Network Camera', 'Q1765-LE'),
        ];
    }

    private createDevice(
        address: string,
        macAddress: string,
        friendlyName: string,
        modelName: string,
        modelDescription: string,
        modelNumber: string): ssdp.Device {
        const port = Math.random() > 0.5 ? 80 : 443;
        return new ssdp.Device(
            address,
            port,
            macAddress,
            friendlyName,
            modelName,
            modelDescription,
            modelNumber,
            `http://${address}:${port}/`);
    }
}
