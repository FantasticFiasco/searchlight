import { app, BrowserWindow, Menu, MenuItemConstructorOptions } from 'electron';

import { platform, Platform } from 'common';

/**
 * Sets menu on application window.
 * @param window The main application window
 */
export function setMenu(window: BrowserWindow) {
    // Only show menu on macOS
    if (platform() === Platform.MacOS) {
        setMacOSMenu();
    } else {
        removeMenu(window);
    }
}

function setMacOSMenu() {
    const appName = app.getName();

    const appOptions: MenuItemConstructorOptions = {
        label: appName,
        submenu: [
            { label: `About ${appName}`, role: 'about' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { label: `Quit ${appName}`, role: 'quit' },
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

function removeMenu(window: BrowserWindow) {
    window.setMenu(null);
}
