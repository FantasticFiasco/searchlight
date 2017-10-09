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
         * The MAC address.
         */
        public macAddress: string,
        /**
         * The name.
         */
        public name: string | undefined,
        /**
         * The model name.
         */
        public modelName: string | undefined,
        /**
         * The model description.
         */
        public modelDescription: string | undefined,
        /**
         * The model number.
         */
        public modelNumber: string | undefined,
        /**
         * The URL to view video.
         */
        public liveViewUrl: string | undefined,
        /**
         * The network status.
         */
        public networkStatus: NetworkStatus) {
    }

    /**
     * Updates properties of this instance.
     */
    public update(other: Device) {
        this.macAddress = other.macAddress;
        this.name = other.name || this.name;
        this.modelName = other.modelName || this.modelName;
        this.modelDescription = other.modelDescription || this.modelDescription;
        this.modelNumber = other.modelNumber || this.modelNumber;
        this.liveViewUrl = other.liveViewUrl || this.liveViewUrl;
        this.networkStatus = other.networkStatus;
    }
}
