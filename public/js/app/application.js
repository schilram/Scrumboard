"use strict";

define([//
    'jquery', //
    'underscore', //
    'backbone', //
    'app/views/appView', //
    'backbone.validation'
], function($, _, Backbone, AppView){
    "use strict";

    var App = function()
    {
        var init = function(){
            console.log("Init");

            var appView = new AppView();
        };

        /*------------------------------------------------------*/
        // Return
        return {
            init : init
        };
    };

    return new App();
});