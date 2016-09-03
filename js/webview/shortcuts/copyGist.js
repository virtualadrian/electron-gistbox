document.addEventListener('keyup', function(event) {

	console.log(event)
    if (event.keyCode === 13 && document.querySelector(".gist-file") !== null) {
       var clipboardText = document.querySelector(".gist-file .copy-gist").getAttribute("data-clipboard-text");
		 ipc.sendToHost('pong')
    }
}, false);