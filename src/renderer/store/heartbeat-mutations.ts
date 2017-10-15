import * as expect from '@fantasticfiasco/expect';
import { Mutation } from 'vuex';

import { State } from './state';

/**
 * Adds a heartbeat to the store.
 * @param state The current state of the store
 * @param heartbeat The heartbeat to add to the store
 */
export const addHeartbeat: Mutation<State> = (state: State, heartbeat: { macAddress: string, timestamp: Date }) => {
    expect.toExist(state);
    expect.toExist(heartbeat);
    expect.toExist(heartbeat.macAddress);
    expect.toExist(heartbeat.timestamp);

    let heartbeats = state.heartbeats[heartbeat.macAddress];
    if (!heartbeats) {
        console.log('xxx', 'initiate heartbeats for', heartbeat.macAddress);
        heartbeats = [];
        state.heartbeats[heartbeat.macAddress] = heartbeats;
    }

    // Add heartbeat
    console.log('xxx', 'add heartbeat', heartbeat.timestamp);
    heartbeats.push(heartbeat.timestamp);

    // Remove heartbeats that are to old
    const now = new Date();
    while (heartbeats.length > 0 && now.getTime() - heartbeats[0].getTime() > historyDuration) {
        console.log('xxx', 'remove heartbeat', heartbeats[0], 'since now is', now);
        heartbeats.splice(0, 1);
    }
};

/**
 * The action of adding a heartbeat to the store.
 */
export const ADD_HEARTBEAT_MUTATION = addHeartbeat.name;

// The history of heartbeats is 5 minutes
const historyDuration = 5 * 60 * 1000;
