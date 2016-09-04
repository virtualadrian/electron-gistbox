'use strict';

// save the settings into the home folder of the user
var nconf = require('nconf').file({
    file: getUserHome() + '/electron-gistbox.json'
});

function saveSettings(settingKey, settingValue) {
    nconf.set(settingKey, settingValue);
    nconf.save();
}

function readSettings(settingKey) {
    nconf.load();
    return nconf.get(settingKey);
}

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

module.exports = {
    saveSettings: saveSettings,
    readSettings: readSettings
};
