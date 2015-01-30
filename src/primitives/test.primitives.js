(function() {
  'use strict';

  describe('Primitives', function() {
    describe('isInt', function() {
      it('should say if udefined is an int', function() {
        expect(Primitives.isInt(undefined)).toBeFalsy();
      });

      it('should say if udefined is an int', function() {
        expect(Primitives.isInt(null)).toBeFalsy();
      });

      it('should say if empty string is an int', function() {
        expect(Primitives.isInt('')).toBeFalsy();
      });

      it('should say if object is an int', function() {
        expect(Primitives.isInt({})).toBeFalsy();
      });

      it('should say if defined object is an int', function() {
        expect(Primitives.isInt({
          value: 0
        })).toBeFalsy();
      });

      it('should say if array is an int', function() {
        expect(Primitives.isInt([])).toBeFalsy();
      });

      it('should say if double is an int', function() {
        expect(Primitives.isInt(0.1)).toBeFalsy();
      });

      it('should say if NaN is an int', function() {
        expect(Primitives.isInt(NaN)).toBeFalsy();
      });

      it('should say if zero is an int', function() {
        expect(Primitives.isInt(0)).toBeTruthy();
      });

      it('should say if number is an int', function() {
        expect(Primitives.isInt(8000)).toBeTruthy();
      });

      it('should say if negative number is an int', function() {
        expect(Primitives.isInt(-50)).toBeTruthy();
      });

      it('should say if pow is an int', function() {
        expect(Primitives.isInt(1e8)).toBeTruthy();
      });
    });

    describe('inspectValue', function() {
      it('should not convert undefined', function() {
        expect(Primitives.inspectValue(undefined)).toBeUndefined();
      });

      it('should not convert null', function() {
        expect(Primitives.inspectValue(null)).toBeUndefined();
      });

      it('should not convert obj', function() {
        expect(Primitives.inspectValue({})).toEqual({});
      });

      it('should not convert array', function() {
        expect(Primitives.inspectValue([])).toEqual([]);
      });

      it('should not convert NaN', function() {
        expect(isNaN(Primitives.inspectValue(NaN))).toBeTruthy();
      });

      it('should convert empty string to true', function() {
        expect(Primitives.inspectValue('')).toEqual(true);
      });

      it('should convert true to true', function() {
        expect(Primitives.inspectValue('true')).toEqual(true);
      });

      it('should convert false to false', function() {
        expect(Primitives.inspectValue('false')).toEqual(false);
      });

      it('should convert zero to number', function() {
        expect(Primitives.inspectValue(0)).toEqual(0);
      });

      it('should convert negative number to number', function() {
        expect(Primitives.inspectValue(-10)).toEqual(-10);
      });

      it('should convert positive number to number', function() {
        expect(Primitives.inspectValue(10)).toEqual(10);
      });

      it('should convert string to number', function() {
        expect(Primitives.inspectValue('0')).toEqual(0);
      });

      it('should convert negative string to number', function() {
        expect(Primitives.inspectValue('-10')).toEqual(-10);
      });

      it('should convert positive string to number', function() {
        expect(Primitives.inspectValue('10')).toEqual(10);
      });

      it('should convert zero to float', function() {
        expect(Primitives.inspectValue(0.0)).toEqual(0.0);
      });

      it('should convert negative float to float', function() {
        expect(Primitives.inspectValue(-10.05)).toEqual(-10.05);
      });

      it('should convert positive float to float', function() {
        expect(Primitives.inspectValue(10.1)).toEqual(10.1);
      });

      it('should convert string to float', function() {
        expect(Primitives.inspectValue('0.000001')).toEqual(0.000001);
      });

      it('should convert negative float to float', function() {
        expect(Primitives.inspectValue('-10.10')).toEqual(-10.10);
      });

      it('should convert positive float to float', function() {
        expect(Primitives.inspectValue('10.2')).toEqual(10.2);
      });

      it('should convert positive float without unit to float', function() {
        expect(Primitives.inspectValue('.2')).toEqual(0.2);
      });
    });

    describe('isArray', function() {
      var arrayTests = function() {
        it('should say undefined is not an array', function() {
          expect(Primitives.isArray(undefined)).toBeFalsy();
        });

        it('should say null is not an array', function() {
          expect(Primitives.isArray(null)).toBeFalsy();
        });

        it('should say empty string is not an array', function() {
          expect(Primitives.isArray('')).toBeFalsy();
        });

        it('should say string is not an array', function() {
          expect(Primitives.isArray('test')).toBeFalsy();
        });

        it('should say NaN is not an array', function() {
          expect(Primitives.isArray(NaN)).toBeFalsy();
        });

        it('should say number is not an array', function() {
          expect(Primitives.isArray(8000)).toBeFalsy();
        });

        it('should say float is not an array', function() {
          expect(Primitives.isArray(8000.1234)).toBeFalsy();
        });

        it('should say object is not an array', function() {
          expect(Primitives.isArray({})).toBeFalsy();
        });

        it('should say primitives array is an array', function() {
          expect(Primitives.isArray([])).toBeTruthy();
        });

        it('should say true is not an array', function() {
          expect(Primitives.isArray(true)).toBeFalsy();
        });

        it('should say false is not an array', function() {
          expect(Primitives.isArray(false)).toBeFalsy();
        });
      };

      describe('polyfill', function() {
        beforeEach(function() {
          Array.isArray = undefined;
        });

        describe('should behave same as native', arrayTests);
      });

      describe('native', arrayTests);
    });

    describe('hasValue', function() {
      it('should say undefined has no value', function() {
        expect(Primitives.hasValue(undefined)).toBeFalsy();
      });

      it('should say null has no value', function() {
        expect(Primitives.hasValue(null)).toBeFalsy();
      });

      it('should say empty string has no value', function() {
        expect(Primitives.hasValue('')).toBeFalsy();
      });

      it('should say string has value', function() {
        expect(Primitives.hasValue('test')).toBeTruthy();
      });

      it('should say zero has value', function() {
        expect(Primitives.hasValue(0)).toBeTruthy();
      });

      it('should say NaN has value', function() {
        expect(Primitives.hasValue(NaN)).toBeTruthy();
      });

      it('should say empty obj has value', function() {
        expect(Primitives.hasValue({})).toBeTruthy();
      });

      it('should say empty array has value', function() {
        expect(Primitives.hasValue([])).toBeTruthy();
      });

      it('should say true has value', function() {
        expect(Primitives.hasValue(true)).toBeTruthy();
      });

      it('should say false has value', function() {
        expect(Primitives.hasValue(false)).toBeTruthy();
      });
    });

    describe('isAssociativeArray', function() {
      it('should say undefined is not an aa', function() {
        expect(Primitives.isAssociativeArray(undefined)).toBeFalsy();
      });

      it('should say null is not an aa', function() {
        expect(Primitives.isAssociativeArray(null)).toBeFalsy();
      });

      it('should say empty string is not an aa', function() {
        expect(Primitives.isAssociativeArray('')).toBeFalsy();
      });

      it('should say string is not an aa', function() {
        expect(Primitives.isAssociativeArray('test')).toBeFalsy();
      });

      it('should say zero is not an aa', function() {
        expect(Primitives.isAssociativeArray(0)).toBeFalsy();
      });

      it('should say number is not an aa', function() {
        expect(Primitives.isAssociativeArray(8000)).toBeFalsy();
      });

      it('should say NaN is not an aa', function() {
        expect(Primitives.isAssociativeArray(NaN)).toBeFalsy();
      });

      it('should say empty obj is an aa', function() {
        expect(Primitives.isAssociativeArray({})).toBeTruthy();
      });

      it('should say empty array is not an aa', function() {
        expect(Primitives.isAssociativeArray([])).toBeFalsy();
      });
    });

    describe('extend', function() {
      it('should throw exception when undefined params', function() {
        var failed = false;
        try {
          Primitives.extend(undefined, undefined);
        } catch (err) {
          failed = true;
        }
        expect(failed).toBeTruthy();
      });

      it('should throw exception when first undefined param', function() {
        var failed = false;
        try {
          Primitives.extend({}, null);
        } catch (err) {
          failed = true;
        }
        expect(failed).toBeTruthy();
      });

      it('should throw exception when second undefined param', function() {
        var failed = false;
        try {
          Primitives.extend(true, {});
        } catch (err) {
          failed = true;
        }
        expect(failed).toBeTruthy();
      });

      it('should extend two empty object', function() {
        expect(Primitives.extend({}, {})).toEqual({});
      });

      it('should extend two simple objects', function() {
        expect(Primitives.extend({
          id: 1, name: 'Test'
        }, {
          id: 2, mail: 'test@localhost'
        })).toEqual({
          id: 2, name: 'Test', mail: 'test@localhost'
        });
      });

      it('should extend two objects with one sub-objects', function() {
        expect(Primitives.extend({
          id: 1, name: 'Test'
        }, {
          id: 2, contact: {
            mail: 'test@localhost'
          }
        })).toEqual({
          id: 2, name: 'Test', contact: {
            mail: 'test@localhost'
          }
        });
      });

      it('should extend two objects with undefined force', function() {
        expect(Primitives.extend({
          id: 1, name: 'Test', contact: {
            mail: 'test@localhost'
          }
        }, {
          id: 2, contact: undefined
        })).toEqual({
          id: 2, name: 'Test', contact: undefined
        });
      });

      it('should extend two objects with sub-objects', function() {
        expect(Primitives.extend({
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
        }).toString()).toEqual({
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

        expect(Primitives.extend({}, new RawObject())).toEqual({
          id: 8000
        });
      });
    });

    describe('getRandomInt', function() {
      it('should respect lower bound', function() {
        expect(Primitives.getRandomInt(0, 100) >= 0).toBeTruthy();
      });
      it('should respect upper bound', function() {
        expect(Primitives.getRandomInt(0, 100) <= 100).toBeTruthy();
      });
    });

    describe('arrayRm', function() {
      it('should deal with undefined array', function() {
        var array = undefined;
        Primitives.arrayRm(array, undefined);

        expect(array).toBeUndefined();
      });
      it('should deal with null array', function() {
        var array = null;
        Primitives.arrayRm(array, undefined);

        expect(array).toBeNull();
      });
      it('should not remove content undefined', function() {
        var array = [1];
        Primitives.arrayRm(array, undefined);

        expect(array).toEqual([1]);
      });
      it('should not remove content not present', function() {
        var array = [1];
        Primitives.arrayRm(array, 0);

        expect(array).toEqual([1]);
      });
      it('should remove content of one row', function() {
        var array = [1];
        Primitives.arrayRm(array, 1);

        expect(array).toEqual([]);
      });
      it('should remove object content', function() {
        var variable = {
          id: 4
        };
        var array = [variable];
        Primitives.arrayRm(array, variable);

        expect(array).toEqual([]);
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

        expect(array[5].id).toEqual(5);

        Primitives.arrayRm(array, array[5]);

        expect(array.length).toEqual(9);
        expect(array[5].id).toEqual(6);
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

        Primitives.arrayRm(array, {
            id: 5,
            name: 'John Doe Number ' + 5,
            contact: [1, 2, 3, 4],
            address: {
              city: 'Paris',
              country: 'France'
            }
          });

        expect(array.length).toEqual(10);
      });
    });
  });
})();
