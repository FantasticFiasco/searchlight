import { app, Menu, MenuItemConstructorOptions } from 'electron';

export function buildMenu(): Menu {
    const appName = app.getName();

    const appOptions: MenuItemConstructorOptions = {
        label: appName,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },
        ],
    };

    const viewOptions: MenuItemConstructorOptions = {
        label: 'View',
        submenu: [
            { role: 'togglefullscreen' },
        ],
    };

    const windowOptions: MenuItemConstructorOptions = {
        role: 'window',
        submenu: [
            { role: 'minimize' },
            { role: 'close' },
        ],
    };

    return Menu.buildFromTemplate([
        appOptions,
        viewOptions,
        windowOptions,
    ]);
}
