import * as ssdp from 'axis-discovery-ssdp';
import { ipcRenderer } from 'electron';
import { EventEmitter } from 'events';

import * as channelNames from 'common/discovery/channel-names';
import { Device, NetworkStatus } from '../models';

/**
 * Key for the discovery service in the Vue dependency injection framework.
 */
export const DISCOVERY_SERVICE = Symbol();

/**
 * Class acting as a proxy between the main and renderer process, capable of
 * reporting about devices appearing on and disapearing from the network.
 */
export class DiscoveryService {
    private readonly eventEmitter: EventEmitter;

    /**
     * Initializes a new instance of the class.
     */
    constructor() {
        this.eventEmitter = new EventEmitter();

        ipcRenderer.on(
            channelNames.DISCOVERY_DEVICE_HELLO,
            (event: any, device: ssdp.Device) => this.emitHello(device));
        ipcRenderer.on(
            channelNames.DISCOVERY_DEVICE_GOODBYE,
            (event: any, device: ssdp.Device) => this.emitGoodbye(device));
    }

    /**
     * Triggers a new search for devices on the network.
     */
    public search() {
        ipcRenderer.send(channelNames.DISCOVERY_SEARCH);
    }

    /**
     * Register a callback that is invoked when a device is found on the
     * network.
     */
    public onHello(callback: (device: Device) => void) {
        this.eventEmitter.on('hello', (device) => callback(device));
    }

    /**
     * Register a callback that is invoked when a device intentionally is
     * disconnecting from the network.
     */
    public onGoodbye(callback: (device: Device) => void) {
        this.eventEmitter.on('goodbye', (device) => callback(device));
    }

    private emitHello(ssdpDevice: ssdp.Device) {
        const device = this.toDevice(ssdpDevice, true);

        if (device != null) {
            this.eventEmitter.emit('hello', device);
        }
    }

    private emitGoodbye(ssdpDevice: ssdp.Device) {
        const device = this.toDevice(ssdpDevice, false);

        if (device != null) {
            this.eventEmitter.emit('goodbye', device);
        }
    }

    private toDevice(device: ssdp.Device, isResponsive: boolean): Device | null {
        if (device.macAddress === undefined) {
            return null;
        }

        const networkStatus: NetworkStatus = {
            isResponsive,
            timestamp: new Date(),
        };

        return new Device(
            device.macAddress,
            device.address,
            device.friendlyName,
            device.modelName,
            device.modelDescription,
            device.modelNumber,
            device.presentationURL,
            networkStatus);
    }
}
