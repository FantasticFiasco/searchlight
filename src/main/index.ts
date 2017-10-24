import { app, BrowserWindow } from 'electron';
import Debug from 'electron-debug';

import { Analytics } from './analytics';
import { Discovery, DiscoveryMock, IDiscovery } from './discovery';
import * as environment from './environment';
import * as log from './log';
import { Store } from './store';
import { Updates } from './updates';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | undefined;

// For information about Application User Model ID (AUMID), please see
// https://github.com/electron-userland/electron-builder/wiki/NSIS
app.setAppUserModelId('com.fantasticfiasco.searchlight');

// Enable dev tools in development environment
Debug({ enabled: environment.isDev() });

log.info(`Main - start app with version ${app.getVersion()}`);

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        title: 'Searchlight',
        icon: `${__dirname}/assets/app-icon_32x32.png`,
        backgroundColor: '#e4e5e6',
        show: false,
    });

    // Electron type definitions are wrong, they do not support null as argument to setMenu
    (mainWindow as any).setMenu(null);

    // Load main view
    mainWindow.loadURL(environment.isDev() ? 'http://localhost:9080' : `file://${__dirname}/index.html`);

    // Start discovery
    discovery = environment.isDev() ?
        new DiscoveryMock(mainWindow.webContents) :
        new Discovery(mainWindow.webContents);

    discovery.start();

    // Open the DevTools
    if (environment.isDev()) {
        mainWindow.webContents.openDevTools({ mode: 'undocked' });
    }

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
}

// This method will be called when Electron has finished initialization and is
// ready to create browser windows. Some APIs can only be used after this
// event occurs.
app.on('ready', createWindow);

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the dock icon
    // is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Store
const store = new Store();

// Analytics
const analytics = new Analytics(store.get('analytics.clientId'), store.get('analytics.userId'));
analytics.reportEvent('app', 'started');

// Discovery
let discovery: IDiscovery | undefined;

// Updates
const updates = new Updates();
app.on('ready', () => {
    if (!environment.isDev()) {
        updates.checkForUpdates();
    }
});
