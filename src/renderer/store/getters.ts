import * as expect from '@fantasticfiasco/expect';
import * as Axis from 'axis-discovery';
import { Getter } from 'vuex';

import { State } from './state';

/**
 * Returns devices from the store sorted on friendly name.
 * @param state The current state of the store
 * @param state The getters of the store
 * @param rootState The current root state of the store
 * @param rootGetters The root getters of the store
 */
export const sortedDevices: Getter<State, State> =
    (state: State, getters: any, rootState: State, rootGetters: any): Axis.Device[] => {
        expect.toExist(state);

        // Vuex prohibits modifying state outside of store modifiers
        const clone = state.devices.slice();

        // Sort the clone
        return clone.sort((a: Axis.Device, b: Axis.Device) => {
            if (a.friendlyName === undefined) {
                return -1;
            }

            if (b.friendlyName === undefined) {
                return 1;
            }

            return a.friendlyName.localeCompare(b.friendlyName);
        });
    };

/**
 * Returns the number of devices in the store.
 * @param state The current state of the store
 * @param state The getters of the store
 * @param rootState The current root state of the store
 * @param rootGetters The root getters of the store
 */
export const deviceCount: Getter<State, State> =
    (state: State, getters: any, rootState: State, rootGetters: any): number => {
        expect.toExist(state);

        return state.devices.length;
    };
