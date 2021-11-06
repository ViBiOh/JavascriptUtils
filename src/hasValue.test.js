import test from 'ava';
import { hasValue } from './jsUtils';

test('should say undefined has no value', (t) => {
  t.false(hasValue(undefined));
});

test('should say null has no value', (t) => {
  t.false(hasValue(null));
});

test('should say empty string has no value', (t) => {
  t.false(hasValue(''));
});

test('should say string has value', (t) => {
  t.true(hasValue('test'));
});

test('should say zero has value', (t) => {
  t.true(hasValue(0));
});

test('should say NaN has value', (t) => {
  t.true(hasValue(NaN));
});

test('should say empty obj has value', (t) => {
  t.true(hasValue({}));
});

test('should say empty array has value', (t) => {
  t.true(hasValue([]));
});

test('should say true has value', (t) => {
  t.true(hasValue(true));
});

test('should say false has value', (t) => {
  t.true(hasValue(false));
});
