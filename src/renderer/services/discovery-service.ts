import * as ssdp from 'axis-discovery-ssdp';
import { ipcRenderer } from 'electron';
import { EventEmitter } from 'events';

import { DiscoveryChannelName } from 'common/discovery';
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
            DiscoveryChannelName.Hello,
            (event: any, device: ssdp.Device) => this.emitHello(device));
        ipcRenderer.on(
            DiscoveryChannelName.Goodbye,
            (event: any, device: ssdp.Device) => this.emitGoodbye(device));
    }

    /**
     * Triggers a new search for devices on the network.
     */
    public search() {
        ipcRenderer.send(DiscoveryChannelName.Search);
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

    private emitHello(device: ssdp.Device) {
        this.eventEmitter.emit('hello', this.toDevice(device, true));
    }

    private emitGoodbye(device: ssdp.Device) {
        this.eventEmitter.emit('goodbye', this.toDevice(device, false));
    }

    private toDevice(device: ssdp.Device, isResponsive: boolean): Device {
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
