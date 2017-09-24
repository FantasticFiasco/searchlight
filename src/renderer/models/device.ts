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
         * The model number of the device.
         */
        public modelNumber: string | undefined,
        /**
         * The network status of the device.
         */
        public networkStatus: NetworkStatus) {
    }

    /**
     * The URL to an icon of the device.
     */
    public get iconUrl(): string | undefined {
        if (this.modelNumber === undefined) {
            return undefined;
        }

        return `https://www.axis.com/images/scaled/300/sites/default/files/${this.modelNumber.toLowerCase()}.png`;
    }
}
