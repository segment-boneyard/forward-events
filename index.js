/**
 * Module dependencies.
 */

var assert = require('assert');

module.exports = function(src, dst){
  assert(src.emit, 'src must be an emitter');
  assert(dst.emit, 'dst must be an emitter');

  var emit = src.emit;
  src.emit = function(type){
    if ('error' != type) emit.apply(src, arguments);
    return dst.emit.apply(dst, arguments);
  };
};
