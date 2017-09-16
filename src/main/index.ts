import { app, BrowserWindow } from 'electron';
import Debug from 'electron-debug';
import Store from 'electron-store';
import * as uuid from 'uuid';

import { Analytics } from './analytics';
import { Discovery, DiscoveryMock, IDiscovery } from './discovery';
import * as environment from './environment';
import * as log from './log';
import { Updates } from './updates';

// Constants
const appName = 'AXIS Searchlight';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | undefined;

// For information about Application User Model ID (AUMID), please see
// https://github.com/electron-userland/electron-builder/wiki/NSIS
app.setAppUserModelId('com.fantasticfiasco.axis-searchlight');

// Dev tools in development mode
Debug({ enabled: true });

log.info(`Main - start app with version ${app.getVersion()}`);

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        title: appName,
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
    mainWindow.webContents.openDevTools({ mode: 'undocked' });

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

        analytics.reportEvent('window', 'home.closed');
    });

    analytics.reportScreenView('home');
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
    // On OS X it is common for applications and their menu bar to stay active
    // until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Store
const store = new Store({
    defaults: {
        analytics: {
            userId: uuid.v4(),
        },
    },
});

// Analytics
const analytics = new Analytics(appName, store.get('analytics.userId'));

// Updates
const updates = new Updates();
app.on('ready', () => {
    if (!environment.isDev()) {
        updates.checkForUpdates();
    }
});

// Discovery
let discovery: IDiscovery | undefined;
