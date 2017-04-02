import test from 'ava';
import { isAssociativeArray } from '../src/jsUtils';

test('should say undefined is not an aa', (t) => {
  t.is(isAssociativeArray(undefined), false);
});

test('should say null is not an aa', (t) => {
  t.is(isAssociativeArray(null), false);
});

test('should say empty string is not an aa', (t) => {
  t.is(isAssociativeArray(''), false);
});

test('should say string is not an aa', (t) => {
  t.is(isAssociativeArray('test'), false);
});

test('should say zero is not an aa', (t) => {
  t.is(isAssociativeArray(0), false);
});

test('should say number is not an aa', (t) => {
  t.is(isAssociativeArray(8000), false);
});

test('should say NaN is not an aa', (t) => {
  t.is(isAssociativeArray(NaN), false);
});

test('should say empty obj is an aa', (t) => {
  t.true(isAssociativeArray({}));
});

test('should say empty array is not an aa', (t) => {
  t.is(isAssociativeArray([]), false);
});
