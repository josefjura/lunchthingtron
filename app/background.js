(function () {
    'use strict';

    var app = require('app');  // Module to control application life.
    var process = require('process');  // Module to control application life.
    var BrowserWindow = require('browser-window');  // Module to create native browser window.
    var ipc = require('ipc');
    var fs = require('fs');
    var env = require('./vendor/electron_boilerplate/env_config');
    var devHelper = require('./vendor/electron_boilerplate/dev_helper');
    var windowStateKeeper = require('./vendor/electron_boilerplate/window_state');

    var configuration = null;
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
        ipc.on('load-config', function (event, arg) {
            //app.getPath('appData')
            if (configuration != null) {
                event.returnValue = configuration;
            }
            else {
                console.log("Loading configuration...");
                var path = app.getPath('userData') + "/settings.json";
                try {
                    //test to see if settings exist
                    fs.openSync(path, 'r+'); //throws error if file doesn't exist
                    console.log("Configuration file opened...");
                    var dataJson = fs.readFileSync(path).toString(); //file exists, get the contents
                    console.log("Data acquired... : " + dataJson);
                    if (dataJson != undefined && dataJson !== "")
                        configuration = event.returnValue = JSON.parse(dataJson);
                    console.log("Data parsed...");
                } catch (err) {
                    //if error, then there was no settings file (first run).
                    console.log("Error: " + err);
                    try {
                        console.log("Creating settings file...");
                        var fd = fs.openSync(path, 'w+');
                        console.log("Created settings file...");
                    } catch (err) {
                        console.log("Error creating settings file: " + JSON.stringify(err));
                        throw err;
                    }
                }
            }
        });

        function saveConfiguration(configData) {
            console.log("Saving settings...");
            var path = app.getPath('userData') + "/settings.json";
            console.log("Path to config file " + path);
            var data = JSON.stringify(configData);
            console.log(data);
            var fd = fs.openSync(path, 'w+');
            console.log("Config file opened");
            fs.writeSync(fd, data);
            console.log("It's saved!");
        };

        ipc.on('update-config', function (event, arg) {
            this.configuration = arg;
        });

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
            if (configuration)
                saveConfiguration(configuration);
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