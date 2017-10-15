import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { addOrUpdateDevice, disconnectDevice, removeDevice } from './device-mutations';
import { addHeartbeat } from './heartbeat-mutations';
import { State } from './state';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export const store = new Store<State>({
    state: new State(),
    mutations: {
        // Device mutations
        addOrUpdateDevice,
        disconnectDevice,
        removeDevice,
        // Heartbeat mutations
        addHeartbeat,
    },
    strict: debug,
});
