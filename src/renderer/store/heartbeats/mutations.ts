import * as expect from '@fantasticfiasco/expect';
import Vue from 'vue';
import { Mutation } from 'vuex';

import { Heartbeat, State } from './state';

/**
 * Adds a heartbeat to the store.
 * @param state the current state of the store
 * @param heartbeat the heartbeat to add to the store
 */
export const addHeartbeat: Mutation<State> = (state: State, mutation: Heartbeat) => {
    expect.toExist(state);
    expect.toExist(mutation);

    let heartbeats = state[mutation.macAddress];
    if (!heartbeats) {
        heartbeats = [];
        Vue.set(state, mutation.macAddress, heartbeats);
    }

    // Add heartbeat
    heartbeats.push(mutation.timestamp);

    // Remove heartbeats that are to old
    const now = new Date();
    while (heartbeats.length > 0 && now.getTime() - heartbeats[0].getTime() > historyDuration) {
        heartbeats.splice(0, 1);
    }
};

/**
 * The action of adding a heartbeat to the store.
 */
export const ADD_HEARTBEAT_MUTATION = addHeartbeat.name;

// The history of heartbeats is 5 minutes
const historyDuration = 5 * 60 * 1000;
