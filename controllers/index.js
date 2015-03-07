'use strict';
// TODO: jsdoc

var path = require('path');
var glob = require('glob');
var controllers = {};

glob.sync(path.join(__dirname, 'lib/*.js')).forEach(function (pathToController) {
    var id = pathToController.match(/.*\/(.+).js$/)[1];

    controllers[id] = require(pathToController);
});

module.exports = controllers;
