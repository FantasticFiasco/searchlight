import { Module } from 'vuex';

import { IRootState } from '../i-root-state';
import {
    UPDATE_DOWNLOAD_PROGRESS_MUTATION,
    UPDATE_STATE_MUTATION,
    updateDownloadProgress,
    updateState,
} from './mutations';
import { State } from './state';

export class ApplicationUpdatesModule implements Module<State, IRootState> {
    public state = new State();
    public mutations = {
        [UPDATE_DOWNLOAD_PROGRESS_MUTATION]: updateDownloadProgress,
        [UPDATE_STATE_MUTATION]: updateState,
    };
}
