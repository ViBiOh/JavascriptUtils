import {expect} from './test.common.js';
import {hasValue} from '../src/jsUtils.js';

describe('hasValue', () => {
  it('should say undefined has no value', () => {
    expect(hasValue(undefined)).to.be.false;
  });

  it('should say null has no value', () => {
    expect(hasValue(null)).to.be.false;
  });

  it('should say empty string has no value', () => {
    expect(hasValue('')).to.be.false;
  });

  it('should say string has value', () => {
    expect(hasValue('test')).to.be.true;
  });

  it('should say zero has value', () => {
    expect(hasValue(0)).to.be.true;
  });

  it('should say NaN has value', () => {
    expect(hasValue(NaN)).to.be.true;
  });

  it('should say empty obj has value', () => {
    expect(hasValue({})).to.be.true;
  });

  it('should say empty array has value', () => {
    expect(hasValue([])).to.be.true;
  });

  it('should say true has value', () => {
    expect(hasValue(true)).to.be.true;
  });

  it('should say false has value', () => {
    expect(hasValue(false)).to.be.true;
  });
});
