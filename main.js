'use strict';
const electron = require('electron')
const app = electron.app
const path = require('path')
const browserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut
var configuration = require('./configuration');
var ipc = require('electron').ipcMain
var settingsWindow = null;
const {
    Menu,
    Tray
} = require('electron')



//let tray = null
//app.on('ready', () => {

//})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function() {
   // if there aren't any settings yet, set default settings
    if (!configuration.readSettings('settings')) {
        configuration.saveSettings('settings', {
          'searchGist':'Alt+Space',
          'newGist':'Alt+N',
          'theme':'elementary'
        });
    }
    createWindow()
    registerGlobalShortCuts()
})

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (global.mainWindow === null) {
        createWindow()
    }
})

// creates the main window
function createWindow() {
    // Create the window
    global.mainWindow = new browserWindow({
        width: 1570,
        height: 940,
        center: true
            //icon: __dirname + '/img/tray.png'
    })

    // and load the index.html of the app
    global.mainWindow.loadURL(`file://${__dirname}/main.html`)
    // set event listeners
    global.mainWindow.on('closed', function() {
        // Dereference the window object
        global.mainWindow = null
    })

    // creates the menu
    createMenu(global.mainWindow)

    // initialize settings window
    var settingsWindow = null;
}


function openSettingsWindow() {
    if (settingsWindow) {
        return;
    }
    settingsWindow = new browserWindow({
        frame: false,
        height: 400,
        resizable: false,
        width: 600
    });

    settingsWindow.loadURL('file://' + __dirname + '/views/settings.html');
    settingsWindow.on('closed', function() {
        settingsWindow = null;
    });

    // settings window automatically closes on blur
    settingsWindow.on('blur', function() {
        settingsWindow.close()
    });
}

ipc.on('open-settings-window', function() {
    openSettingsWindow()
});

ipc.on('close-settings-window', function() {
    if (settingsWindow) {
        settingsWindow.close();
    }
});
ipc.on('registerGlobalShortCuts', function() {
    registerGlobalShortCuts();
});

// creates the menu for the main window
function createMenu(window) {
    const {
        Menu
    } = require('electron')

    const template = [{
        label: 'App',
        submenu: [{
            label: 'Settings',
            click(item, focusedWindow) {
                openSettingsWindow()
            }
        }]
    }, {
        label: 'View',
        submenu: [{
            label: 'Reload',
            accelerator: 'CmdOrCtrl+R',
            click(item, focusedWindow) {
                if (focusedWindow) focusedWindow.reload()
            }
        }, {
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
            click(item, focusedWindow) {
                if (focusedWindow) focusedWindow.webContents.toggleDevTools()
            }
        }, {
            type: 'separator'
        }, {
            role: 'resetzoom'
        }, {
            role: 'zoomin'
        }, {
            role: 'zoomout'
        }, {
            type: 'separator'
        }, {
            role: 'togglefullscreen'
        }]
    }, {
        role: 'window',
        submenu: [{
            role: 'minimize'
        }, {
            role: 'close'
        }]
    }, {
        role: 'help',
        submenu: [{
            label: 'Learn More',
            click() {
                require('electron').shell.openExternal('http://electron.atom.io')
            }
        }]
    }]

    if (process.platform === 'darwin') {
        const name = require('electron').remote.app.getName()
        template.unshift({
                label: name,
                submenu: [{
                    role: 'about'
                }, {
                    type: 'separator'
                }, {
                    role: 'services',
                    submenu: []
                }, {
                    type: 'separator'
                }, {
                    role: 'hide'
                }, {
                    role: 'hideothers'
                }, {
                    role: 'unhide'
                }, {
                    type: 'separator'
                }, {
                    role: 'quit'
                }]
            })
            // Edit menu.
        template[1].submenu.push({
                type: 'separator'
            }, {
                label: 'Speech',
                submenu: [{
                    role: 'startspeaking'
                }, {
                    role: 'stopspeaking'
                }]
            })
            // Window menu.
        template[3].submenu = [{
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        }, {
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        }, {
            label: 'Zoom',
            role: 'zoom'
        }, {
            type: 'separator'
        }, {
            label: 'Bring All to Front',
            role: 'front'
        }]
    }

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
    window.setMenu(menu)
}

// registers the shortcuts that can be used system wide
function registerGlobalShortCuts() {
    globalShortcut.unregisterAll();
    var settings = configuration.readSettings('settings')
    // focuses the window and opens "New Gist"-Modal
    var createGist = globalShortcut.register(settings.newGist, function() {
        global.mainWindow.webContents.send('shortcut', 'createGist');
    });

    // focuses the window and sets cursor into search field
    var searchGist = globalShortcut.register(settings.searchGist, function() {
        global.mainWindow.webContents.send('shortcut', 'searchGist');
    });
}
