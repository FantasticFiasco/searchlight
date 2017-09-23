import { NetworkStatus } from './network-status';

/**
 * Class describing a device.
 */
export class Device {

    /**
     * Initializes a new instance of the class.
     */
    constructor(
        /**
         * The MAC address of the device.
         */
        public macAddress: string,
        /**
         * The name of the device.
         */
        public name: string,
        /**
         * The model of the device.
         */
        public model: string,
        /**
         * The network status of the device.
         */
        public networkStatus: NetworkStatus) {
    }
}
