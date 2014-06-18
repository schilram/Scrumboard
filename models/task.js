"use strict";

var Task = {
    tasks: [
        {id:1, title:"Get Wood", description:"Go to the Forest and get some Wood", estimate:3, owner:"Ramon", state:"progress"},
        {id:2, title:"Dryage Meat", description:"Dryaged Meat is the best", estimate:8, owner:"Ramon", state:"progress"},
        {id:3, title:"Buy Wine", description:"No BBQ without Wine", estimate:1, owner:"Ramon", state:"done"},
        {id:4, title:"Make Salad", description:"Salad for the Ladies", estimate:1, owner:"Ramon", state:"todo"},
        {id:5, title:"Make Fire", description:"no need for a description", estimate:2, owner:"Ramon", state:"todo"}
    ],

    lastId: 5,

    getNextId: function () {
        this.lastId += 1;
        return this.lastId;
    },

    clone: function (data) {
        // JavaScript doesn't have a real clone function
        // This is good enough for simple, data-only objects
        return JSON.parse(JSON.stringify(data));
    },

    // merges object with the attributes passed into this function
    merge: function(object, attr) {
        for (var attrname in attr) {
            object[attrname] = attr[attrname];
        }
        return object;
    },

    add: function (data) {
        console.log('creating task with ' + JSON.stringify(data));
        var data = this.clone(data);
        var id = this.getNextId();
        data.id = id;
        this.tasks.push(data);
        return data;
    },

    update: function(id, data) {
        console.log('updating with ' + JSON.stringify(data));
        for (var i = 0; i < this.tasks.length; i++) {

            console.log(this.tasks[i].id + " :: " + id);
            console.log();

            if (this.tasks[i].id == id) {
                Task.merge(this.tasks[i], data);
                return this.tasks[i];
            }
        }
        return void 0;
    },

    remove: function (id) {
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id == id) {
                var task = this.tasks[i];
                this.tasks.splice(i, 1);
                return task; // remove element and return it
            }

        }
        return void 0;
    },

    allByState: function (state) {
        var tasks = [];
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].state == state) {
                tasks.push(this.tasks[i]);
            }
        }
        return tasks;
    },

    all: function () {
        return this.tasks;
    },

    clearAll: function () {
        this.tasks = [];
        this.lastId = 0;
    },

    validate: function (data) {
        console.log('validate: ' + JSON.stringify(data));

        var isNotEmpty =
            data.title.trim() &&
            data.owner.trim() &&
            data.state.trim();

        var isValidEstimate = false;
        var estimate = [1,2,3,5,8];
        for (var i = 0; i < estimate.length; i++) {
            if(data.estimate == estimate[i]){
                isValidEstimate = true;
                break;
            }
        }

        return (isNotEmpty && isValidEstimate);
    }
};

exports.all = function () {
    return Task.all();
};

exports.allByState = function (id) {
    return Task.allByState(id);
};

exports.clearAll = function () {
    return Task.clearAll();
};

exports.create = function (data) {
    if(Task.validate(data)){
        return Task.add(data);
    }else{
        return void 0;
    }
};

exports.update = function (id, data) {
    if(id.trim() && Task.validate(data)){
        return Task.update(id, data);
    }else{
        return void 0;
    }
};

exports.remove = function (id) {
    return Task.remove(id);
};