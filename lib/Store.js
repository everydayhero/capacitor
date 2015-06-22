"use strict";

var EventEmitter = require('events').EventEmitter;
var _            = require('lodash');
var deferEvents  = require('./deferEvents');

var ObjectStore = function(data) {
  this._defaults = data || {};
  this.reset();
};

ObjectStore.prototype = _.extend(EventEmitter.prototype, {
  get: function(key) {
    return this._store[key];
  },

  getProperties: function() {
    var names = [].slice.call(arguments),
        object = {};

    _.forEach(names, function(name) {
      var value = this.get(name);
      if (value !== undefined) {
        object[name] = value;
      }
    }, this);

    return object;
  },

  getAll: function() {
    var names = _.keys(this._store);
    return this.getProperties.apply(this, names);
  },

  set: function(key, value) {
    var oldValue = this._store[key];

    if (oldValue !== value) {
      this._store[key] = value;
      deferEvents(this, function() {
        this.emit('change:' + key, value, oldValue);
        this.emit('change');
      });
    }
  },

  setProperties: function(properties) {
    deferEvents(this, function() {
      _.forEach(properties, function(value, key) {
        this.set(key, value);
      }, this);
    });
  },

  setAll: function(data) {
    deferEvents(this, function() {
      this._store = merge({}, this._defaults);
      this.setProperties(data);
      // Ensure we emit the change
      this.emit('change');
    });
  },

  forEach: function(callback) {
    return _.forEach(this._store, callback);
  },

  reset: function() {
    this.setAll({});
  }
});

module.exports = ObjectStore;
