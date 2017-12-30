/**
 * Names of IPC channels between main and renderer.
 */
export enum AnalyticsChannelName {
    /**
     * Channel name for messages sent from the renderer, describing an application
     * event containing a value.
     */
    ReportEventWithValue = 'analytics.report.eventWithValue',

    /**
     * Channel name for messages sent from the renderer, describing an application
     * page view.
     */
    ReportPageView = 'analytics.report.pageView',

    /**
     * Channel name for messages sent from the renderer, describing an application
     * exception.
     */
    ReportException = 'analytics.report.exception',
}
