import {expect} from './test.common.js';
import {isAssociativeArray} from '../src/jsUtils.js';

describe('isAssociativeArray', () => {
  it('should say undefined is not an aa', () => {
    expect(isAssociativeArray(undefined)).to.be.false;
  });

  it('should say null is not an aa', () => {
    expect(isAssociativeArray(null)).to.be.false;
  });

  it('should say empty string is not an aa', () => {
    expect(isAssociativeArray('')).to.be.false;
  });

  it('should say string is not an aa', () => {
    expect(isAssociativeArray('test')).to.be.false;
  });

  it('should say zero is not an aa', () => {
    expect(isAssociativeArray(0)).to.be.false;
  });

  it('should say number is not an aa', () => {
    expect(isAssociativeArray(8000)).to.be.false;
  });

  it('should say NaN is not an aa', () => {
    expect(isAssociativeArray(NaN)).to.be.false;
  });

  it('should say empty obj is an aa', () => {
    expect(isAssociativeArray({})).to.be.true;
  });

  it('should say empty array is not an aa', () => {
    expect(isAssociativeArray([])).to.be.false;
  });
});
