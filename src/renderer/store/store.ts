import Vue from 'vue';
import Vuex, { Store } from 'vuex';

import * as environment from 'common/environment';
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
    strict: environment.isDev(),
});
