import { BrowserWindow, Menu, MenuItemConstructorOptions, shell } from 'electron';

import { platform, Platform } from 'common';
import { GitHub } from 'common/git-hub';

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

const gitHub = new GitHub();

function setMacOSMenu() {
    const searchlight: MenuItemConstructorOptions = {
        label: 'Searchlight',
        submenu: [
            { label: `Hide Searchlight`, role: 'hide' },
            { role: 'hideothers' },
            { role: 'unhide' },
            { type: 'separator' },
            { label: `Quit Searchlight`, role: 'quit' },
        ],
    };

    const view: MenuItemConstructorOptions = {
        label: 'View',
        submenu: [
            { role: 'togglefullscreen' },
        ],
    };

    const window: MenuItemConstructorOptions = {
        role: 'window',
        submenu: [
            { role: 'minimize' },
            { role: 'close' },
        ],
    };

    const help: MenuItemConstructorOptions = {
        role: 'help',
        submenu: [
            {
                label: 'Join us on Twitter',
                click: () => {
                    shell.openExternal('https://twitter.com/FantasticFiasco');
                },
            },
            {
                label: 'Search Feature Requests',
                click: () => {
                    gitHub.openFeatureRequestsWebPage();
                },
            },
            {
                label: 'Report Issue',
                click: () => {
                    gitHub.openIssueWebPage();
                },
            },
            {
                label: 'View License',
                click: () => {
                    gitHub.openLicenseWebPage();
                },
            },
        ],
    };

    const menu: Menu = Menu.buildFromTemplate([
        searchlight,
        view,
        window,
        help,
    ]);

    Menu.setApplicationMenu(menu);
}

function removeMenu(window: BrowserWindow) {
    window.setMenu(null);
}
