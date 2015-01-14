'use strict';

var techs = {
    levels: require('enb/techs/levels'),
    fileProvider: require('enb/techs/file-provider'),
    bemdeclFromDepsByTech: require('enb/techs/bemdecl-from-deps-by-tech'),
    borschik: require('enb-borschik/techs/borschik'),
    deps: require('enb/techs/deps'),
    files: require('enb/techs/files'),
    css: require('enb/techs/css'),
    js: require('enb/techs/js'),
    bhClientModule: require('enb-bh/techs/bh-client-module'),
    bhServer: require('enb-bh/techs/bh-server'),
    fileMerge: require('enb/techs/file-merge'),
    fileCopy: require('enb/techs/file-copy'),
    prependModules: require('enb-modules/techs/prepend-modules')
};

module.exports = function (config) {
    config.nodes('bundles/*');

    config.nodeMask(/bundles\/.*/, function (nodeConfig) {
        nodeConfig.addTechs([
            [techs.levels, {levels: getLevels(config)}],
            // server bemdecl
            [techs.fileProvider, {target: '?.server.bemdecl.js'}],
            // browser bemdecl
            [
                techs.bemdeclFromDepsByTech,
                {
                    target: '?.browser.bemdecl.js',
                    sourceTech: 'js',
                    destTech: 'bh'
                }
            ],
            // server deps.js
            [
                techs.deps,
                {
                    bemdeclTarget: '?.server.bemdecl.js',
                    depsTarget: '?.server.deps.js'
                }
            ],
            // browser deps.js
            [
                techs.deps,
                {
                    bemdeclTarget: '?.browser.bemdecl.js',
                    depsTarget: '?.browser.deps.js'
                }
            ],
            // server files
            [techs.files, {depsTarget: '?.server.deps.js'}],
            // browser files
            [
                techs.files,
                {
                    depsTarget: '?.browser.deps.js',
                    filesTarget: '?.browser.files',
                    dirsTarget: '?.browser.dirs'
                }
            ],
            techs.css,
            [
                techs.js,
                {
                    sourceSuffixes: ['vanilla.js', 'browser.js', 'js']
                }
            ],
            // browser js + ymodules system
            [
                techs.prependModules,
                {
                    target: '?.js+ymodules.js',
                    source: '?.js'
                }
            ],
            // pure browser bh
            [
                techs.bhClientModule,
                {
                    target: '?.browser.pure.bh.js',
                    filesTarget: '?.browser.files',
                    sourceSuffixes: ['bh', 'bh.js'],
                    jsAttrName: 'data-bem',
                    jsAttrScheme: 'json'
                }
            ],
            // pure browser bh + js + ymodules system
            [
                techs.fileMerge,
                {
                    sources: [
                        '?.js+ymodules.js',
                        '?.browser.pure.bh.js'
                    ],
                    target: '?.browser.js'
                }
            ],

            // server bh
            [
                techs.bhServer,
                {
                    target: '?.server.bh',
                    sourceSuffixes: ['bh', 'bh.js'],
                    jsAttrName: 'data-bem',
                    jsAttrScheme: 'json'
                }
            ]
        ]);

        nodeConfig.mode('development', function (nodeConfig) {
            nodeConfig.addTechs([
                [
                    techs.fileCopy,
                    {
                        sourceTarget: '?.css',
                        destTarget: '_?.css'
                    }
                ],
                [
                    techs.fileCopy,
                    {
                        sourceTarget: '?.browser.js',
                        destTarget: '_?.browser.js'
                    }
                ]
            ]);
        });

        nodeConfig.mode('production', function (nodeConfig) {
            nodeConfig.addTechs([
                [
                    techs.borschik,
                    {
                        sourceTarget: '?.browser.js',
                        destTarget: '_?.browser.js',
                        minify: true,
                        freeze: true
                    }
                ],
                [
                    techs.borschik,
                    {
                        sourceTarget: '?.css',
                        destTarget: '_?.css',
                        minify: true,
                        freeze: true
                    }
                ]
            ]);
        });

        nodeConfig.addTargets([
            //  server (bh + i18n)
            '?.server.bh',

            //  browser (js + client bh)
            '_?.browser.js',
            '_?.css'
        ]);
    });
};

function getLevels(config) {
    var levels = [
        {
            path: 'vendors/bem-core/common.blocks',
            check: false
        },
        {
            path: 'vendors/bem-core/desktop.blocks',
            check: false
        },
        {
            path: 'vendors/bem-components/common.blocks',
            check: false
        },
        {
            path: 'vendors/bem-components/desktop.blocks',
            check: false
        },
        'blocks',
        'bundles'
    ];

    return levels.map(function (levelPath) {
        return config.resolvePath(levelPath);
    });
}
