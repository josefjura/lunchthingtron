'use strict';

var Q = require('q');
var gulpUtil = require('gulp-util');
var childProcess = require('child_process');
var jetpack = require('fs-jetpack');
var asar = require('asar');
var utils = require('./utils');

var packager = require('electron-packager')
var squirrelBuilder = require('electron-installer-squirrel-windows');

var projectDir;
var tmpDir;
var releasesDir;
var readyAppDir;
var manifest;

var init = function () {
    projectDir = jetpack;
    tmpDir = projectDir.dir('./tmp', { empty: true });
    releasesDir = projectDir.dir('./releases');
    manifest = projectDir.read('app/package.json', 'json');
    readyAppDir = tmpDir.cwd(manifest.name);
    return Q();
};

var copyRuntime = function () {
    return projectDir.copyAsync('node_modules/electron-prebuilt/dist', readyAppDir.path(), { overwrite: true });
};

var cleanupRuntime = function () {
    return readyAppDir.removeAsync('resources/default_app');
};

var packageBuiltApp = function () {
    var deferred = Q.defer();

    asar.createPackage(projectDir.path('build'), readyAppDir.path('resources/app.asar'), function () {
        deferred.resolve();
    });

    return deferred.promise;
};

var finalize = function () {
    var deferred = Q.defer();

    projectDir.copy('resources/windows/icon.ico', readyAppDir.path('icon.ico'));

    // Replace Electron icon for your own.
    var rcedit = require('rcedit');
    rcedit(readyAppDir.path('electron.exe'), {
        'icon': projectDir.path('resources/windows/icon.ico'),
        'version-string': {
            'ProductName': manifest.productName,
            'FileDescription': manifest.description,
        }
    }, function (err) {
        if (!err) {
            deferred.resolve();
        }
    });

    return deferred.promise;
};

var renameApp = function () {
    return readyAppDir.renameAsync('electron.exe', manifest.productName + '.exe');
};

var createPackage = function () {
    var deferred = Q.defer();


    packager({
        dir: '.\\build',
        name: 'Lunchthingtron',
        platform: 'win32',
        arch: 'x64',
        version: '0.34.2',
        out: 'releases\\packages\\',
        overwrite: true,
        icon: 'resources\\windows\\icon.ico',
        prune: true
    }, function done(err, appPath) {
        if (err) {
            gulpUtil.log(err);
        }

        deferred.resolve();
    });

    return deferred.promise;
};

var createInstaller = function () {
    var deferred = Q.defer();
    var opts = {
        path: 'releases\\packages\\Lunchthingtron-win32-x64\\',
        name: manifest.name,
        product_name: 'Lunchtringtron',
        authors: 'Josef Jura',
        out: 'releases\\squirrel\\',
        overwrite: true
    };

    squirrelBuilder(opts, function (err) {
        if (err)
            gulpUtil.log(err);

        deferred.resolve();
    });

    return deferred.promise;
}

var cleanClutter = function () {
    return tmpDir.removeAsync('.');
};

module.exports = function () {
    return init()
        .then(copyRuntime)
        .then(cleanupRuntime)
        .then(packageBuiltApp)
        .then(finalize)
        .then(renameApp)
        .then(createPackage)
        .then(createInstaller)
        .then(cleanClutter)
        .catch(console.error);
};
