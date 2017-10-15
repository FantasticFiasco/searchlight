import { Device } from '../models';

/**
 * Class describing the state of the store.
 */
export class State {
    public devices: Device[] = [];
    public heartbeats: { [macAddress: string]: Date[] } = {};
}
