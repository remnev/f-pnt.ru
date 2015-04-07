'use strict';

module.exports = function (bh) {

    bh.match('main-menu', function (ctx) {
        var data = ctx.tParam('data');
        var mainMenuBemjson = data.mainMenu.map(function (item) {
            return {
                block: 'link',
                url: item.url,
                content: item.title,
                mods: {
                    active: data.urlPath.indexOf(item.url) !== -1 ? true : false
                }
            };
        });

        ctx.content(mainMenuBemjson);
    });
};
