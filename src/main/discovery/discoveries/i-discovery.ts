/**
 * Interface discovering Axis devices on the network.
 */
export interface IDiscovery {
    /**
     * Start listen for device advertisements on all network interface
     * addresses.
     */
    start(): Promise<void>;

    /**
     * Stop listening for device advertisements.
     */
    stop(): Promise<void>;

    /**
     * Triggers a new search for devices on the network.
     */
    search(): Promise<void>;
}
