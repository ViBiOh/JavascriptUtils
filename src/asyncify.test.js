import test from 'ava';
import { asyncify } from '../src/jsUtils';

test('should work with empty args', (t) => {
  let increment = 0;
  const async = asyncify(() => {
    increment += 1;
    return 2;
  });

  return async().then((result) => {
    t.is(result, 2);
    t.is(increment, 1);
  });
});

test('should work with one arg', (t) => {
  const async = asyncify(increment => increment * 5);

  const init = 1;
  return async(init).then((result) => {
    t.is(init, 1);
    t.is(result, 5);
  });
});

test('should handle error properly', (t) => {
  const async = asyncify(() => {
    throw new Error('error');
  });

  return async(1).then(() => t.fail(), error => t.truthy(error));
});
