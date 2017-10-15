import * as expect from '@fantasticfiasco/expect';
import { Mutation } from 'vuex';

import { Device } from '../models';
import { State } from './state';

/**
 * Adds or updates a device in the store depending on whether it already
 * exists.
 * @param state The current state of the store
 * @param device The device to add or update in the store
 */
export const addOrUpdateDevice: Mutation<State> = (state: State, device: Device) => {
    expect.toExist(state);
    expect.toExist(device);

    const index = indexOf(device, state.devices);

    if (index === -1) {
        state.devices.push(device);
    } else {
        state.devices[index].update(device);
    }
};

/**
 * The action of adding or updating a device in the store depending on whether
 * it already exists.
 */
export const ADD_OR_UPDATE_DEVICE_MUTATION = addOrUpdateDevice.name;

/**
 * Removes a device from the store.
 * @param state The current state of the store
 * @param device The device to remove from the store
 */
export const removeDevice: Mutation<State> = (state: State, device: Device) => {
    expect.toExist(state);
    expect.toExist(device);

    const index = indexOf(device, state.devices);

    if (index > -1) {
        state.devices.splice(index, 1);
    }
};

/**
 * The action of removing a device from the store.
 */
export const REMOVE_DEVICE_MUTATION = removeDevice.name;

/**
 * Disconnects a device in the store.
 * @param state The current state of the store
 * @param device The device to disconnect in the store
 */
export const disconnectDevice: Mutation<State> = (state: State, device: Device) => {
    expect.toExist(state);
    expect.toExist(device);

    const index = indexOf(device, state.devices);

    if (index > -1) {
        state.devices[index].networkStatus.isResponsive = false;
    }
};

/**
 * The action of disconnecting a device in the store.
 */
export const DISCONNECT_DEVICE_MUTATION = disconnectDevice.name;

function indexOf(device: Device, amongDevices: Device[]): number {
    return amongDevices.findIndex((existingDevice: Device) =>
        existingDevice.macAddress === device.macAddress);
}
