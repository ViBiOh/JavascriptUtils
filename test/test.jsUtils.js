(function() {
  'use strict';

  var chai = require('chai');
  var chaiAsPromised = require('chai-as-promised');
  chai.use(chaiAsPromised);

  var expect = chai.expect;

  describe('jsUtils', function() {
    var jsUtils = require('../src/jsUtils.js');

    describe('getInt', function() {
      it('should say if udefined is an int', function() {
        expect(jsUtils.getInt(undefined)).to.be.null;
      });

      it('should say if udefined is an int', function() {
        expect(jsUtils.getInt(null)).to.be.null;
      });

      it('should say if empty string is an int', function() {
        expect(jsUtils.getInt('')).to.be.null;
      });

      it('should say if object is an int', function() {
        expect(jsUtils.getInt({})).to.be.null;
      });

      it('should say if defined object is an int', function() {
        expect(jsUtils.getInt({
          value: 0
        })).to.be.null;
      });

      it('should say if array is an int', function() {
        expect(jsUtils.getInt([])).to.be.null;
      });

      it('should say if double is an int', function() {
        expect(jsUtils.getInt(0.1)).to.be.null;
      });

      it('should say if NaN is an int', function() {
        expect(jsUtils.getInt(NaN)).to.be.null;
      });

      it('should say if zero is an int', function() {
        expect(jsUtils.getInt(0)).to.be.equal(0);
      });

      it('should say if number is an int', function() {
        expect(jsUtils.getInt(8000)).to.be.equal(8000);
      });

      it('should say if negative number is an int', function() {
        expect(jsUtils.getInt(-50)).to.be.equal(-50);
      });

      it('should say if pow is an int', function() {
        expect(jsUtils.getInt(1e8)).to.be.equal(1e8);
      });
    });

    describe('inspectValue', function() {
      it('should not convert undefined', function() {
        expect(jsUtils.inspectValue(undefined)).to.be.undefined;
      });

      it('should not convert null', function() {
        expect(jsUtils.inspectValue(null)).to.be.undefined;
      });

      it('should not convert obj', function() {
        expect(jsUtils.inspectValue({})).to.be.eql({});
      });

      it('should not convert array', function() {
        expect(jsUtils.inspectValue([])).to.be.eql([]);
      });

      it('should not convert NaN', function() {
        expect(isNaN(jsUtils.inspectValue(NaN))).to.be.true;
      });

      it('should convert empty string to true', function() {
        expect(jsUtils.inspectValue('')).to.be.equal(true);
      });

      it('should convert true to true', function() {
        expect(jsUtils.inspectValue('true')).to.be.equal(true);
      });

      it('should convert false to false', function() {
        expect(jsUtils.inspectValue('false')).to.be.equal(false);
      });

      it('should convert zero to number', function() {
        expect(jsUtils.inspectValue(0)).to.be.equal(0);
      });

      it('should convert negative number to number', function() {
        expect(jsUtils.inspectValue(-10)).to.be.equal(-10);
      });

      it('should convert positive number to number', function() {
        expect(jsUtils.inspectValue(10)).to.be.equal(10);
      });

      it('should convert string to number', function() {
        expect(jsUtils.inspectValue('0')).to.be.equal(0);
      });

      it('should convert negative string to number', function() {
        expect(jsUtils.inspectValue('-10')).to.be.equal(-10);
      });

      it('should convert positive string to number', function() {
        expect(jsUtils.inspectValue('10')).to.be.equal(10);
      });

      it('should convert zero to float', function() {
        expect(jsUtils.inspectValue(0.0)).to.be.equal(0.0);
      });

      it('should convert negative float to float', function() {
        expect(jsUtils.inspectValue(-10.05)).to.be.equal(-10.05);
      });

      it('should convert positive float to float', function() {
        expect(jsUtils.inspectValue(10.1)).to.be.equal(10.1);
      });

      it('should convert string to float', function() {
        expect(jsUtils.inspectValue('0.000001')).to.be.equal(0.000001);
      });

      it('should convert positive float to float', function() {
        expect(jsUtils.inspectValue('+10.10')).to.be.equal(10.10);
      });

      it('should convert negative float to float', function() {
        expect(jsUtils.inspectValue('-10.10')).to.be.equal(-10.10);
      });

      it('should convert positive float to float', function() {
        expect(jsUtils.inspectValue('10.2')).to.be.equal(10.2);
      });

      it('should convert positive float without unit to float', function() {
        expect(jsUtils.inspectValue('.2')).to.be.equal(0.2);
      });
    });

    describe('hasValue', function() {
      it('should say undefined has no value', function() {
        expect(jsUtils.hasValue(undefined)).to.be.false;
      });

      it('should say null has no value', function() {
        expect(jsUtils.hasValue(null)).to.be.false;
      });

      it('should say empty string has no value', function() {
        expect(jsUtils.hasValue('')).to.be.false;
      });

      it('should say string has value', function() {
        expect(jsUtils.hasValue('test')).to.be.true;
      });

      it('should say zero has value', function() {
        expect(jsUtils.hasValue(0)).to.be.true;
      });

      it('should say NaN has value', function() {
        expect(jsUtils.hasValue(NaN)).to.be.true;
      });

      it('should say empty obj has value', function() {
        expect(jsUtils.hasValue({})).to.be.true;
      });

      it('should say empty array has value', function() {
        expect(jsUtils.hasValue([])).to.be.true;
      });

      it('should say true has value', function() {
        expect(jsUtils.hasValue(true)).to.be.true;
      });

      it('should say false has value', function() {
        expect(jsUtils.hasValue(false)).to.be.true;
      });
    });

    describe('isAssociativeArray', function() {
      it('should say undefined is not an aa', function() {
        expect(jsUtils.isAssociativeArray(undefined)).to.be.false;
      });

      it('should say null is not an aa', function() {
        expect(jsUtils.isAssociativeArray(null)).to.be.false;
      });

      it('should say empty string is not an aa', function() {
        expect(jsUtils.isAssociativeArray('')).to.be.false;
      });

      it('should say string is not an aa', function() {
        expect(jsUtils.isAssociativeArray('test')).to.be.false;
      });

      it('should say zero is not an aa', function() {
        expect(jsUtils.isAssociativeArray(0)).to.be.false;
      });

      it('should say number is not an aa', function() {
        expect(jsUtils.isAssociativeArray(8000)).to.be.false;
      });

      it('should say NaN is not an aa', function() {
        expect(jsUtils.isAssociativeArray(NaN)).to.be.false;
      });

      it('should say empty obj is an aa', function() {
        expect(jsUtils.isAssociativeArray({})).to.be.true;
      });

      it('should say empty array is not an aa', function() {
        expect(jsUtils.isAssociativeArray([])).to.be.false;
      });
    });

    describe('extend', function() {
      it('should throw exception when undefined params', function() {
        var failed = false;
        try {
          jsUtils.extend(undefined, undefined);
        } catch (err) {
          failed = true;
        }
        expect(failed).to.be.true;
      });

      it('should throw exception when first undefined param', function() {
        var failed = false;
        try {
          jsUtils.extend({}, null);
        } catch (err) {
          failed = true;
        }
        expect(failed).to.be.true;
      });

      it('should throw exception when second undefined param', function() {
        var failed = false;
        try {
          jsUtils.extend(true, {});
        } catch (err) {
          failed = true;
        }
        expect(failed).to.be.true;
      });

      it('should extend two empty object', function() {
        expect(jsUtils.extend({}, {})).to.be.eql({});
      });

      it('should extend two simple objects', function() {
        expect(jsUtils.extend({
          id: 1, name: 'Test'
        }, {
          id: 2, mail: 'test@localhost'
        })).to.be.eql({
          id: 2, name: 'Test', mail: 'test@localhost'
        });
      });

      it('should extend two objects with one sub-objects', function() {
        expect(jsUtils.extend({
          id: 1, name: 'Test'
        }, {
          id: 2, contact: {
            mail: 'test@localhost'
          }
        })).to.be.eql({
          id: 2, name: 'Test', contact: {
            mail: 'test@localhost'
          }
        });
      });

      it('should extend two objects with undefined force', function() {
        expect(jsUtils.extend({
          id: 1, name: 'Test', contact: {
            mail: 'test@localhost'
          }
        }, {
          id: 2, contact: undefined
        })).to.be.eql({
          id: 2, name: 'Test', contact: undefined
        });
      });

      it('should extend two objects with sub-objects', function() {
        expect(jsUtils.extend({
          id: 1,
          name: 'Test',
          contact: {
            mail: 'test@localhost'
          }
        }, {
          id: 2,
          contact: {
            event: function() {
              'test';
            }
          }
        }).toString()).to.be.eql({
          id: 2,
          name: 'Test',
          contact: {
            mail: 'test@localhost',
            event: function() {
              'test';
            }
          }
        }.toString());
      });

      it('should ignore prototype property', function() {
        var RawObject = function() {
          this.id = 8000;
        };

        RawObject.prototype.toString = function() {
          return 'test string';
        };

        expect(jsUtils.extend({}, new RawObject())).to.be.eql({
          id: 8000
        });
      });
    });

    describe('getRandomInt', function() {
      it('should respect lower bound', function() {
        expect(jsUtils.getRandomInt(0, 100) >= 0).to.be.true;
      });
      it('should respect upper bound', function() {
        expect(jsUtils.getRandomInt(0, 100) <= 100).to.be.true;
      });
    });

    describe('arrayRm', function() {
      it('should deal with undefined array', function() {
        var array;
        jsUtils.arrayRm(array, undefined);

        expect(array).to.be.undefined;
      });
      it('should deal with null array', function() {
        var array = null;
        jsUtils.arrayRm(array, undefined);

        expect(array).to.be.null;
      });
      it('should not remove content undefined', function() {
        var array = [1];
        jsUtils.arrayRm(array, undefined);

        expect(array).to.be.eql([1]);
      });
      it('should not remove content not present', function() {
        var array = [1];
        jsUtils.arrayRm(array, 0);

        expect(array).to.be.eql([1]);
      });
      it('should remove content of one row', function() {
        var array = [1];
        jsUtils.arrayRm(array, 1);

        expect(array).to.be.eql([]);
      });
      it('should remove object content', function() {
        var variable = {
          id: 4
        };
        var array = [variable];
        jsUtils.arrayRm(array, variable);

        expect(array).to.be.eql([]);
      });
      it('should remove object content on multiple row', function() {
        var array = [];
        for (var i = 0; i < 10; i += 1) {
          array.push({
            id: i,
            name: 'John Doe Number ' + i,
            contact: [1, 2, 3, 4],
            address: {
              city: 'Paris',
              country: 'France'
            }
          });
        }

        expect(array[5].id).to.be.equal(5);

        jsUtils.arrayRm(array, array[5]);

        expect(array.length).to.be.equal(9);
        expect(array[5].id).to.be.equal(6);
      });
      it('should not remove similar object', function() {
        var array = [];
        for (var i = 0; i < 10; i += 1) {
          array.push({
            id: i,
            name: 'John Doe Number ' + i,
            contact: [1, 2, 3, 4],
            address: {
              city: 'Paris',
              country: 'France'
            }
          });
        }

        jsUtils.arrayRm(array, {
            id: 5,
            name: 'John Doe Number ' + 5,
            contact: [1, 2, 3, 4],
            address: {
              city: 'Paris',
              country: 'France'
            }
          });

        expect(array.length).to.be.equal(10);
      });
    });

    describe('asyncify', function() {
      it('should work with empty args', function() {
        var increment = 0;
        var async = jsUtils.asyncify(function() {
          increment += 1;
          return 2;
        });

        return async().then(function(result) {
          expect(result).to.be.equal(2);
          expect(increment).to.be.equal(1);
        });
      });

      it('should work with one arg', function() {
        var async = jsUtils.asyncify(function(increment) {
          return increment * 5;
        });

        var init = 1;
        return async(init).then(function(result) {
          expect(init).to.be.equal(1);
          expect(result).to.be.equal(5);
        });
      });

      it('should handle error properly', function() {
        var async = jsUtils.asyncify(function(increment) {
          throw 'error';
        });

        return async(1).then(function(result) {
          expect(false).to.be.true;
        }, function(error) {
          expect(error).to.be.defined;
        });
      });
    });

    describe('asyncifyCallback', function() {
      it('should work with empty args', function() {
        var increment = 0;
        var async = jsUtils.asyncifyCallback(function(callback) {
          increment += 1;
          callback(null, 2);
        });

        return async().then(function(result) {
          expect(result).to.be.equal(2);
          expect(increment).to.be.equal(1);
        });
      });

      it('should work with one arg', function() {
        var async = jsUtils.asyncifyCallback(function(increment, callback) {
          callback(null, increment * 5);
        });

        var init = 1;
        return async(init).then(function(result) {
          expect(init).to.be.equal(1);
          expect(result).to.be.equal(5);
        });
      });

      it('should handle error properly', function() {
        var async = jsUtils.asyncifyCallback(function(increment, callback) {
          try {
            throw 'error';
          } catch (e) {
            callback(e, null);
          }
        });

        return async(1).then(function(result) {
          expect(false).to.be.true;
        }, function(error) {
          expect(error).to.be.defined;
        });
      });
    });

    describe('stringify', function() {
      it('should stringify a basic object', function() {
        var result = jsUtils.stringify({
          id: 8000,
          name: 'Bob'
        });

        expect(result).to.be.eql('{"id":8000,"name":"Bob"}');
      });

      it('should stringify with given space', function() {
        var result = jsUtils.stringify({
          id: 8000,
          name: 'Bob'
        }, '  ');

        expect(result).to.be.eql('{\n  "id": 8000,\n  "name": "Bob"\n}');
      });

      it('should stringify with circular reference', function() {
        var circularObject = {
          id: 8000
        };
        circularObject.child = circularObject;
        var result = jsUtils.stringify(circularObject);

        expect(result).to.be.eql('{"id":8000,"child":"[Circular]"}');
      });
    });
  });
})();
