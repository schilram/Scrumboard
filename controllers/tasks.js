"use strict";

exports.all = function(app, req, res) {
    var tasks = app.models.task.all();
    res.json( tasks );
};

exports.allByState = function(app, req, res) {
    var tasks = app.models.task.allByState(req.params.state);
    res.json( tasks );
};

exports.create = function(app, req, res) {
    console.log('Creating new task');
    var task = app.models.task.create(req.body);
    if(!task){
        task = "Error: arguments are empty or invalid";
    }
    res.json( task );
};

exports.update = function(app, req, res) {
    var task = app.models.task.update(req.params.id, req.body);
    if(!task){
        task = "Error: arguments are empty or invalid";
    }
    res.json( task );
};

exports.remove = function(app, req, res) {
  var task = app.models.task.remove(req.params.id);
  res.json( task );
};