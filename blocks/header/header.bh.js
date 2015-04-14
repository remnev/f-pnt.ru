'use strict';

module.exports = function (bh) {

    bh.match('header', function (ctx) {
        ctx.content([
            {block: 'logo'},
            {block: 'main-menu'}
        ]);
    });

};
