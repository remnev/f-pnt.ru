'use strict';

module.exports = function (bh) {

    bh.match('timeline', function (ctx) {
        var data = ctx.tParam('data');
        var yearsBemjson = data.years.map(function (item) {
            return {
                elem: 'year',
                mods: {
                    'has-event': item.title && item.description ? true : false
                },
                tag: 'li',
                content: [
                {
                    elem: 'yearTitle',
                    content: item.year
                },
                {
                    elem: 'event',
                    content: [
                        {
                            block: 'link',
                            url: item.url,
                            content: item.title
                        },
                        {
                            elem: 'description',
                            content: item.description
                        }
                    ]
                }]
            };
        });

        ctx
            .tag('ul')
            .content(yearsBemjson);
    });

};
