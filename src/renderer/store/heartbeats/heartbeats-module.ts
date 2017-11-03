import { Module } from 'vuex';

import { IRootState } from '../i-root-state';
import { ADD_HEARTBEAT_MUTATION, addHeartbeat } from './mutations';
import { State } from './state';

export class HeartbeatsModule implements Module<State, IRootState> {
    public state = new State();
    public mutations = {
        [ADD_HEARTBEAT_MUTATION]: addHeartbeat,
    };
}
