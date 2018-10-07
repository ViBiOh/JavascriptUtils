import test from 'ava';
import { checkArrayOf } from './jsUtils';

class TestClass {
  constructor(i) {
    this.count = i;
  }
}

class Test {
  constructor(i) {
    this.count = i;
  }
}

test('should works with undefined', (t) => {
  t.deepEqual(checkArrayOf(), []);
});

test('should throw an error if type is undefined', (t) => {
  try {
    checkArrayOf(new TestClass());
    t.fail();
  } catch (err) {
    t.deepEqual(err, new Error('type is undefined in checkArrayOf'));
  }
});

test('should works with unique instance', (t) => {
  t.deepEqual(checkArrayOf(new TestClass(), TestClass), [new TestClass()]);
});

test('should works with an empty array', (t) => {
  t.deepEqual(checkArrayOf([], TestClass), []);
});

test('should works with an array of valid instances', (t) => {
  t.deepEqual(checkArrayOf([new TestClass(1), new TestClass(2)], TestClass), [
    new TestClass(1),
    new TestClass(2),
  ]);
});

test('should reject if array contains invalid instance', (t) => {
  try {
    checkArrayOf([new TestClass(1), new Test(2)], TestClass);
    t.fail();
  } catch (err) {
    t.deepEqual(err, new Error('array contains objects differents than required'));
  }
});
