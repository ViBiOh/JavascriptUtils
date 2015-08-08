import {expect} from './test.common.js';
import {checkArrayOf} from '../src/jsUtils.js';

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

describe('checkArrayOf', () => {
  it('should works with undefined', () => {
    expect(checkArrayOf()).to.be.eql([]);
  });

  it('should throw an error if type is undefined', () => {
    try {
      checkArrayOf(new TestClass());
      expect(false).to.be.true;
    } catch (err) {
      expect(err).to.be.eql(new Error('type is undefined in checkArrayOf'));
    }
  });

  it('should works with unique instance', () => {
    expect(checkArrayOf(new TestClass(), TestClass)).to.be.eql([new TestClass()]);
  });

  it('should works with an empty array', () => {
    expect(checkArrayOf([], TestClass)).to.be.eql([]);
  });

  it('should works with an array of valid instances', () => {
    expect(checkArrayOf([new TestClass(1), new TestClass(2)], TestClass)).to.be.eql([new TestClass(1), new TestClass(2)]);
  });

  it('should reject if array contains invalid instance', () => {
    try {
      checkArrayOf([new TestClass(1), new Test(2)], TestClass);
      expect(false).to.be.true;
    } catch (err) {
      expect(err).to.be.eql(new Error('array contains objects differents than required'));
    }
  });
});