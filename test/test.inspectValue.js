import {expect} from './test.common.js';
import {inspectValue} from '../src/jsUtils.js';

describe('inspectValue', () => {
  it('should not convert undefined', () => {
    expect(inspectValue(undefined)).to.be.undefined;
  });

  it('should not convert null', () => {
    expect(inspectValue(null)).to.be.null;
  });

  it('should not convert obj', () => {
    expect(inspectValue({})).to.be.eql({});
  });

  it('should not convert array', () => {
    expect(inspectValue([])).to.be.eql([]);
  });

  it('should not convert NaN', () => {
    expect(isNaN(inspectValue(NaN))).to.be.true;
  });

  it('should convert empty string to true', () => {
    expect(inspectValue('')).to.be.equal(true);
  });

  it('should convert true to true', () => {
    expect(inspectValue('true')).to.be.equal(true);
  });

  it('should convert false to false', () => {
    expect(inspectValue('false')).to.be.equal(false);
  });

  it('should convert zero to number', () => {
    expect(inspectValue(0)).to.be.equal(0);
  });

  it('should convert negative number to number', () => {
    expect(inspectValue(-10)).to.be.equal(-10);
  });

  it('should convert positive number to number', () => {
    expect(inspectValue(10)).to.be.equal(10);
  });

  it('should convert string to number', () => {
    expect(inspectValue('0')).to.be.equal(0);
  });

  it('should convert negative string to number', () => {
    expect(inspectValue('-10')).to.be.equal(-10);
  });

  it('should convert positive string to number', () => {
    expect(inspectValue('10')).to.be.equal(10);
  });

  it('should convert zero to float', () => {
    expect(inspectValue(0.0)).to.be.equal(0.0);
  });

  it('should convert negative float to float', () => {
    expect(inspectValue(-10.05)).to.be.equal(-10.05);
  });

  it('should convert positive float to float', () => {
    expect(inspectValue(10.1)).to.be.equal(10.1);
  });

  it('should convert string to float', () => {
    expect(inspectValue('0.000001')).to.be.equal(0.000001);
  });

  it('should convert positive float to float', () => {
    expect(inspectValue('+10.10')).to.be.equal(10.10);
  });

  it('should convert negative float to float', () => {
    expect(inspectValue('-10.10')).to.be.equal(-10.10);
  });

  it('should convert positive float to float', () => {
    expect(inspectValue('10.2')).to.be.equal(10.2);
  });

  it('should convert positive float without unit to float', () => {
    expect(inspectValue('.2')).to.be.equal(0.2);
  });
});
