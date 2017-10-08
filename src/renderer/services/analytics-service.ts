import { EventWithValue } from 'common/analytics/event-with-value';
import * as ChannelNames from 'common/channel-names';
import { ipcRenderer } from 'electron';

/**
 * Class acting as a proxy between the renderer and main process, capable of
 * reporting analytics events.
 */
export class AnalyticsService {
    /**
     * Report about application event containing a value
     * @param category category of the event
     * @param action name of the action
     * @param label label of the value
     * @param value the value
     */
    public reportEventWithValue(event: EventWithValue) {
        ipcRenderer.send(ChannelNames.ANALYTICS_REPORT_EVENT_WITH_VALUE, event);
    }
}
