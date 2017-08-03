import * as electron from 'electron';
import Store from 'electron-store';
import * as path from 'path';
import * as url from 'url';
import * as uuid from 'uuid';

import { Analytics } from './analytics/analytics';
import * as log from './log';
import { Updates } from './updates';

// Module to control application life
const app: Electron.App = electron.app;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow: Electron.BrowserWindow | undefined;

// For information about Application User Model ID (AUMID), please see
// https://github.com/electron-userland/electron-builder/wiki/NSIS
app.setAppUserModelId('com.fantasticfiasco.axis-searchlight');

log.info(`Main - start app with version ${app.getVersion()}`);

function createWindow() {
    // Create the browser window
    mainWindow = new electron.BrowserWindow({ title: 'AXIS Searchlight' });

    // Size
    const size = store.get('window.size');
    mainWindow.setSize(size[0], size[1]);
    mainWindow.on('resize', () => {
        store.set('window.size', mainWindow!.getSize());
    });

    // Load main view
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '..', 'renderer', 'index.html'),
        protocol: 'file:',
        slashes: true,
    }));

    // Open the DevTools
    // mainWindow.webContents.openDevTools({ mode: 'undocked' });

    // Emitted when the window is closed
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows in an
        // array if your app supports multi windows, this is the time when you
        // should delete the corresponding element.
        mainWindow = undefined;
    });

    analytics.reportScreenView('Home');
}

// This method will be called when Electron has finished initialization and is
// ready to create browser windows. Some APIs can only be used after this
// event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar to stay active
    // until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the dock icon
    // is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Store
const store = new Store({
    defaults: {
        window: {
            size: [800, 600],
        },
        analytics: {
            userId: uuid.v4(),
        },
    },
});

// Analytics
const analytics = new Analytics(store.get('analytics.userId'));

// Updates
const updates = new Updates();
app.on('ready', () => {
    updates.checkForUpdates();
});
