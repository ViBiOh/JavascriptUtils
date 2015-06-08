import {expect} from './test.common.js';
import {inspectValue} from '../src/jsUtils.js';

describe('inspectValue', function() {
  it('should not convert undefined', function() {
    expect(inspectValue(undefined)).to.be.undefined;
  });

  it('should not convert null', function() {
    expect(inspectValue(null)).to.be.undefined;
  });

  it('should not convert obj', function() {
    expect(inspectValue({})).to.be.eql({});
  });

  it('should not convert array', function() {
    expect(inspectValue([])).to.be.eql([]);
  });

  it('should not convert NaN', function() {
    expect(isNaN(inspectValue(NaN))).to.be.true;
  });

  it('should convert empty string to true', function() {
    expect(inspectValue('')).to.be.equal(true);
  });

  it('should convert true to true', function() {
    expect(inspectValue('true')).to.be.equal(true);
  });

  it('should convert false to false', function() {
    expect(inspectValue('false')).to.be.equal(false);
  });

  it('should convert zero to number', function() {
    expect(inspectValue(0)).to.be.equal(0);
  });

  it('should convert negative number to number', function() {
    expect(inspectValue(-10)).to.be.equal(-10);
  });

  it('should convert positive number to number', function() {
    expect(inspectValue(10)).to.be.equal(10);
  });

  it('should convert string to number', function() {
    expect(inspectValue('0')).to.be.equal(0);
  });

  it('should convert negative string to number', function() {
    expect(inspectValue('-10')).to.be.equal(-10);
  });

  it('should convert positive string to number', function() {
    expect(inspectValue('10')).to.be.equal(10);
  });

  it('should convert zero to float', function() {
    expect(inspectValue(0.0)).to.be.equal(0.0);
  });

  it('should convert negative float to float', function() {
    expect(inspectValue(-10.05)).to.be.equal(-10.05);
  });

  it('should convert positive float to float', function() {
    expect(inspectValue(10.1)).to.be.equal(10.1);
  });

  it('should convert string to float', function() {
    expect(inspectValue('0.000001')).to.be.equal(0.000001);
  });

  it('should convert positive float to float', function() {
    expect(inspectValue('+10.10')).to.be.equal(10.10);
  });

  it('should convert negative float to float', function() {
    expect(inspectValue('-10.10')).to.be.equal(-10.10);
  });

  it('should convert positive float to float', function() {
    expect(inspectValue('10.2')).to.be.equal(10.2);
  });

  it('should convert positive float without unit to float', function() {
    expect(inspectValue('.2')).to.be.equal(0.2);
  });
});
