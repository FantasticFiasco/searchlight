/**
 * Channel name for messages sent from the renderer, describing an application
 * event containing a value.
 */
export const ANALYTICS_REPORT_EVENT_WITH_VALUE = 'analytics.report.eventWithValue';

/**
 * Channel name for messages sent from the renderer, describing an application
 * page view.
 */
export const ANALYTICS_REPORT_PAGE_VIEW = 'analytics.report.pageView';

/**
 * Channel name for messages send from renderer to main, triggering discovery
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
