import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import { isDev } from 'common';
import { ApplicationUpdatesModule } from './application-updates/application-updates-module';
import { DevicesModule } from './devices/devices-module';
import { HeartbeatsModule } from './heartbeats/heartbeats-module';
import { IRootState } from './i-root-state';

Vue.use(Vuex);

export const store = new Store<IRootState>({
    modules: {
        applicationUpdates: new ApplicationUpdatesModule(),
        devices: new DevicesModule(),
        heartbeats: new HeartbeatsModule(),
    },
    strict: isDev(),
});
