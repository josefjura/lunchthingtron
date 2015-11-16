var ipc = require('ipc');
var Configstore = require('configstore');
var pkg = require('../package.json');

function Settings() {
    this.config = new Configstore(pkg.name,
    {
        restaurants: []
    });

    var that = this;
    ipc.on('get-config', function handleGetConfigSync(evt) {
        evt.returnValue = that.getAll();
    });
    ipc.on('set-config', function handleGetConfigSync(evt, args) {
        that.replace(args);
    });
}

Settings.prototype = {
    getAll: function () {
        return this.config.all;
    },
    get: function (key) {        
        return this.config.all[key];
    },
    set: function (key, val) {
        return this.config.set(key, val);
    },
    del: function (key) {
        return this.config.del(key);
    },
    clear: function () {
        return this.config.clear();
    },
    replace: function(config) {
        this.config.all = config;
    }
}

module.exports = Settings;