import test from 'ava';
import { asyncifyCallback } from './jsUtils';

test('should work with empty args', t => {
  let increment = 0;
  const asyncFn = asyncifyCallback(callback => {
    increment += 1;
    callback(null, 2);
  });

  return asyncFn().then(result => {
    t.is(result, 2);
    t.is(increment, 1);
  });
});

test('should work with one arg', t => {
  const asyncFn = asyncifyCallback((increment, callback) => {
    callback(null, increment * 5);
  });

  const init = 1;
  return asyncFn(init).then(result => {
    t.is(init, 1);
    t.is(result, 5);
  });
});

test('should handle error properly', t => {
  const asyncFn = asyncifyCallback((increment, callback) => {
    try {
      throw new Error('error');
    } catch (e) {
      callback(e, null);
    }
  });

  return asyncFn(1).then(
    () => t.fail(),
    error => t.truthy(error),
  );
});
