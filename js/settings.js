'use strict';

var ipc = require('electron').ipcRenderer
var configuration = require('../configuration')
var serialize = require('form-serialize')

// begin binding events, only after gistbox binded its
document.addEventListener("DOMContentLoaded", function(event) {
    // load the settings into the form
    loadSettings()

    // then add event listeners
    var fields = document.querySelectorAll('form input, form select')
    for (var i = 0; i < fields.length; i++) {
        fields[i].addEventListener('change', function(e) {
            saveSettings()
        });
    }
})

// save the whole form into settings
function saveSettings() {
    var form = document.querySelector('form')
    var serializedForm = serialize(form, {
        hash: true
    })
    configuration.saveSettings('settings', serializedForm);

    // and reset global shortcuts with these new settings
    ipc.send('registerGlobalShortCuts');
}

function loadSettings() {
    var settings = configuration.readSettings("settings")
    for (var key in settings) {
        if (settings.hasOwnProperty(key)) {
            if (document.querySelector('input[name=' + key + ']') !== null) {
                document.querySelector('input[name=' + key + ']').value = settings[key]
            }
            if (document.querySelector('select[name=' + key + ']') !== null) {
                document.querySelector('select[name=' + key + ']').value = settings[key]
            }
        }
    }
}
