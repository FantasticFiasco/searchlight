/**
 * Names of IPC channels between main and renderer.
 */
export enum DiscoveryChannelName {
    /**
     * Channel name for messages sent from renderer to main, triggering discovery
     * to start a new search for devices.
     */
    Search = 'discovery.search',

    /**
     * Channel name for messages sent from main to renderer, describing a device
     * found on the network.
     */
    Hello = 'discovery.device.hello',

    /**
     * Channel name for messages sent from main to renderer, describing a device
     * intentionally disconnecting from the network.
     */
    Goodbye = 'discovery.device.goodbye',
}
