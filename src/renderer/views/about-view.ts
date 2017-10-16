import { ApplicationUpdatesService } from '../services';
import { ApplicationUpdatesState, store } from '../store';
import { IView } from './iview';

export class AboutView implements IView {
    public name = 'About';
    public url = '/about';
    public icon = 'icon-question';

    /**
     * Initializes a new instance of the class.
     * @param applicationUpdatesService the application updates service
     */
    constructor(applicationUpdatesService: ApplicationUpdatesService) {
        applicationUpdatesService.checkForUpdates();
    }

    public get badge(): string {
        return store.state.applicationUpdates.state === ApplicationUpdatesState.RESTART_REQUIRED ? 'NEW' : '';
    }
}
