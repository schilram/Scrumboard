"use strict";

define([//
    'underscore', //
    'backbone', //
], function(_, Backbone){
    "use strict";

    var TaskModel = Backbone.Model.extend({
        defaults: {
            title: '',
            description: '',
            estimate: 0,
            owner: '',
            state: 'todo'
        },

        validation: {
            title: {
                required: true
            },
            description: {
                required: false
            },
            estimate: {
                required: true,
                oneOf: [1, 2, 3, 5, 8],
                msg: 'Estimate is required'
            },
            owner: {
                required: true
            },
            state: {
                required: true,
                oneOf: ['todo', 'progress', 'done']
            }

        }
    });

    return TaskModel;
});