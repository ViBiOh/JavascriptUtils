import {expect} from './test.common.js';
import {hasValue} from '../src/jsUtils.js';

describe('hasValue', function() {
  it('should say undefined has no value', function() {
    expect(hasValue(undefined)).to.be.false;
  });

  it('should say null has no value', function() {
    expect(hasValue(null)).to.be.false;
  });

  it('should say empty string has no value', function() {
    expect(hasValue('')).to.be.false;
  });

  it('should say string has value', function() {
    expect(hasValue('test')).to.be.true;
  });

  it('should say zero has value', function() {
    expect(hasValue(0)).to.be.true;
  });

  it('should say NaN has value', function() {
    expect(hasValue(NaN)).to.be.true;
  });

  it('should say empty obj has value', function() {
    expect(hasValue({})).to.be.true;
  });

  it('should say empty array has value', function() {
    expect(hasValue([])).to.be.true;
  });

  it('should say true has value', function() {
    expect(hasValue(true)).to.be.true;
  });

  it('should say false has value', function() {
    expect(hasValue(false)).to.be.true;
  });
});
