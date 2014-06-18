"use strict";

require.config({
//version for caching scripts
    urlArgs: "bust=v-0-1",

    paths: {
        'jquery': 'libs/jquery/jquery-2.1.0.min',

        'bootstrap': 'libs/bootstrap/bootstrap-3.1.1.min',

        'text' : 'libs/require/text',

        'lodash': 'libs/lodash/lodash-2.4.1.min',

        'backbone': 'libs/backbone/backbone-1.1.2.min',

        'backbone.validation': 'libs/backbone/backbone-validation-0.9.1.min',

        //path to templates
        'templates': '../templates'
    },

    shim: {
        // Bootstrap
        'bootstrap': ['jquery'],

        // Backbone
        'backbone': {
            // Depends on underscore/lodash and jQuery
            'deps': ['underscore', 'jquery'],
            // Exports the global window.Backbone object
            'exports': 'Backbone'
        },

        //Backbone Validation
        'backbone.validation': ['underscore', 'backbone']
    },

    map: {
        "*": {
            "underscore": "lodash"
        }
    }
});

require([//
    'jquery',//
    'bootstrap', //
    'app/application', //
],function($, Bootstrap, App) {
    // start app on dom ready
    $(function() {
        //init App
        App.init();
    });
});

require.onError = function( err ) {
    if ( err.requireType === 'timeout' && window.console && window.console.log )
    {
        console.log('modules: ' + err.requireModules);
    }

    throw err;
};