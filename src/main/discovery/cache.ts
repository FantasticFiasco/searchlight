import * as ssdp from 'axis-discovery-ssdp';

import * as log from '../log';

/**
 * Cache holding discovered devices.
 */
export class Cache {
    private readonly devices: { [macAddress: string]: ssdp.Device } = {};

    /**
     * Update the cache with a device.
     * @param device the device to update the cache with
     * @returns a device that is the aggregate of the argument and the
     * information stored in the cache
     */
    public update(device: ssdp.Device): ssdp.Device {
        let hit = this.devices[device.macAddress];

        if (hit) {
            log.debug('Cache', `hit for ${device.macAddress}`);
            this.merge(device, hit);
        } else {
            log.debug('Cache', `miss for ${device.macAddress}`);
            hit = device;
        }

        this.devices[device.macAddress] = hit;
        return hit;
    }

    private merge(source: any, target: any) {
        Object.keys(source).forEach((key: string) => {
            if (source[key] !== undefined) {
                target[key] = source[key];
            }
        });
    }
}
