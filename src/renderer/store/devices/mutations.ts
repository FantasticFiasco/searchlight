import * as expect from '@fantasticfiasco/expect';
import { Mutation } from 'vuex';

import { Device } from '../../models';
import { State } from './state';

/**
 * Adds or updates a device in the store depending on whether it already
 * exists.
 * @param state the current state of the store
 * @param device the device to add or update in the store
 */
export const addOrUpdateDevice: Mutation<State> = (state: State, mutation: Device) => {
    expect.toExist(state);
    expect.toExist(mutation);

    const index = indexOf(mutation, state);

    if (index === -1) {
        state.push(mutation);
    } else {
        state[index].update(mutation);
    }
};

/**
 * The action of adding or updating a device in the store depending on whether
 * it already exists.
 */
export const ADD_OR_UPDATE_DEVICE_MUTATION = addOrUpdateDevice.name;

/**
 * Removes a device from the store.
 * @param state the current state of the store
 * @param device the device to remove from the store
 */
export const removeDevice: Mutation<State> = (state: State, mutation: Device) => {
    expect.toExist(state);
    expect.toExist(mutation);

    const index = indexOf(mutation, state);

    if (index > -1) {
        state.splice(index, 1);
    }
};

/**
 * The action of removing a device from the store.
 */
export const REMOVE_DEVICE_MUTATION = removeDevice.name;

/**
 * Marks a device as disconnected in the store.
 * @param state the current state of the store
 * @param device the device to mark as disconnected in the store
 */
export const disconnectDevice: Mutation<State> = (state: State, mutation: Device) => {
    expect.toExist(state);
    expect.toExist(mutation);

    const index = indexOf(mutation, state);

    if (index > -1) {
        state[index].networkStatus.isResponsive = false;
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
