'use strict';

module.exports = function (bh) {

    bh.match('plus', function (ctx) {
        ctx
            .js(true)
            .content('+');
    });

};
