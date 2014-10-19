(function() {
  'use strict';

  describe('Primitives', function() {
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
        expect(Primitives.isInt({value: 0})).toBeFalsy();
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
})();