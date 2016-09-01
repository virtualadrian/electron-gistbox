const electron = require('electron')
const app = electron.app
const browserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  global.mainWindow = new browserWindow({width: 1570, height: 940, center: true})

  // and load the index.html of the app.
  global.mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
//  mainWindow.webContents.openDevTools()
    registerShortCuts();
  // Emitted when the window is closed.
  global.mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    global.mainWindow = null
  })
 
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (global.mainWindow === null) {
    createWindow()
  }
})


function registerShortCuts() {
    var createGist = globalShortcut.register('alt+n', function(){
      global.mainWindow.webContents.send('shortcut', 'createGist');
    });
}