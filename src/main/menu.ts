import { app, Menu, MenuItemConstructorOptions } from 'electron';

export function buildMenu(): Menu {
    const appName = app.getName();

    const appOptions: MenuItemConstructorOptions = {
        label: appName,
        submenu: [
            { label: `About ${appName}`, role: 'orderFrontStandardAboutPanel' },
            { type: 'separator' },
            { label: `Hide ${name}`, accelerator: 'Command+H', role: 'hide' },
            { label: 'Hide Others', accelerator: 'Command+Option+H', role: 'hideOtherApplications' },
            { label: 'Show All', role: 'unhideAllApplications' },
            { type: 'separator' },
            { label: `Quit ${appName}`, role: 'quit', accelerator: 'Command+Q' },
        ],
    };

    return Menu.buildFromTemplate([
        appOptions,
    ]);
}
