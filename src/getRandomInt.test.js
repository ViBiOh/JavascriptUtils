import test from 'ava';
import { getRandomInt } from '../src/jsUtils';

test('should respect lower bound', (t) => {
  t.true(getRandomInt(0, 100) >= 0);
});

test('should respect upper bound', (t) => {
  t.true(getRandomInt(0, 100) <= 100);
});
