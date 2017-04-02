import test from 'ava';
import { inspectValue } from '../src/jsUtils';

test('should not convert undefined', (t) => {
  t.is(inspectValue(undefined), undefined);
});

test('should not convert null', (t) => {
  t.is(inspectValue(null), null);
});

test('should not convert obj', (t) => {
  t.deepEqual(inspectValue({}), {});
});

test('should not convert array', (t) => {
  t.deepEqual(inspectValue([]), []);
});

test('should not convert NaN', (t) => {
  t.true(isNaN(inspectValue(NaN)));
});

test('should convert empty string to true', (t) => {
  t.true(inspectValue(''));
});

test('should convert true to true', (t) => {
  t.true(inspectValue('true'));
});

test('should convert false to false', (t) => {
  t.false(inspectValue('false'));
});

test('should convert zero to number', (t) => {
  t.is(inspectValue(0), 0);
});

test('should convert negative number to number', (t) => {
  t.is(inspectValue(-10), -10);
});

test('should convert positive number to number', (t) => {
  t.is(inspectValue(10), 10);
});

test('should convert string to number', (t) => {
  t.is(inspectValue('0'), 0);
});

test('should convert negative string to number', (t) => {
  t.is(inspectValue('-10'), -10);
});

test('should convert positive string to number', (t) => {
  t.is(inspectValue('10'), 10);
});

test('should convert zero to float', (t) => {
  t.is(inspectValue(0.0), 0.0);
});

test('should convert negative float to float', (t) => {
  t.is(inspectValue(-10.05), -10.05);
});

test('should convert positive float to float', (t) => {
  t.is(inspectValue(10.1), 10.1);
});

test('should convert string to float', (t) => {
  t.is(inspectValue('0.000001'), 0.000001);
});

test('should convert positive float to float', (t) => {
  t.is(inspectValue('+10.10'), 10.10);
});

test('should convert negative float to float', (t) => {
  t.is(inspectValue('-10.10'), -10.10);
});

test('should convert positive float to float', (t) => {
  t.is(inspectValue('10.2'), 10.2);
});

test('should convert positive float without unit to float', (t) => {
  t.is(inspectValue('.2'), 0.2);
});
