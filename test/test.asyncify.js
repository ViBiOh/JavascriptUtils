import {expect} from './test.common.js';
import {asyncify} from '../src/jsUtils.js';

describe('asyncify', () => {
  it('should work with empty args', () => {
    let increment = 0;
    let async = asyncify(() => {
      increment += 1;
      return 2;
    });

    return async().then(result => {
      expect(result).to.be.equal(2);
      expect(increment).to.be.equal(1);
    });
  });

  it('should work with one arg', () => {
    let async = asyncify(increment => {
      return increment * 5;
    });

    let init = 1;
    return async(init).then(result => {
      expect(init).to.be.equal(1);
      expect(result).to.be.equal(5);
    });
  });

  it('should handle error properly', () => {
    let async = asyncify(increment => {
      throw 'error';
    });

    return async(1).then(result => expect(false).to.be.true, error => expect(error).to.be.defined);
  });
});
