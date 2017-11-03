import { IView } from './iview';

export class DevicesView implements IView {
    public name = 'Devices';
    public url = '/devices';
    public icon = 'icon-camrecorder';
    public badge = '';
}
