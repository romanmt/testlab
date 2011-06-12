var should = require('should');
var sinon = require('sinon');

exports.it = function(exports) {
  return function(statement, callback) {
    exports['test: ' + statement] = function(test, assert) {
      var sandbox = sinon.sandbox.create();

      sandbox.finish = function() {
        sandbox.restore();
        test.finish();
      };

      sandbox.skip = function() {
        sandbox.restore();
        test.skip();
      };

      delete assert.eql;
      Object.keys(assert).forEach(function(prop) {
        sandbox[prop] = assert[prop];
      });

      callback(sandbox);
    };
  };
};


