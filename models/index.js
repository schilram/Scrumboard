"use strict";

module.exports = function(app) {
    app.models = {};
    app.models.task = require('./task');
};