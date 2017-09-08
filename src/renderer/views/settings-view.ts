import { IView } from './iview';

export class SettingsView implements IView {
    public name: string = 'Settings';
    public url: string = '/settings';
    public icon: string = 'icon-speedometer';
}
