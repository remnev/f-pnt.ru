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
    locals.years = [
        {
            year: '1993',
            url: '/',
            title: 'Punto 1 (176)',
            description: [
                'Первое поколение модели Punto представлено публике в сентябре 1993 года. ',
                'Позднее, в 1995 году, эта модель станет Автомобилем года в Европе. </br>',
                'Дизайн разработан Джоржетто Джуджаро.'
            ].join('')
        },
        {
            year: '1994'
        },
        {
            year: '1995'
        },
        {
            year: '1996'
        },
        {
            year: '1997'
        },
        {
            year: '1998'
        },
        {
            year: '1999',
            url: '/',
            title: 'Punto 2 (188)',
            description: [
                'Сентябрь 1999 года, Франкфуртский автосалон. Мир увидел Fiat Punto второго поколения. </br>',
                'Модель приурочили к столетию марки Fiat.'
                ].join('')
        },
        {
            year: '2000'
        },
        {
            year: '2001'
        },
        {
            year: '2002'
        },
        {
            year: '2003',
            url: '/',
            title: 'Punto 2 Facelift',
            description: 'Второе поколение Punto с новым экстерьером.'
        },
        {
            year: '2004'
        },
        {
            year: '2005',
            url: '/',
            title: 'Grande Punto (199)',
            description: 'Третье поколение Fiat Punto. Дизайн разрабатывался Джуджаро, а платформа совместно Fiat и GM.'
        },
        {
            year: '2005'
        },
        {
            year: '2006'
        },
        {
            year: '2007'
        },
        {
            year: '2008'
        },
        {
            year: '2009',
            url: '/',
            title: 'Punto Evo',
            description: 'Фейслифт третьего поколения Fiat Punto. Новая передняя часть, задняя оптика, интерьер.'
        },
        {
            year: '2010'
        },
        {
            year: '2011'
        },
        {
            year: '2012',
            url: '/',
            title: 'Punto',
            description: [
                'Модель вернула себе облик передней части от классического Grande Punto, а задняя оптика',
                'и интерьер остались от Punto Evo.'
                ].join('')
        },
        {
            year: '2013'
        },
        {
            year: '2014'
        },
        {
            year: '2015'
        }
    ];

    view.render(bundleName);
};
