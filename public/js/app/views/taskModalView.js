"use strict";

define([//
    'jquery', //
    'underscore', //
    'backbone', //
    'text!templates/taskModalTemplate.html', //
], function($, _, Backbone, taskModalTemplate)
{
    "use strict";

    var TaskModalView = Backbone.View.extend({
        template : _.template(taskModalTemplate),

        events: {
            'click #saveTask': 'save'
        },

        initialize : function() {
            this.realModel = this.model;
            this.model = this.realModel.clone();

            this.listenTo(this.model, 'change', this.render);

            var formPrefix = "task-";
            //validate form
            Backbone.Validation.bind( this, {
                valid: function( view, attr, selector ) {
                    console.log('valid: ' + attr);

                    var control = view.$('[' + selector + '=' + formPrefix + attr + ']');
                    var group = control.parents(".form-group");
                    group.removeClass("has-error");
                    group.find(".help-block").remove();
                },
                invalid: function( view, attr, error, selector ) {
                    console.log('invalid: ' + attr);

                    var control = view.$('[' + selector + '=' + formPrefix + attr + ']');
                    var group = control.parents(".form-group");
                    group.addClass("has-error");
                    group.find(".help-block").remove();
                    group.append("<span for=" + formPrefix + attr + " class='help-block'>" + error + "</span>");
                }
            });
        },

        render : function() {
            console.log("TaskModalView.render");

            this.$el.html(this.template(this.model.toJSON()));

            var modalTitle = '';
            if(this.model.get('mode') === 'new'){
                modalTitle = 'Create new Task';
            } else {
                modalTitle = 'Edit Task';
            }
            this.$(".modal-title").html(modalTitle);

            // Select the complexity checkbox
            this.$('#task-estimate' + this.model.get('estimate')).prop('checked', true);

            return this;
        },

        /*---------------------------------------------------*/

        hide : function() {
            console.log("TaskModalView.hide");
            $('#createTask').modal('hide');
        },

        save : function() {
            console.log("TaskModalView.save");

            // save form values
            this.model.set({
                'title': this.$('input[name=task-title]').val(),
                'description': this.$('textarea[name=task-description]').val(),
                'owner': this.$('input[name=task-owner]').val(),
                'estimate': parseInt(this.$('input[name=task-estimate]:checked').val())
            });

            if(this.model.isValid(true)){
                //close modal
                this.hide();

                console.log(this.realModel.isNew());

                //save model
                this.realModel.set(this.model.attributes);

                if(this.realModel.isNew()){
                    this.collection.add(this.realModel);
                }

                this.realModel.save();
            }
        }
    });

    return TaskModalView;
});