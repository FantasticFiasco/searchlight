import * as Axis from 'axis-discovery';
import { ipcRenderer } from 'electron';
import { EventEmitter } from 'events';

import * as ChannelNames from 'common/channel-names';
import {
    Device,
    NetworkStatus,
} from '../models';

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
            ChannelNames.DISCOVERY_DEVICE_HELLO,
            (event: any, device: Axis.Device) => this.emitHello(device));
        ipcRenderer.on(
            ChannelNames.DISCOVERY_DEVICE_GOODBYE,
            (event: any, device: Axis.Device) => this.emitGoodbye(device));
    }

    /**
     * Triggers a new search for devices on the network.
     */
    public search() {
        ipcRenderer.send(ChannelNames.DISCOVERY_SEARCH);
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

    private emitHello(device: Axis.Device) {
        this.eventEmitter.emit('hello', this.toDevice(device, true));
    }

    private emitGoodbye(device: Axis.Device) {
        this.eventEmitter.emit('goodbye', this.toDevice(device, false));
    }

    private toDevice(device: Axis.Device, isResponsive: boolean): Device {
        return new Device(
            device.macAddress,
            device.friendlyName,
            device.modelName,
            device.modelDescription,
            device.modelNumber,
            device.presentationURL,
            new NetworkStatus(isResponsive, new Date()));
    }
}
