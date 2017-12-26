import { AnalyticsChannelName, ExceptionEvent, PageViewEvent, ValueEvent } from 'common/analytics';
import { ipcRenderer } from 'electron';

/**
 * Key for the analytics service in the Vue dependency injection framework.
 */
export const ANALYTICS_SERVICE = Symbol();

/**
 * Class acting as a proxy between the renderer and main process, capable of
 * reporting analytics events.
 */
export class AnalyticsService {
    /**
     * Report about application page view
     * @param event event describing the occurrance
     */
    public reportPageView(event: PageViewEvent) {
        ipcRenderer.send(AnalyticsChannelName.ReportPageView, event);
    }

    /**
     * Report about application event containing a value
     * @param event event describing the occurrance
     */
    public reportEventWithValue(event: ValueEvent) {
        ipcRenderer.send(AnalyticsChannelName.ReportEventWithValue, event);
    }

    /**
     * Report application exception
     * @param event event describing the occurrance
     */
    public reportException(event: ExceptionEvent) {
        ipcRenderer.send(AnalyticsChannelName.ReportException, event);
    }
}
