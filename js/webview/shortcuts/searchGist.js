// if the "new-gist-modal" is not opened
var modalOpened = document.querySelector('.new-gist-modal') !== null
if (!modalOpened) {
    // set the cursor into the search field
    window.setTimeout(function() {
        document.querySelector('.header-searchbox .input-search').value = ''
        document.querySelector('.header-searchbox .input-search').focus();
    }, 500);
}
