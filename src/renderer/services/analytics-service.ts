import { EventWithValue, PageView } from 'common/analytics';
import * as ChannelNames from 'common/channel-names';
import { ipcRenderer } from 'electron';

/**
 * Class acting as a proxy between the renderer and main process, capable of
 * reporting analytics events.
 */
export class AnalyticsService {
    /**
     * Report about application page view
     * @param event event describing the occurrance
     */
    public reportPageView(event: PageView) {
        ipcRenderer.send(ChannelNames.ANALYTICS_REPORT_PAGE_VIEW, event);
    }

    /**
     * Report about application event containing a value
     * @param event event describing the occurrance
     */
    public reportEventWithValue(event: EventWithValue) {
        ipcRenderer.send(ChannelNames.ANALYTICS_REPORT_EVENT_WITH_VALUE, event);
    }
}
