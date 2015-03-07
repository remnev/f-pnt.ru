'use strict';

modules.define(
'i-bem__dom',
['bh', 'events__channels'],
function (provide, bh, channel, BEMDOM) {

BEMDOM.decl('tasks', {
    onSetMod: {
        js: {
            inited: function () {
                this.$tasks = this.elem('task');

                channel('main').on('addTask', this._addTask, this);
            }
        }
    },
    _addTask: function () {
        this.domElem.append(this._generateTask());
    },
    _generateTask: function () {
        var bemjson = {
            block: 'tasks',
            elem: 'task',
            content: this.$tasks.eq(this._getRandomInt(0, this.$tasks.length - 1)).text()
        };

        return bh.apply(bemjson);
    },
    _getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
});

provide(BEMDOM);

});
