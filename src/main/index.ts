import { app, BrowserWindow } from 'electron';
import Debug from 'electron-debug';

import { isDev } from 'common';
import { Analytics } from './analytics';
import { ApplicationUpdates } from './application-updates';
import { Discovery, DiscoveryMock, IDiscovery } from './discovery';
import * as log from './log';
import { Store } from './store';

log.info('Main', `start app with version ${app.getVersion()}`);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | undefined;

// For information about Application User Model ID (AUMID), please see
// https://github.com/electron-userland/electron-builder/wiki/NSIS
app.setAppUserModelId('com.fantasticfiasco.searchlight');

// Enable dev tools in development environment
Debug({ enabled: isDev() });

// Store
const store = new Store();

// Analytics
const analytics = new Analytics(store.get('analytics.clientId'), store.get('analytics.userId'));
analytics.reportEvent('app', 'started');
analytics.reportEvent('app version', app.getVersion());

// Discovery
let discovery: IDiscovery | undefined;

// Application updates
let applicationUpdates: ApplicationUpdates | undefined;

function createMainWindow() {
    log.info('Main', 'create main window');

    // Create the browser window
    mainWindow = new BrowserWindow({
        icon: `${__dirname}/assets/app-icon_32x32.png`,
        backgroundColor: '#e4e5e6',
        show: false,
    });

    // Disable menu
    mainWindow.setMenu(null);

    // Show main window when Electron has loaded, thus preventing UI flickering
    mainWindow.on('ready-to-show', () => {
        mainWindow!.show();
    });

    // Emitted when the window is closed
    mainWindow.on('closed', () => {
        // Stop discovery
        discovery!.stop();
        discovery = undefined;

        // Dereference the window object, usually you would store windows in an
        // array if your app supports multi windows, this is the time when you
        // should delete the corresponding element.
        mainWindow = undefined;
    });

    // Load main view
    // - 'webpack-dev-server' in development
    // - 'index.html' in production
    const url = isDev() ?
        `http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}` :
        `file://${__dirname}/index.html`;

    mainWindow.loadURL(url);

    // Start discovery
    discovery = isDev() ?
        new DiscoveryMock(mainWindow.webContents) :
        new Discovery(mainWindow.webContents);

    discovery.start();

    // Start application updates
    applicationUpdates = new ApplicationUpdates(analytics, mainWindow);
    applicationUpdates.start();

    // Open the DevTools
    if (isDev()) {
        mainWindow.webContents.openDevTools({ mode: 'undocked' });
    }
}

// This method will be called when Electron has finished initialization and is
// ready to create browser windows. Some APIs can only be used after this
// event occurs.
app.on('ready', createMainWindow);

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the dock icon
    // is clicked and there are no other windows open.
    if (mainWindow === undefined) {
        createMainWindow();
    }
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
    analytics.reportEvent('app', 'stopped');

    // On OS X it is common for applications and their menu bar to stay active
    // until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
