import { State as ApplicationUpdatesState } from './application-updates/state';
import { State as DevicesState } from './devices/state';
import { State as HeartbeatsState } from './heartbeats/state';

/**
 * Interface describing the root state of the store.
 */
export interface IRootState {
    devices: DevicesState;
    heartbeats: HeartbeatsState;
    applicationUpdates: ApplicationUpdatesState;
}
