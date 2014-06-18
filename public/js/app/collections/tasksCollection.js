"use strict";

define([//
    'underscore', //
    'backbone', //
    'app/models/taskModel', //
], function(_, Backbone, TaskModel){
    "use strict";

    var TasksCollection = Backbone.Collection.extend({
        model: TaskModel,
        url: '/tasks'
    });

    return TasksCollection;
});