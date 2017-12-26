import { DownloadProgressEvent } from './download-progress-event';
import { NoUpdatesAvailableEvent } from './no-updates-available-event';
import { RestartRequiredEvent } from './restart-required-event';
import { UpdatesAvailableEvent } from './updates-available-event';

/**
 * Union type of events that are send from main to renderer during check for
 * updates.
 */
export type CheckForUpdatesEventTypes =
    NoUpdatesAvailableEvent |
    DownloadProgressEvent |
    RestartRequiredEvent |
    UpdatesAvailableEvent;
