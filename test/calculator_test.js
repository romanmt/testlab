var assert     = require('assert')
  , calculator = require('../lib/calculator')
  , events     = require('events')
  , sinon      = require('sinon')
  , should     = require('should');

var it = function(statement, callback) {
    exports[statement] = function (done) {
        var sandbox = sinon.sandbox.create();
        sandbox.finish = function() {
            sandbox.restore();
            done();
        }
        callback(sandbox);
    }
};

var obj = {
    asyncCall : function (callback) {
        callback("hello");
    },
    otherCall : function (msg, callback) {
        this.asyncCall(function (othermsg) {
            callback(msg + " " + othermsg);
        });
    }
};

it("should exist", function (test) {
    assert.ok(true);
    test.finish();
});

it("should be able to stub", function (test) {
    test.stub(obj, 'asyncCall').yields("hello");
    obj.asyncCall(function (msg) {
        msg.should.equal("hello");
        test.finish();
    });
});

it("should be able to stub again", function (test) {
    test.stub(obj, 'asyncCall').yields("hellot");
    obj.asyncCall(function (msg) {
        msg.should.equal("hellot");
        test.finish();
    });
});

it("stubs something inside another function", function(test) {
    test.stub(obj, 'asyncCall').yields("food");
    obj.otherCall('whatever', function(msg) {
        msg.should.equal('whatever food');
        test.finish();
    });
});

