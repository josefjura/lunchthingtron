var BrowserWindow = require('browser-window');  // Module to create native browser window.
var Menu = require('menu');
var MenuItem = require('menu-item');



export var initRestaurantMenu = function() {
    var menu = Menu.getApplicationMenu();    
    var submenu = Menu.buildFromTemplate([
        {
            label: 'Add new',
            accelerator: 'CmdOrCtrl+N',
            click: function() {
                showAddItemDialog();
            }
        }
    ]);

    menu.insert(0, new MenuItem({
        label: 'Restaurants',
        submenu: submenu
    }));
    
    console.log("Initializing restaurant menu");
    Menu.setApplicationMenu(menu);
};

function showAddItemDialog() {
    var window = new BrowserWindow({width: 800, height: 600});
    window.loadUrl('file://' + __dirname + '/restaurantDialog.html');
    window.webContents.on('did-finish-load', function() {
        window.webContents.send('ping', 'whoooooooh!');
    });    


};