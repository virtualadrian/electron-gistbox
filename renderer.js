window.onresize = renderLayout;

var remote = require('electron').remote;
var ipc = require('electron').ipcRenderer
const {
    clipboard,
    shell
} = require('electron')
var webview = null;

// when dom is loaded
onload = function() {
    renderLayout();

    // get webview
    webview = document.querySelector('webview');
    // load theme
    var theme = loadTheme("elementary");

    // when dom of webview is loaded
    webview.addEventListener('dom-ready', function() {
        webview.insertCSS(theme);
        webview.openDevTools();
    });
    webview.addEventListener('new-window', (e) => {
        const protocol = require('url').parse(e.url).protocol
        if (protocol === 'http:' || protocol === 'https:') {
            shell.openExternal(e.url)
        }
    });
    webview.addEventListener('did-stop-loading', function() {
        webview.executeJavaScript(loadJsFile("webview/notifications"));
    });
    // Add event listener for ipc messages from webview
    webview.addEventListener('ipc-message', function(e) {
        switch (e.channel) {
            case "clipboardText":
                // if clipboardText is sent, add it to the clipboard
                var clipboardText = e.args[0];
                clipboard.writeText(clipboardText);
                // and minimize window
                remote.getGlobal('mainWindow').minimize()
                break;
            default:
        }
    }.bind(this));


    remote.getGlobal('mainWindow').on('focus', function() {
        webview.focus()
    })

    ipc.on('shortcut', (event, message) => {
        remote.getGlobal('mainWindow').restore()
        remote.getGlobal('mainWindow').focus()

        switch (message) {
            case "createGist":
                webview.executeJavaScript(loadJsFile("webview/shortcuts/createGist"));
                break;
            case "searchGist":
                webview.executeJavaScript(loadJsFile("webview/shortcuts/searchGist"));
        }
    })





};

function loadFileContent(path) {
    const fs = require('fs');
    var path = __dirname + path;
    fs.openSync(path, 'r+'); //throws error if file doesn't exist
    var data = fs.readFileSync(path, {
        encoding: 'utf-8'
    }); //file exists, get the contentsreturn data;
    return data;
}

function loadTheme(themeName = "default") {
    return loadFileContent("/css/themes/" + themeName + '.css');
}

function loadJsFile(path) {
    return loadFileContent("/js/" + path + '.js');
}

function renderLayout() {
    var webview = document.querySelector('webview');
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var webviewWidth = windowWidth;
    var webviewHeight = windowHeight;
    webview.style.width = webviewWidth + 'px';
    webview.style.height = webviewHeight + 'px';
}
