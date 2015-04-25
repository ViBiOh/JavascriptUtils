(function() {
  'use strict';

  var expect = require('chai').expect;

  describe('Dichotomic', function() {
    var Dichotomic = require('../src/dichotomic.js');

    var largeArray = [];
    for (var i = 0; i < 5000; i += 1) {
      largeArray.push(i);
    }

    it('should search in an undefined array', function() {
      var result = Dichotomic.search(undefined, undefined);
      expect(result).to.be.undefined;
    });

    it('should search in an empty array', function() {
      var result = Dichotomic.search(undefined, []);
      expect(result).to.be.undefined;
    });

    it('should not found undefined in a single post array', function() {
      var result = Dichotomic.search(undefined, [1]);
      expect(result).to.be.undefined;
    });

    it('should not found a value in a single post array', function() {
      var result = Dichotomic.search(0, [1]);
      expect(result).to.be.undefined;
    });

    it('should found in a single post array', function() {
      var result = Dichotomic.search(1, [1]);
      expect(result).to.be.equal(1);
    });

    it('should found in bottom bound of a large array', function() {
      var result = Dichotomic.search(0, largeArray);
      expect(result).to.be.equal(0);
    });

    it('should found in up bound of a large array', function() {
      var result = Dichotomic.search(4999, largeArray);
      expect(result).to.be.equal(4999);
    });

    it('should found in one shot of a large array', function() {
      var result = Dichotomic.search(2500, largeArray);
      expect(result).to.be.equal(2500);
    });

    it('should check if an undefined array is sorted', function() {
      expect(Dichotomic.checkSort(undefined)).to.be.undefined;
    });

    it('should check if a single post array is sorted', function() {
      expect(Dichotomic.checkSort([1])).to.be.true;
    });

    it('should check if an array is sorted', function() {
      expect(Dichotomic.checkSort(largeArray)).to.be.true;
    });

    it('should check if an array is not sorted at end', function() {
      expect(Dichotomic.checkSort([1, 2, 3, 5, 4])).to.be.false;
    });

    it('should check if an array is not sorted at begginning', function() {
      expect(Dichotomic.checkSort([2, 1, 3, 4, 5])).to.be.false;
    });

    it('should check if an array is sorted with doublon', function() {
      expect(Dichotomic.checkSort([2, 2, 2, 2, 2, 2, 2, 3])).to.be.true;
    });

    it('should check if an array is sorted with improper function', function() {
      expect(Dichotomic.checkSort([{
        id: 1
      }, {
        id: 2
      }])).to.be.false;
    });

    it('should check if an array is sorted with proper function', function() {
      expect(Dichotomic.checkSort([{
        id: 1
      }, {
        id: 2
      }], function(a, b) {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id === b.id) {
          return 0;
        }
        return 1;
      })).to.be.true;
    });

    it('should not insert in an undefined array', function() {
      expect(Dichotomic.insert()).to.be.undefined;
    });

    it('should insert in an empty array', function() {
      expect(Dichotomic.insert(8000, [], undefined)).to.be.equal(0);
    });

    it('should insert after in a single array', function() {
      expect(Dichotomic.insert(2, [1], undefined)).to.be.equal(1);
    });

    it('should insert before in a single array', function() {
      expect(Dichotomic.insert(0, [1], undefined)).to.be.equal(0);
    });

    it('should insert in an already defined array', function() {
      var arrayInsert = [0, 2, 3, 4, 5, 6, 7, 8, 9];
      expect(Dichotomic.insert(1, arrayInsert, undefined)).to.be.equal(1);
      expect(Dichotomic.checkSort(arrayInsert)).to.be.true;
      expect(arrayInsert.length).to.be.equal(10);
    });

    it('should insert in an already defined array with doublon', function() {
      var arrayInsert = [0, 1, 2, 2, 2, 3, 4, 5, 6, 7, 8, 9];
      var insertIndex = Dichotomic.insert(2, arrayInsert, undefined);
      expect(insertIndex).to.be.above(1);
      expect(insertIndex).to.be.below(5);
      expect(Dichotomic.checkSort(arrayInsert)).to.be.true;
      expect(arrayInsert.length).to.be.equal(13);
    });

    it('should insert at a beginning of an array', function() {
      var arrayInsert = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      expect(Dichotomic.insert(0, arrayInsert, undefined)).to.be.equal(0);
      expect(Dichotomic.checkSort(arrayInsert)).to.be.true;
      expect(arrayInsert.length).to.be.equal(10);
    });

    it('should insert at a ending of an array', function() {
      var arrayInsert = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      expect(Dichotomic.insert(9, arrayInsert, undefined)).to.be.equal(9);
      expect(Dichotomic.checkSort(arrayInsert)).to.be.true;
      expect(arrayInsert.length).to.be.equal(10);
    });
  });
})();
