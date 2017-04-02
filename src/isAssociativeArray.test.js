import test from 'ava';
import { isAssociativeArray } from '../src/jsUtils';

test('should say undefined is not an aa', (t) => {
  t.false(isAssociativeArray(undefined));
});

test('should say null is not an aa', (t) => {
  t.false(isAssociativeArray(null));
});

test('should say empty string is not an aa', (t) => {
  t.false(isAssociativeArray(''));
});

test('should say string is not an aa', (t) => {
  t.false(isAssociativeArray('test'));
});

test('should say zero is not an aa', (t) => {
  t.false(isAssociativeArray(0));
});

test('should say number is not an aa', (t) => {
  t.false(isAssociativeArray(8000));
});

test('should say NaN is not an aa', (t) => {
  t.false(isAssociativeArray(NaN));
});

test('should say empty obj is an aa', (t) => {
  t.true(isAssociativeArray({}));
});

test('should say empty array is not an aa', (t) => {
  t.false(isAssociativeArray([]));
});
