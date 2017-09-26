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
     * The URL to an icon.
     */
    public get iconUrl(): string | undefined {
        if (this.modelNumber === undefined) {
            return undefined;
        }

        const modelNumber = this.modelNumber.toLowerCase();
        return `https://www.axis.com/images/scaled/300/sites/default/files/${modelNumber}.png`;
    }

    /**
     * The URL to the product page on www.axis.com.
     */
    public get productPageUrl(): string {
        if (this.modelName === undefined) {
            return 'https://www.axis.com/products-and-solutions';
        }

        const modelName = this.modelName.replace(' ', '-').toLowerCase();
        return `https://www.axis.com/products/${modelName}`;
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
