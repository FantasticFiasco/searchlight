import { IView } from './iview';

export class AboutView implements IView {
    public name: string = 'About';
    public url: string = '/about';
    public icon: string = 'icon-speedometer';
}
