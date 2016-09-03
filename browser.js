window.onresize = doLayout;
var remote = require('electron').remote;
var webview = null;
const {shell} = require('electron')

onload = function () {
    webview = document.querySelector('webview');
     doLayout();

    //registerShortCuts();

    var theme = loadGistBoxTheme("elementary");

    webview.addEventListener('dom-ready', function () {
        webview.insertCSS(theme);
        webview.openDevTools();
    });
    webview.addEventListener('new-window', (e) => {
		const protocol = require('url').parse(e.url).protocol
		if (protocol === 'http:' || protocol === 'https:') {
		  shell.openExternal(e.url)
		}
	 });

     require('electron').ipcRenderer.on('shortcut', (event, message) => {
		 remote.getGlobal('mainWindow').restore()
       remote.getGlobal('mainWindow').focus()
		 webview.focus()

					 switch (message) {
						 case "createGist":
							 webview.executeJavaScript(loadJsFile("webview/shortcuts/createGist"));
							 break;
						 case "searchGist":
							 webview.executeJavaScript(loadJsFile("webview/shortcuts/searchGist"));
					 }
		 if (message == "createGist") {

       }
    })
    webview.addEventListener('did-stop-loading', function() {
        webview.executeJavaScript(loadJsFile("webview/notifications"));
        webview.executeJavaScript(loadJsFile("webview/shortcuts/copyGist"));
    })




};
function loadGistBoxTheme(themeName = "default") {
    const fs = require('fs');
    var path = __dirname+"/css/themes/" + themeName + '.css';
    fs.openSync(path, 'r+'); //throws error if file doesn't exist
    var data = fs.readFileSync(path, {encoding:'utf-8'}); //file exists, get the contents
    return data;
}
function loadJsFile(path) {
    const fs = require('fs');
    var path = __dirname+"/js/" + path + '.js';
    fs.openSync(path, 'r+'); //throws error if file doesn't exist
    var data = fs.readFileSync(path, {encoding:'utf-8'}); //file exists, get the contents
    return data;
}
function doLayout() {
    var webview = document.querySelector('webview');
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var webviewWidth = windowWidth;
    var webviewHeight = windowHeight;
    webview.style.width = webviewWidth + 'px';
    webview.style.height = webviewHeight + 'px';
}
