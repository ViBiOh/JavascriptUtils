import {expect} from './test.common.js';
import {getRandomInt} from '../src/jsUtils.js';

describe('getRandomInt', function() {
  it('should respect lower bound', function() {
    expect(getRandomInt(0, 100) >= 0).to.be.true;
  });
  it('should respect upper bound', function() {
    expect(getRandomInt(0, 100) <= 100).to.be.true;
  });
});