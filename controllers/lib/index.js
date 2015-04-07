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
    locals.title = 'Главная страница';
    locals.mainMenu = [
        {url: '/', title: 'главная'},
        {url: '/cars', title: 'машины'},
        {url: '/services', title: 'сервисы'},
        {url: '/parts', title: 'запчасти'},
        {url: '/qa', title: 'Q/A'}
    ];
    view.render(bundleName);
};
