import {expect} from './test.common.js';
import {asyncify} from '../src/jsUtils.js';

describe('asyncify', () => {
  it('should work with empty args', () => {
    let increment = 0;
    const async = asyncify(() => {
      increment += 1;
      return 2;
    });

    return async().then(result => {
      expect(result).to.be.equal(2);
      expect(increment).to.be.equal(1);
    });
  });

  it('should work with one arg', () => {
    const async = asyncify(increment => {
      return increment * 5;
    });

    const init = 1;
    return async(init).then(result => {
      expect(init).to.be.equal(1);
      expect(result).to.be.equal(5);
    });
  });

  it('should handle error properly', () => {
    const async = asyncify(() => {
      throw 'error';
    });

    return async(1).then(result => expect(false).to.be.true, error => expect(error).to.be.defined);
  });
});
