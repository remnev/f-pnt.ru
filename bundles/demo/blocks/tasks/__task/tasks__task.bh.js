'use strict';

module.exports = function (bh) {

    bh.match('tasks__task', function (ctx) {
        ctx.tag('li');
    });

};
