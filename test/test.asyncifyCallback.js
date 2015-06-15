import {expect} from './test.common.js';
import {asyncifyCallback} from '../src/jsUtils.js';

describe('asyncifyCallback', () => {
  it('should work with empty args', () => {
    let increment = 0;
    let async = asyncifyCallback(callback => {
      increment += 1;
      callback(null, 2);
    });

    return async().then(result => {
      expect(result).to.be.equal(2);
      expect(increment).to.be.equal(1);
    });
  });

  it('should work with one arg', () => {
    let async = asyncifyCallback((increment, callback) => {
      callback(null, increment * 5);
    });

    let init = 1;
    return async(init).then(result => {
      expect(init).to.be.equal(1);
      expect(result).to.be.equal(5);
    });
  });

  it('should handle error properly', () => {
    let async = asyncifyCallback((increment, callback) => {
      try {
        throw 'error';
      } catch (e) {
        callback(e, null);
      }
    });

    return async(1).then(result => expect(false).to.be.true, error => expect(error).to.be.defined);
  });
});
