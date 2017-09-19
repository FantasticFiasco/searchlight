import * as Axis from 'axis-discovery';
import { ipcRenderer } from 'electron';

import * as ChannelNames from 'common/channel-names';
import {
    ADD_OR_UPDATE_DEVICE_MUTATION,
    REMOVE_DEVICE_MUTATION,
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
            (event: any, device: Axis.Device) => store.commit(ADD_OR_UPDATE_DEVICE_MUTATION, device));
        ipcRenderer.on(
            ChannelNames.DISCOVERY_DEVICE_GOODBYE,
            (event: any, device: Axis.Device) => store.commit(REMOVE_DEVICE_MUTATION, device));
    }

    /**
     * Triggers a new search for devices on the network.
     */
    public search() {
        ipcRenderer.send(ChannelNames.DISCOVERY_SEARCH);
    }
}
