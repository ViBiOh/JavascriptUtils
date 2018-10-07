import test from 'ava';
import { extend } from './jsUtils';

test('should throw exception when undefined params', (t) => {
  let failed = false;
  try {
    extend(undefined, undefined);
  } catch (err) {
    failed = true;
  }
  t.true(failed);
});

test('should throw exception when first undefined param', (t) => {
  let failed = false;
  try {
    extend({}, null);
  } catch (err) {
    failed = true;
  }
  t.true(failed);
});

test('should throw exception when second undefined param', (t) => {
  let failed = false;
  try {
    extend(true, {});
  } catch (err) {
    failed = true;
  }
  t.true(failed);
});

test('should extend two empty object', (t) => {
  t.deepEqual(extend({}, {}), {});
});

test('should extend two simple objects', (t) => {
  t.deepEqual(
    extend(
      {
        id: 1,
        name: 'Test',
      },
      {
        id: 2,
        mail: 'test@localhost',
      },
    ),
    {
      id: 2,
      name: 'Test',
      mail: 'test@localhost',
    },
  );
});

test('should extend two objects with one sub-objects', (t) => {
  t.deepEqual(
    extend(
      {
        id: 1,
        name: 'Test',
      },
      {
        id: 2,
        contact: {
          mail: 'test@localhost',
        },
      },
    ),
    {
      id: 2,
      name: 'Test',
      contact: {
        mail: 'test@localhost',
      },
    },
  );
});

test('should extend two objects with undefined force', (t) => {
  t.deepEqual(
    extend(
      {
        id: 1,
        name: 'Test',
        contact: {
          mail: 'test@localhost',
        },
      },
      {
        id: 2,
        contact: undefined,
      },
    ),
    {
      id: 2,
      name: 'Test',
      contact: undefined,
    },
  );
});

test('should extend two objects with sub-objects', (t) => {
  t.deepEqual(
    extend(
      {
        id: 1,
        name: 'Test',
        contact: {
          mail: 'test@localhost',
        },
      },
      {
        id: 2,
        contact: {
          event: () => {
            'test';
          },
        },
      },
    ).toString(),
    {
      id: 2,
      name: 'Test',
      contact: {
        mail: 'test@localhost',
        event: () => {
          'test';
        },
      },
    }.toString(),
  );
});

test('should ignore prototype property', (t) => {
  class RawObject {
    constructor(id) {
      this.id = id;
    }

    // eslint-disable-next-line class-methods-use-this
    toString() {
      return 'test string';
    }
  }

  t.deepEqual(extend({}, new RawObject(8000)), {
    id: 8000,
  });
});
