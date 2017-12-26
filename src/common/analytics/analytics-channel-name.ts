/**
 * Names of IPC channels between main and renderer.
 */
export enum AnalyticsChannelName {
    /**
     * Channel name for messages sent from the renderer, describing an application
     * event containing a value.
     */
    ANALYTICS_REPORT_EVENT_WITH_VALUE = 'analytics.report.eventWithValue',

    /**
     * Channel name for messages sent from the renderer, describing an application
     * page view.
     */
    ANALYTICS_REPORT_PAGE_VIEW = 'analytics.report.pageView',

    /**
     * Channel name for messages sent from the renderer, describing an application
     * exception.
     */
    ANALYTICS_REPORT_EXCEPTION = 'analytics.report.exception',
}
