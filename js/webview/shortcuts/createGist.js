var modalOpened = document.querySelector('.new-gist-modal') !== null
if (!modalOpened) {
	document.querySelector('.sidebar-new-gist').click();
}
window.setTimeout(function ()
{
	document.querySelector('.new-gist-modal .gist-description').focus();
}, 500);