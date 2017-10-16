import { DownloadProgressEvent } from './download-progress-event';
import { NoUpdatesAvailableEvent } from './no-updates-available-event';

export type ApplicationUpdatesEventTypes = DownloadProgressEvent | NoUpdatesAvailableEvent;
