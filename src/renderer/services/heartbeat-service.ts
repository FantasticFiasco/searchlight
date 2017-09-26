import * as expect from '@fantasticfiasco/expect';

import { Device } from '../models';
import { ADD_OR_UPDATE_DEVICE_MUTATION, DISCONNECT_DEVICE_MUTATION, store } from '../store';
import { DiscoveryService } from './discovery-service';

/**
 * Class responsible for keeping the store up to date when it comes to network
 * status of devices on the network.
 */
export class HeartbeatService {
    private static readonly RESPONSE_TIMEOUT = 20000;

    private readonly discoveryService: DiscoveryService;

    /**
     * Initializes a new instance of the class.
     */
    constructor(discoveryService: DiscoveryService) {
        expect.toExist(discoveryService);

        this.discoveryService = discoveryService;
        this.discoveryService.onHello((device) => this.addOrUpdateDevice(device));
        this.discoveryService.onGoodbye((device) => this.addOrUpdateDevice(device));

        // Trigger the initial search
        this.discoveryService.search();

        // Trigger search for devices every 10 seconds
        setInterval(() => this.discoveryService.search(), 10000);

        // Trigger check for unresponsive devices every 5 seconds
        setInterval(() => this.markUnresponsiveDevices(), 5000);
    }

    private markUnresponsiveDevices() {
        const now = new Date().getTime();

        for (const device of store.state.devices) {
            if (!device.networkStatus.isResponsive) {
                continue;
            }

            const timeout = now - device.networkStatus.timestamp.getTime();
            if (timeout > HeartbeatService.RESPONSE_TIMEOUT) {
                this.disconnectDevice(device);
            }
        }
    }

    private addOrUpdateDevice(device: Device) {
        store.commit(ADD_OR_UPDATE_DEVICE_MUTATION, device);
    }

    private disconnectDevice(device: Device) {
        store.commit(DISCONNECT_DEVICE_MUTATION, device);
    }
}
