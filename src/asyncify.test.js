import test from 'ava';
import { asyncify } from './jsUtils';

test('should work with empty args', t => {
  let increment = 0;
  const asyncFn = asyncify(() => {
    increment += 1;
    return 2;
  });

  return asyncFn().then(result => {
    t.is(result, 2);
    t.is(increment, 1);
  });
});

test('should work with one arg', t => {
  const asyncFn = asyncify(increment => increment * 5);

  const init = 1;
  return asyncFn(init).then(result => {
    t.is(init, 1);
    t.is(result, 5);
  });
});

test('should handle error properly', t => {
  const asyncFn = asyncify(() => {
    throw new Error('error');
  });

  return asyncFn(1).then(
    () => t.fail(),
    error => t.truthy(error),
  );
});
