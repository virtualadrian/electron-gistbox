// if new gist modal isn't open already, open it
var modalOpened = document.querySelector('.new-gist-modal') !== null
if (!modalOpened) {
    app.usageHelper.addUsage("gist", "click_new_gist")
    new LibraryNewGistView
}
// and then set cursor into description area
window.setTimeout(function() {
    document.querySelector('.new-gist-modal .gist-description').focus();
}, 500);
