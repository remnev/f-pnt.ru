'use strict';

module.exports = function (bh) {

    bh.match('content', function (ctx) {
        ctx.content([
            {
                elem: 'title',
                tag: 'h1',
                content: 'История Fiat Punto: от начала до сегодняшнего дня'
            },
            {block: 'timeline'}
        ]);
    });

};
