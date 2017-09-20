import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { addOrUpdateDevice, removeDevice } from './mutations';
import { State } from './state';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export const store = new Store<State>({
    state: new State(),
    mutations: {
        addOrUpdateDevice,
        removeDevice,
    },
    strict: debug,
});
