import {expect} from './test.common.js';
import {getArrayOf} from '../src/jsUtils.js';

class TestClass {
  constructor(i) {
    this.count = i;
  }
}

class Test {
  constructor(i) {
    this.count = i;
  }
}

describe('getArrayOf', () => {
  it('should works with undefined', () => {
    expect(getArrayOf()).to.be.eql([]);
  });

  it('should throw an error if type is undefined', () => {
    try {
      getArrayOf(new TestClass());
      expect(false).to.be.true;
    } catch (err) {
      expect(err).to.be.eql(new Error('type is undefined in getArrayOf'));
    }
  });

  it('should works with unique instance', () => {
    expect(getArrayOf(new TestClass(), TestClass)).to.be.eql([new TestClass()]);
  });

  it('should works with an empty array', () => {
    expect(getArrayOf([], TestClass)).to.be.eql([]);
  });

  it('should works with an array of valid instances', () => {
    expect(getArrayOf([new TestClass(1), new TestClass(2)], TestClass)).to.be.eql([new TestClass(1), new TestClass(2)]);
  });

  it('should reject if array contains invalid instance', () => {
    try {
      getArrayOf([new TestClass(1), new Test(2)], TestClass);
      expect(false).to.be.true;
    } catch (err) {
      expect(err).to.be.eql(new Error('array contains objects differents than required'));
    }
  });
});