import { Device } from 'axis-discovery';
import { ipcRenderer } from 'electron';
import { EventEmitter } from 'events';

import * as ChannelNames from 'common/channel-names';

/**
 * Class reporting about discovered Axis devices on the network, acting as a
 * proxy between the main and renderer process.
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
            (device: Device) => this.sendHello(device));
        ipcRenderer.on(
            ChannelNames.DISCOVERY_DEVICE_GOODBYE,
            (device: Device) => this.sendGoodbye(device));
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
        this.eventEmitter.on('hello', (device: Device) => callback(device));
    }

    /**
     * Register a callback that is invoked when a device intentionally is
     * disconnecting from the network.
     */
    public onGoodbye(callback: (device: Device) => void) {
        this.eventEmitter.on('goodbye', (device: Device) => callback(device));
    }

    private sendHello(device: Device) {
        this.eventEmitter.emit('hello', device);
    }

    private sendGoodbye(device: Device) {
        this.eventEmitter.emit('goodbye', device);
    }
}
