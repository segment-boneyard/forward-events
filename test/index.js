
var Emitter = require('events').EventEmitter;
var forward = require('..');

describe('forward(src, dst)', function(){
  it('should forward events', function(done){
    var a = new Emitter;
    var b = new Emitter;
    forward(a, b);

    var calls = [];

    b.on('foo', function(a, b){
      calls.push(['foo', a, b]);
    });

    b.on('bar', function(a, b){
      calls.push(['bar', a, b]);
      calls.should.eql([ [ 'foo', 1, 2 ], [ 'bar', 3, 4 ] ]);
      done();
    });

    a.emit('foo', 1, 2);
    a.emit('bar', 3, 4);
  })

  it('should retain emitting on src', function(done){
    var a = new Emitter;
    var b = new Emitter;
    forward(a, b);

    a.on('foo', done);
    a.emit('foo');
  })

  it('should forward errors', function(done){
    var a = new Emitter;
    var b = new Emitter;
    forward(a, b);

    b.on('error', function(err){
      err.message.should.equal('boom');
      done();
    });

    a.emit('error', new Error('boom'));
  })
})