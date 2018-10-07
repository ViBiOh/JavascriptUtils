import test from 'ava';
import { arrayRm } from './jsUtils';

test('should deal with undefined array', (t) => {
  const array = undefined;
  arrayRm(array, undefined);

  t.is(array, undefined);
});

test('should deal with null array', (t) => {
  const array = null;
  arrayRm(array, undefined);

  t.is(array, null);
});

test('should not remove content undefined', (t) => {
  const array = [1];
  arrayRm(array, undefined);

  t.deepEqual(array, [1]);
});

test('should not remove content not present', (t) => {
  const array = [1];
  arrayRm(array, 0);

  t.deepEqual(array, [1]);
});

test('should remove content of one row', (t) => {
  const array = [1];
  arrayRm(array, 1);

  t.deepEqual(array, []);
});

test('should remove object content', (t) => {
  const variable = {
    id: 4,
  };
  const array = [variable];
  arrayRm(array, variable);

  t.deepEqual(array, []);
});

test('should remove object content on multiple row', (t) => {
  const array = [];
  for (let i = 0; i < 10; i += 1) {
    array.push({
      id: i,
      name: `John Doe Number ${i}`,
      contact: [1, 2, 3, 4],
      address: {
        city: 'Paris',
        country: 'France',
      },
    });
  }

  t.is(array[5].id, 5);

  arrayRm(array, array[5]);

  t.is(array.length, 9);
  t.is(array[5].id, 6);
});

test('should not remove similar object', (t) => {
  const array = [];
  for (let i = 0; i < 10; i += 1) {
    array.push({
      id: i,
      name: `John Doe Number ${i}`,
      contact: [1, 2, 3, 4],
      address: {
        city: 'Paris',
        country: 'France',
      },
    });
  }

  arrayRm(array, {
    id: 5,
    name: 'John Doe Number 5',
    contact: [1, 2, 3, 4],
    address: {
      city: 'Paris',
      country: 'France',
    },
  });

  t.is(array.length, 10);
});
