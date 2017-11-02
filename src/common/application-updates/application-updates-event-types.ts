import { RestartRequiredEvent } from 'common/application-updates/restart-required-event';
import { DownloadProgressEvent } from './download-progress-event';
import { NoUpdatesAvailableEvent } from './no-updates-available-event';

/**
 * Union type of events that are send from main to renderer during check for
 * updates.
 */
export type ApplicationUpdatesEventTypes =
    NoUpdatesAvailableEvent |
    DownloadProgressEvent |
    RestartRequiredEvent;
