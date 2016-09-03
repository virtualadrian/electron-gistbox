var modalOpened = document.querySelector('.new-gist-modal') !== null
if (!modalOpened) {
	app.usageHelper.addUsage("gist","click_new_gist")
	new LibraryNewGistView
	//document.querySelector('.sidebar-new-gist').click();
}
window.setTimeout(function ()
{
	document.querySelector('.new-gist-modal .gist-description').focus();
}, 500);
