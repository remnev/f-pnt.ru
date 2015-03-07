'use strict';

module.exports = function (bh) {

    bh.match('header', function (ctx) {
        var data = ctx.tParam('data');

        ctx.content(data.title);
    });

};
