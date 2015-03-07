'use strict';

module.exports = function (bh) {

    bh.match('tasks', function (ctx) {
        var data = ctx.tParam('data');

        ctx
            .tag('ul')
            .js(true)
            .content(
                data.tasks.map(function (task) {
                    return {
                        elem: 'task',
                        content: task
                    };
                })
            );
    });

};
