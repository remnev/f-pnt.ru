([{
    tech: 'js',
    mustDeps: [
        {
            block: 'tasks',
            elem: 'task',
            tech: 'bh'
        }
    ]
}, {
    mustDeps: [
        {
            block: 'events',
            elem: 'channels'
        }
    ],
    shouldDeps: [
        {elem: 'task'}
    ]
}]);
