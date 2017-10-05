/**
 * Class describing the network status of a device.
 */
export class NetworkStatus {
    /**
     * Whether device is responding to discovery.
     */
    public isResponsive: boolean;

    /**
     * A timestamp of the latest response to discovery.
     */
    public timestamp: Date;
}
