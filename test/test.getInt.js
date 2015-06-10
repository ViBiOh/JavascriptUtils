import {expect} from './test.common.js';
import {getInt} from '../src/jsUtils.js';

describe('getInt', () => {
  it('should say if udefined is an int', () => {
    expect(getInt(undefined)).to.be.null;
  });

  it('should say if udefined is an int', () => {
    expect(getInt(null)).to.be.null;
  });

  it('should say if empty string is an int', () => {
    expect(getInt('')).to.be.null;
  });

  it('should say if object is an int', () => {
    expect(getInt({})).to.be.null;
  });

  it('should say if defined object is an int', () => {
    expect(getInt({
      value: 0
    })).to.be.null;
  });

  it('should say if array is an int', () => {
    expect(getInt([])).to.be.null;
  });

  it('should say if double is an int', () => {
    expect(getInt(0.1)).to.be.null;
  });

  it('should say if NaN is an int', () => {
    expect(getInt(NaN)).to.be.null;
  });

  it('should say if zero is an int', () => {
    expect(getInt(0)).to.be.equal(0);
  });

  it('should say if number is an int', () => {
    expect(getInt(8000)).to.be.equal(8000);
  });

  it('should say if negative number is an int', () => {
    expect(getInt(-50)).to.be.equal(-50);
  });

  it('should say if pow is an int', () => {
    expect(getInt(1e8)).to.be.equal(1e8);
  });
});
