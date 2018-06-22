const { EventEmitter } = require('events');
const test = require('assert');
const mongo = require('./mongo');
const { dbSettings } = require('./config');

describe('Mongo Connection', () => {
  it('should emit db Object with an EventEmitter', done => {
    const mediator = new EventEmitter();

    mediator.on('db.ready', (db, cb) => {
      db.collections((err, cs) => {
        test.equal(null, err);
        // test.ok(cs.length > 0);
        console.log(cs);
        cb();
        done();
      });
    });

    mediator.on('db.error', err => {
      console.log(err);
    });

    mongo.connect(
      dbSettings,
      mediator
    );

    mediator.emit('boot.ready');
  });
});
