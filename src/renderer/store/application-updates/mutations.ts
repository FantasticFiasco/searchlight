import * as expect from '@fantasticfiasco/expect';
import { Mutation } from 'vuex';

import { ApplicationUpdatesState, State } from './state';

/**
 * Updates the application updates state.
 * @param state the current state of the store
 * @param version the new application updates state to set in the store
 */
export const updateState: Mutation<State> = (state: State, mutation: ApplicationUpdatesState) => {
    expect.toExist(state);
    expect.toExist(mutation);

    state.state = mutation;
};

/**
 * The action of updating the application updates state.
 */
export const UPDATE_STATE_MUTATION = updateState.name;

/**
 * Updates the download progress.
 * @param state the current state of the store
 * @param version the new download progress to set in the store
 */
export const updateDownloadProgress: Mutation<State> = (state: State, mutation: number) => {
    expect.toExist(state);

    state.state = ApplicationUpdatesState.DOWNLOADING;
    state.downloadProgress = mutation;
};

/**
 * The action of updating the download progress.
 */
export const UPDATE_DOWNLOAD_PROGRESS_MUTATION = updateDownloadProgress.name;
