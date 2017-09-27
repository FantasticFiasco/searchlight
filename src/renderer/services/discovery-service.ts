import * as Axis from 'axis-discovery';
import { ipcRenderer } from 'electron';

import * as ChannelNames from 'common/channel-names';
import {
    Device,
    NetworkStatus,
} from '../models';
import {
    ADD_OR_UPDATE_DEVICE_MUTATION,
    store,
} from '../store';

/**
 * Class acting as a proxy between the main and renderer process, updating the
 * store based on devices found on the network as well as allowing the client
 * to trigger new searches.
 */
export class DiscoveryService {
    /**
     * Initializes a new instance of the class.
     */
    constructor() {
        ipcRenderer.on(
            ChannelNames.DISCOVERY_DEVICE_HELLO,
            (event: any, device: Axis.Device) => this.onHello(device));
        ipcRenderer.on(
            ChannelNames.DISCOVERY_DEVICE_GOODBYE,
            (event: any, device: Axis.Device) => this.onGoodbye(device));
    }

    /**
     * Triggers a new search for devices on the network.
     */
    public search() {
        ipcRenderer.send(ChannelNames.DISCOVERY_SEARCH);
    }

    private onHello(device: Axis.Device) {
        store.commit(ADD_OR_UPDATE_DEVICE_MUTATION, this.toDevice(device, NetworkStatus.responsive));
    }

    private onGoodbye(device: Axis.Device) {
        store.commit(ADD_OR_UPDATE_DEVICE_MUTATION, this.toDevice(device, NetworkStatus.unresponsive));
    }

    private toDevice(device: Axis.Device, networkStatus: NetworkStatus): Device {
        return new Device(
            device.macAddress,
            device.friendlyName,
            device.modelName,
            device.modelDescription,
            device.modelNumber,
            device.presentationURL,
            networkStatus);
    }
}
