"use strict";

var controller = require('../controllers/tasks');

module.exports = function(app) {

    app.get('/tasks', function(req, res) {
        controller.all(app, req, res);
    });

    app.get('/tasks/:state', function(req, res) {
        controller.allByState(app, req, res);
    });

    app.post('/tasks', function(req,res) {
        controller.create(app, req, res);
    });

    app.put('/tasks/:id', function(req,res) {
        controller.update(app, req, res);
    });

    app.delete('/tasks/:id', function(req,res) {
        controller.remove(app, req, res);
    });
};