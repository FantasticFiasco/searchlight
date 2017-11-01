import * as expect from '@fantasticfiasco/expect';

import { Device } from '../models';
import { ADD_HEARTBEAT_MUTATION, ADD_OR_UPDATE_DEVICE_MUTATION, DISCONNECT_DEVICE_MUTATION, store } from '../store';
import { DiscoveryService } from './discovery-service';

/**
 * Key for the heartbeat service in the Vue dependency injection framework.
 */
export const HEARTBEAT_SERVICE = Symbol();

/**
 * Class responsible for keeping the store up to date when it comes to device
 * network status.
 */
export class HeartbeatService {
    private static readonly UNRESPONSIVE_DURATION_THRESHOLD = 20000;

    private readonly discoveryService: DiscoveryService;

    /**
     * Initializes a new instance of the class.
     */
    constructor(discoveryService: DiscoveryService) {
        expect.toExist(discoveryService);

        this.discoveryService = discoveryService;
        this.discoveryService.onHello((device) => this.onResponse(device));
        this.discoveryService.onGoodbye((device) => this.onResponse(device));

        // Trigger the initial search
        this.discoveryService.search();

        // Trigger search every 10 seconds
        setInterval(() => this.discoveryService.search(), 10000);

        // Trigger check for unresponsive devices every 5 seconds
        setInterval(() => this.findAndUpdateUnresponsiveDevices(), 5000);
    }

    private findAndUpdateUnresponsiveDevices() {
        const now = new Date().getTime();

        for (const device of store.state.devices) {
            // Skip already unresponsive devices
            if (!device.networkStatus.isResponsive) {
                continue;
            }

            const unresponsiveDuration = now - device.networkStatus.timestamp.getTime();
            if (unresponsiveDuration > HeartbeatService.UNRESPONSIVE_DURATION_THRESHOLD) {
                this.disconnectDevice(device);
            }
        }
    }

    private onResponse(device: Device) {
        store.commit(ADD_OR_UPDATE_DEVICE_MUTATION, device);
        store.commit(ADD_HEARTBEAT_MUTATION, { macAddress: device.macAddress, timestamp: device.networkStatus.timestamp });
    }

    private disconnectDevice(device: Device) {
        store.commit(DISCONNECT_DEVICE_MUTATION, device);
    }
}
