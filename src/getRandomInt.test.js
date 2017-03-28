import test from 'ava';
import { getRandomInt } from '../src/jsUtils';

test('should respect lower bound', (t) => {
  t.is(getRandomInt(0, 100) >= 0, true);
});

test('should respect upper bound', (t) => {
  t.is(getRandomInt(0, 100) <= 100, true);
});
