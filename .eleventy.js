module.exports = function (config) {
    config.addFilter('example', require('./app/filters/example.js'));

    return {
        dir: {
            input: 'app/content',
            output: 'html',

            data: './../data',
            includes: './../includes',
            layouts: './../layouts'
        }
    };
};
