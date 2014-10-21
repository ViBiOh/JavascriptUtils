(function() {
  'use strict';

  describe('Dichotomic', function() {
    var largeArray = [];
    for (var i = 0; i < 5000; i += 1) {
      largeArray.push(i);
    }

    it('should search in an undefined array', function() {
      var result = Dichotomic.search(undefined, undefined);
      expect(result).toBeUndefined();
    });

    it('should search in an empty array', function() {
      var result = Dichotomic.search(undefined, []);
      expect(result).toBeUndefined();
    });

    it('should not found undefined in a single post array', function() {
      var result = Dichotomic.search(undefined, [1]);
      expect(result).toBeUndefined();
    });

    it('should not found a value in a single post array', function() {
      var result = Dichotomic.search(0, [1]);
      expect(result).toBeUndefined();
    });

    it('should found in a single post array', function() {
      var result = Dichotomic.search(1, [1]);
      expect(result).toEqual(1);
    });

    it('should found in bottom bound of a large array', function() {
      var result = Dichotomic.search(0, largeArray);
      expect(result).toEqual(0);
    });

    it('should found in up bound of a large array', function() {
      var result = Dichotomic.search(4999, largeArray);
      expect(result).toEqual(4999);
    });

    it('should found in one shot of a large array', function() {
      var result = Dichotomic.search(2499, largeArray);
      expect(result).toEqual(2499);
    });

    it('should check if an undefined array is sorted', function() {
      expect(Dichotomic.checkSort(undefined)).toBeUndefined();
    });

    it('should check if a single post array is sorted', function() {
      expect(Dichotomic.checkSort([1])).toBeTruthy();
    });

    it('should check if an array is sorted', function() {
      expect(Dichotomic.checkSort(largeArray)).toBeTruthy();
    });

    it('should check if an array is not sorted at end', function() {
      expect(Dichotomic.checkSort([1, 2, 3, 5, 4])).toBeFalsy();
    });

    it('should check if an array is not sorted at begginning', function() {
      expect(Dichotomic.checkSort([2, 1, 3, 4, 5])).toBeFalsy();
    });

    it('should check if an array is sorted with doublon', function() {
      expect(Dichotomic.checkSort([2, 2, 2, 2, 2, 2, 2, 3])).toBeTruthy();
    });

    it('should check if an array is sorted with improper function', function() {
      expect(Dichotomic.checkSort([{id: 1}, {id: 2}])).toBeFalsy();
    });

    it('should check if an array is sorted with proper function', function() {
      expect(Dichotomic.checkSort([{id: 1}, {id: 2}], function(a, b) {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id === b.id) {
          return 0;
        }
        return 1;
      })).toBeTruthy();
    });

    it ('should not insert in an undefined array', function() {
      expect(Dichotomic.insert()).toBeUndefined();
    });

    it ('should insert in an empty array', function() {
      expect(Dichotomic.insert(8000, [], undefined)).toEqual(0);
    });

    it ('should insert in an already defined array', function() {
      var arrayInsert = [0, 2, 3, 4, 5, 6, 7, 8, 9];
      expect(Dichotomic.insert(1, arrayInsert, undefined)).toEqual(1);
      expect(Dichotomic.checkSort(arrayInsert)).toBeTruthy();
      expect(arrayInsert.length).toEqual(10);
    });

    it ('should insert in an already defined array with doublon', function() {
      var arrayInsert = [0, 1, 2, 2, 2, 3, 4, 5, 6, 7, 8, 9];
      var insertIndex = Dichotomic.insert(2, arrayInsert, undefined);
      expect(insertIndex).toBeGreaterThan(1);
      expect(insertIndex).toBeLessThan(5);
      expect(Dichotomic.checkSort(arrayInsert)).toBeTruthy();
      expect(arrayInsert.length).toEqual(13);
    });

    it ('should insert at a beginning of an array', function() {
      var arrayInsert = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      expect(Dichotomic.insert(0, arrayInsert, undefined)).toEqual(0);
      expect(Dichotomic.checkSort(arrayInsert)).toBeTruthy();
      expect(arrayInsert.length).toEqual(10);
    });

    it ('should insert at a ending of an array', function() {
      var arrayInsert = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      expect(Dichotomic.insert(9, arrayInsert, undefined)).toEqual(10);
      expect(Dichotomic.checkSort(arrayInsert)).toBeTruthy();
      expect(arrayInsert.length).toEqual(10);
    });
  });
})();
