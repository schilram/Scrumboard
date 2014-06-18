"use strict";

define([//
    'jquery', //
    'underscore', //
    'backbone', //
    'text!templates/taskTemplate.html' //
], function($, _, Backbone, taskTemplate)
{
    "use strict";

    var TaskView = Backbone.View.extend({
        template : _.template(taskTemplate),

        events: {
            'click #task-delete': 'delete',
            'click #task-edit': 'edit',
            'dragstart': 'dragStart'
        },

        initialize : function() {
            this.listenTo(this.model, 'add', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },

        render : function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        /*---------------------------------------------------*/

        dragStart : function (e) {
            var dataTransfer = e.originalEvent.dataTransfer;

            // enable dragging
            dataTransfer.effectAllowed = 'move';
            dataTransfer.setData('Text', this.model.get('id'));
            dataTransfer.setDragImage(e.target, 30, 20);

            return true;
        },

        delete: function() {
            this.model.destroy();
        },

        edit: function() {
            this.model.trigger("edit", this.model);
        }
    });

    return TaskView;
});