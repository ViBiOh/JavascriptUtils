import test from 'ava';
import { asyncifyCallback } from '../src/jsUtils';

test('should work with empty args', (t) => {
  let increment = 0;
  const async = asyncifyCallback((callback) => {
    increment += 1;
    callback(null, 2);
  });

  return async().then((result) => {
    t.is(result, 2);
    t.is(increment, 1);
  });
});

test('should work with one arg', (t) => {
  const async = asyncifyCallback((increment, callback) => {
    callback(null, increment * 5);
  });

  const init = 1;
  return async(init).then((result) => {
    t.is(init, 1);
    t.is(result, 5);
  });
});

test('should handle error properly', (t) => {
  const async = asyncifyCallback((increment, callback) => {
    try {
      throw new Error('error');
    } catch (e) {
      callback(e, null);
    }
  });

  return async(1).then(() => t.fail(), error => t.truthy(error));
});
