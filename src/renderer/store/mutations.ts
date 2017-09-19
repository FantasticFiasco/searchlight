import * as expect from '@fantasticfiasco/expect';
import * as Axis from 'axis-discovery';
import { Mutation } from 'vuex';

import { State } from './state';

/**
 * Adds or updates a device in the store depending on whether it already
 * exists.
 * @param state The current state of the store
 * @param device The device to add or update in the store
 */
export const addOrUpdateDevice: Mutation<State> = (state: State, device: Axis.Device) => {
    expect.toExist(state);
    expect.toExist(device);

    const index = indexOf(device, state.devices);

    if (index === -1) {
        // Add new device
        state.devices.push(device);
    } else {
        // Update existing device
        state.devices.splice(index, 1, device);
    }
};

/**
 * The action adding or updating a device in the store depending on whether it
 * already exists.
 */
export const ADD_OR_UPDATE_DEVICE_MUTATION = addOrUpdateDevice.name;

/**
 * Removes a device from the store.
 * @param state The current state of the store
 * @param device The device to remove from the store
 */
export const removeDevice: Mutation<State> = (state: State, device: Axis.Device) => {
    expect.toExist(state);
    expect.toExist(device);

    const index = indexOf(device, state.devices);

    if (index > -1) {
        state.devices.splice(index, 1);
    }
};

/**
 * The action removing a device from the store.
 */
export const REMOVE_DEVICE_MUTATION = removeDevice.name;

function indexOf(device: Axis.Device, amongDevices: Axis.Device[]): number {
    return amongDevices.findIndex((existingDevice: Axis.Device) =>
        existingDevice.macAddress === device.macAddress);
}
