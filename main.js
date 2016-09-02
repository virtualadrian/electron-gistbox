const electron = require('electron')
const app = electron.app
const path = require('path')
const browserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut
const {Menu, Tray} = require('electron')



let tray = null
app.on('ready', () => {

})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  global.mainWindow = new browserWindow({width: 1570, height: 940, center: true,icon: __dirname + '/img/tray.png'})

  // and load the index.html of the app.
  global.mainWindow.loadURL(`file://${__dirname}/index.html`)




  	let image = electron.nativeImage.createFromPath(path.join(__dirname, 'img', 'tray.png'))
tray = new Tray( image );
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Item1', type: 'radio'},
    {label: 'Item2', type: 'radio'},
    {label: 'Item3', type: 'radio', checked: true},
    {label: 'Item4', type: 'radio'}
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)






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

	console.log("adsfasfd");

    var createGist = globalShortcut.register('Command+B', function(){
		  console.log("testddd");
      global.mainWindow.webContents.send('shortcut', 'createGist');
    });
    var searchGist = globalShortcut.register('Alt+Space', function(){
		  console.log("testddd");
      global.mainWindow.webContents.send('shortcut', 'searchGist');
    });
	  console.log("teasdadst");
}