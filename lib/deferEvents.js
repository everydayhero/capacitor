"use strict";

var _ = require('lodash');

function appendEvent(args, events) {
  var added = _.some(events, function(eventArgs) {
    return _.isEqual(args, eventArgs);
  });

  if (!added) {
    events.push(args);
  }
}

function captureEmit() {
  var args = [].slice.call(arguments);
  appendEvent(args, this.__emittedEvents);
}

module.exports = function(target, callback) {
  var emitMethod = target.emit;
  var isCapturing = emitMethod === captureEmit;
  var events;

  if (!isCapturing) {
    target.emit = captureEmit;
    target.__emittedEvents = [];
  }

  callback.call(target);

  if (!isCapturing) {
    target.emit = emitMethod;

    _.forEach(target.__emittedEvents, function(eventArgs) {
      emitMethod.apply(target, eventArgs);
    });

    delete target.__emittedEvents;
  }

  return target;
};

