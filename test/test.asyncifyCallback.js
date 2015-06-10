import {expect} from './test.common.js';
import {asyncifyCallback} from '../src/jsUtils.js';

describe('asyncifyCallback', () => {
  it('should work with empty args', () => {
    var increment = 0;
    var async = asyncifyCallback(function(callback) {
      increment += 1;
      callback(null, 2);
    });

    return async().then(function(result) {
      expect(result).to.be.equal(2);
      expect(increment).to.be.equal(1);
    });
  });

  it('should work with one arg', () => {
    var async = asyncifyCallback(function(increment, callback) {
      callback(null, increment * 5);
    });

    var init = 1;
    return async(init).then(function(result) {
      expect(init).to.be.equal(1);
      expect(result).to.be.equal(5);
    });
  });

  it('should handle error properly', () => {
    var async = asyncifyCallback(function(increment, callback) {
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