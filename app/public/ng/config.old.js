requirejs.config({
    deps: ['app'],
    paths: {
        "modernizr": "../vendor/modernizr/modernizr",
        "underscore": "../vendor/lodash/dist/lodash",
        'fastclick' : '../vendor/fastclick/lib/fastclick'
    },

    shim: {
        underscore: {
            exports: ['_', 'lodash']
        }
    }, 

    map: {
        '*': {
            'lodash': 'underscore'
        }
    }

});