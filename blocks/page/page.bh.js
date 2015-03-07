'use strict';

var f = require('util').format;

module.exports = function (bh) {
    bh.match('root', function (ctx) {
        var data = ctx.json().data;

        ctx.tParam('data', data);

        return {
            block: 'page',
            title: 'title will be here',
            favicon: '/public/favicon.ico',
            head: [
                {
                    elem: 'css',
                    url: f('/bundles/%s/_%s.css', data.bundleName, data.bundleName)
                },
                {
                    elem: 'js',
                    url: f('/bundles/%s/_%s.browser.js', data.bundleName, data.bundleName)
                },
                {
                    elem: 'meta',
                    attrs: {
                        name: 'description',
                        content: ''
                    }
                }
            ],
            content: [
                {block: 'header'},
                {block: 'content'},
                {block: 'footer'}
            ]
        };
    });
};
