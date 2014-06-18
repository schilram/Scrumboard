"use strict";

define([//
    'jquery', //
    'underscore', //
    'backbone', //
    'app/collections/tasksCollection', //
    'app/models/taskModel', //
    'app/views/taskView', //
    'app/views/taskModalView' //
], function($, _, Backbone, TasksCollection, TaskModel, TaskView, TaskModalView)
{
    "use strict";

    var AppView = Backbone.View.extend({
        el : $('#scrum-app'),

        scrumContainer : $('.scrum-tasks'),

        events: {
            'click .createTask': 'addTask',

            'dragover .panel': 'dragOver',
            'dragenter .panel': 'dragEnter',
            'drop .panel': 'dragDrop'
        },

        initialize : function() {
            this.tasks = new TasksCollection();

            this.listenTo(this.tasks, 'edit', this.editTask);
            this.listenTo(this.tasks, 'all', this.render);

            this.tasks.fetch();
        },

        render: function(){
            //clear items
            this.scrumContainer.empty();

            var that = this;
            this.tasks.each(function(task) {
                that.getTask(task);
            });
        },

        /*---------------------------------------------------*/

        addTask: function(e) {
            console.log("AppView.addTask");

            var task = new TaskModel({
                state: $(e.currentTarget).data("state"),
                mode: 'new'
            });

            var taskModalView = new TaskModalView({
                model: task,
                collection: this.tasks
            });

            $('#createTask').html( taskModalView.el );
            taskModalView.render();
        },

        editTask: function(task) {
            console.log("AppView.editTask: " + task.id);

            task.mode = 'edit';
            var taskModalView = new TaskModalView({
                model: task,
                collection: this.tasks
            });

            $('#createTask').html( taskModalView.el );
            taskModalView.render();
        },

        /*---------------------------------------------------*/

        getTask: function(task){
            console.log("getTask");

            var taskView = new TaskView({ model: task });

            //add task to correct col
            if (task.get('state') == 'done') {
                $('#scrum-done').append(taskView.el);
            } else if (task.get('state') == 'progress') {
                $('#scrum-progress').append(taskView.el);
            } else {
                $('#scrum-todo').append(taskView.el);
            }

            taskView.render();
        },

        /*---------------------------------------------------*/

        //add drag and dropget(
        dragOver: function (e) {
            e.preventDefault();
            e.originalEvent.dataTransfer.dropEffect = 'move';
        },

        dragEnter: function (e) {
            $('.scrum-column').removeClass('scrum-column-active');
            $(e.currentTarget).addClass('scrum-column-active');
        },

        dragDrop: function (e) {
            e.preventDefault();
            $(e.currentTarget).removeClass('scrum-column-active');

            // get status from stack ID
            var id = e.originalEvent.dataTransfer.getData('Text'),
                task = this.tasks.get(id),
                col = $('.scrum-tasks', e.currentTarget).attr('id'),
                state;

            if (col == 'scrum-done') {
                state = 'done';
            } else if (col == 'scrum-progress') {
                state = 'progress';
            } else {
                state = 'todo';
            }

            task.set({state: state});
            task.save();
        }
    });

    return AppView;
});