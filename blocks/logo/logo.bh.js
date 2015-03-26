'use strict';

module.exports = function (bh) {

    bh.match('logo', function () {
        return {
            block: 'link',
            url: '/',
            mix: {block: 'logo'}
        };
    });
};
