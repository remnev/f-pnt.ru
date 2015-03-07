'use strict';

module.exports = function (bh) {

    bh.match('content', function (ctx) {
        ctx.content([
            {block: 'tasks'},
            {block: 'plus'}
        ]);
    });

};
