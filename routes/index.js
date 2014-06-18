"use strict";

module.exports = function(app) {
    require('./tasks')(app);

    app.get('/', function(req, res) {
        res.sendfile('public/index.html');
    });
};