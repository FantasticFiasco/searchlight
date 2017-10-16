import { Module } from 'vuex';

import { IRootState } from '../i-root-state';
import {
    ADD_OR_UPDATE_DEVICE_MUTATION,
    addOrUpdateDevice,
    DISCONNECT_DEVICE_MUTATION,
    disconnectDevice,
    REMOVE_DEVICE_MUTATION,
    removeDevice,
} from './mutations';
import { State } from './state';

export class DevicesModule implements Module<State, IRootState> {
    public state = new State();
    public mutations = {
        [ADD_OR_UPDATE_DEVICE_MUTATION]: addOrUpdateDevice,
        [DISCONNECT_DEVICE_MUTATION]: disconnectDevice,
        [REMOVE_DEVICE_MUTATION]: removeDevice,
    };
}
