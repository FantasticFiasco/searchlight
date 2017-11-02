import { State } from './state';

/**
 * Interface responsible for knowing when application updates are availale, and
 * how those updates are applied.
 */
export interface IApplicationUpdates {
    /**
     * The state of application updates.
     */
    state: State;

    /**
     * Start application updates.
     */
    start(): void;

    /**
     * Restarts and updates the application.
     */
    restartAndUpdate(): void;
}
