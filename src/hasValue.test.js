import test from 'ava';
import { hasValue } from '../src/jsUtils';

test('should say undefined has no value', (t) => {
  t.is(hasValue(undefined), false);
});

test('should say null has no value', (t) => {
  t.is(hasValue(null), false);
});

test('should say empty string has no value', (t) => {
  t.is(hasValue(''), false);
});

test('should say string has value', (t) => {
  t.is(hasValue('test'), true);
});

test('should say zero has value', (t) => {
  t.is(hasValue(0), true);
});

test('should say NaN has value', (t) => {
  t.is(hasValue(NaN), true);
});

test('should say empty obj has value', (t) => {
  t.is(hasValue({}), true);
});

test('should say empty array has value', (t) => {
  t.is(hasValue([]), true);
});

test('should say true has value', (t) => {
  t.is(hasValue(true), true);
});

test('should say false has value', (t) => {
  t.is(hasValue(false), true);
});
