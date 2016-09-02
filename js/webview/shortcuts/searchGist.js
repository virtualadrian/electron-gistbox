var modalOpened = document.querySelector('.new-gist-modal') !== null
if (!modalOpened) {
	window.setTimeout(function ()
{
	document.querySelector('.header-searchbox .input-search').focus();
}, 500);
}