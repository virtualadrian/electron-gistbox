var ipc = require('electron').ipcRenderer

// begin binding events, only after gistbox binded its
document.addEventListener("DOMContentLoaded", function(event) {
    // add event listener for local shortcuts
    document.addEventListener('keyup', function(event) {
        event.preventDefault();
        event.stopPropagation();
        // if enter was pressed, a gist file is visible and no modal is opened
        if (event.keyCode === 13 && document.querySelector(".gist-file") !== null && document.querySelector(".modal") === null) {
            // load the first file from the selected gist into the clipboard
            var clipboardText = document.querySelector(".gist-file .copy-gist").getAttribute("data-clipboard-text");
            // we do this via an ipc message to the renderer.sj
            ipc.sendToHost("clipboardText", clipboardText)
        } else if (event.keyCode === 116 && document.querySelector(".modal") === null) {
            document.querySelector('.refresh-gists').click();
        }
        return false;
    }, false);
});
