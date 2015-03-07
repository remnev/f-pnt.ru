'use strict';

modules.define(
'i-bem__dom',
['events__channels'],
function (provide, channel, BEMDOM) {

BEMDOM.decl('plus', {
    onSetMod: {
        js: {
            inited: function () {
                this.bindTo('click', function () {
                    channel('main').emit('addTask');
                });
            }
        }
    }
});

provide(BEMDOM);

});
