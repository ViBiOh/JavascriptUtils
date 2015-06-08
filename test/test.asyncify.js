import {expect} from './test.common.js';
import {asyncify} from '../src/jsUtils.js';

describe('asyncify', function() {
  it('should work with empty args', function() {
    var increment = 0;
    var async = asyncify(function() {
      increment += 1;
      return 2;
    });

    return async().then(function(result) {
      expect(result).to.be.equal(2);
      expect(increment).to.be.equal(1);
    });
  });

  it('should work with one arg', function() {
    var async = asyncify(function(increment) {
      return increment * 5;
    });

    var init = 1;
    return async(init).then(function(result) {
      expect(init).to.be.equal(1);
      expect(result).to.be.equal(5);
    });
  });

  it('should handle error properly', function() {
    var async = asyncify(function(increment) {
      throw 'error';
    });

    return async(1).then(function(result) {
      expect(false).to.be.true;
    }, function(error) {
      expect(error).to.be.defined;
    });
  });
});