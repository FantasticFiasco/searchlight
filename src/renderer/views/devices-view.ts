import { IView } from './iview';

export class DevicesView implements IView {
    public name: string = 'Devices';
    public url: string = '/devices';
    public icon: string = 'icon-camrecorder';
}
