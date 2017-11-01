/**
 * Channel name for messages sent from renderer to main, triggering discovery
 * to start a new search for devices.
 */
export const DISCOVERY_SEARCH = 'discovery.search';

/**
 * Channel name for messages sent from main to renderer, describing a device
 * found on the network.
 */
export const DISCOVERY_DEVICE_HELLO = 'discovery.device.hello';

/**
 * Channel name for messages sent from main to renderer, describing a device
 * intentionally disconnecting from the network.
 */
export const DISCOVERY_DEVICE_GOODBYE = 'discovery.device.goodbye';
