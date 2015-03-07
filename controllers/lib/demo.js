'use strict';
// TODO: jsdoc
// TODO: test
var keystone = require('keystone');
var bundleName = __filename.match(/.*\/(.+).js$/)[1];

module.exports = function (req, res) {
    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.bundleName = bundleName;
    locals.bemjson = {block: 'root'};
    locals.title = 'Страница для демонстрации того, как все работает.';
    locals.tasks = ['Заварить чай', 'Почистить зубы', 'Лечь спать'];

    view.render(bundleName);
};
