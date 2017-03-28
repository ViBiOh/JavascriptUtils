import test from 'ava';
import { getInt } from '../src/jsUtils';

test('should say if udefined is an int', (t) => {
  t.is(getInt(undefined), null);
});

test('should say if udefined is an int', (t) => {
  t.is(getInt(null), null);
});

test('should say if empty string is an int', (t) => {
  t.is(getInt(''), null);
});

test('should say if object is an int', (t) => {
  t.is(getInt({}), null);
});

test('should say if defined object is an int', (t) => {
  t.is(getInt({
    value: 0,
  }), null);
});

test('should say if array is an int', (t) => {
  t.is(getInt([]), null);
});

test('should say if double is an int', (t) => {
  t.is(getInt(0.1), null);
});

test('should say if NaN is an int', (t) => {
  t.is(getInt(NaN), null);
});

test('should say if zero is an int', (t) => {
  t.is(getInt(0), 0);
});

test('should say if number is an int', (t) => {
  t.is(getInt(8000), 8000);
});

test('should say if negative number is an int', (t) => {
  t.is(getInt(-50), -50);
});

test('should say if pow is an int', (t) => {
  t.is(getInt(1e8), 1e8);
});
