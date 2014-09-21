var EventEmitter = require('events').EventEmitter;
var util = require('util');

function StuffEmitter() {
  if (!(this instanceof StuffEmitter)) {
    return new StuffEmitter();
  }

  EventEmitter.call(this);

  var self = this;
  setTimeout(function onTimeout() {
    var result = 'event result';
    self.emit('stuff', result);
  }, 1000);
}

util.inherits(StuffEmitter, EventEmitter);

var s = new StuffEmitter();
var start = Date.now();

s.on('stuff', function onEvent(result) {
  console.log('received:', result, Date.now() - start);
});
