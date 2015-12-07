(function () {
    'use strict';
    
    if (require('./squirrel-start')) return;
    
    var app = require('app');  // Module to control application life.
    var process = require('process');  // Module to control application life.
    var BrowserWindow = require('browser-window');  // Module to create native browser window.
    var ipc = require('ipc');
    var fs = require('fs');
    var env = require('./vendor/electron_boilerplate/env_config');
    var devHelper = require('./vendor/electron_boilerplate/dev_helper');
    var windowStateKeeper = require('./vendor/electron_boilerplate/window_state');

    // Report crashes to our server.
    require('crash-reporter').start();

    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.
    var mainWindow = null;


    var mainWindowState = windowStateKeeper('main', {
        width: 600,
        height: 800
    });

    // Quit when all windows are closed.
    app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform != 'darwin') {
            app.quit();
        }
    });

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    app.on('ready', function () {
        process.on('uncaughtException', function (error) {
            console.log(error);
        });

        // Create the browser window.
        mainWindow = new BrowserWindow({
            x: mainWindowState.x,
            y: mainWindowState.y,
            width: mainWindowState.width,
            height: mainWindowState.height
        });

        if (mainWindowState.isMaximized) {
            mainWindow.maximize();
        }

        if (env.name === 'test') {
            mainWindow.loadUrl('file://' + __dirname + '/spec.html');
        } else {
            mainWindow.loadUrl('file://' + __dirname + '/app.html');
        }

        if (env.name !== 'production') {
            devHelper.setDevMenu();
            mainWindow.openDevTools();
        }

        mainWindow.on('close', function () {
            mainWindowState.saveState(mainWindow);
        });

        // Emitted when the window is closed.
        mainWindow.on('closed', function () {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            mainWindow = null;
        });

    });
})();