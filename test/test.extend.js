import {expect} from './test.common.js';
import {extend} from '../src/jsUtils.js';

describe('extend', () => {
  it('should throw exception when undefined params', () => {
    var failed = false;
    try {
      extend(undefined, undefined);
    } catch (err) {
      failed = true;
    }
    expect(failed).to.be.true;
  });

  it('should throw exception when first undefined param', () => {
    var failed = false;
    try {
      extend({}, null);
    } catch (err) {
      failed = true;
    }
    expect(failed).to.be.true;
  });

  it('should throw exception when second undefined param', () => {
    var failed = false;
    try {
      extend(true, {});
    } catch (err) {
      failed = true;
    }
    expect(failed).to.be.true;
  });

  it('should extend two empty object', () => {
    expect(extend({}, {})).to.be.eql({});
  });

  it('should extend two simple objects', () => {
    expect(extend({
      id: 1, name: 'Test'
    }, {
      id: 2, mail: 'test@localhost'
    })).to.be.eql({
      id: 2, name: 'Test', mail: 'test@localhost'
    });
  });

  it('should extend two objects with one sub-objects', () => {
    expect(extend({
      id: 1, name: 'Test'
    }, {
      id: 2, contact: {
        mail: 'test@localhost'
      }
    })).to.be.eql({
      id: 2, name: 'Test', contact: {
        mail: 'test@localhost'
      }
    });
  });

  it('should extend two objects with undefined force', () => {
    expect(extend({
      id: 1, name: 'Test', contact: {
        mail: 'test@localhost'
      }
    }, {
      id: 2, contact: undefined
    })).to.be.eql({
      id: 2, name: 'Test', contact: undefined
    });
  });

  it('should extend two objects with sub-objects', () => {
    expect(extend({
      id: 1,
      name: 'Test',
      contact: {
        mail: 'test@localhost'
      }
    }, {
      id: 2,
      contact: {
        event: () => {
          'test';
        }
      }
    }).toString()).to.be.eql({
      id: 2,
      name: 'Test',
      contact: {
        mail: 'test@localhost',
        event: () => {
          'test';
        }
      }
    }.toString());
  });

  it('should ignore prototype property', () => {
    class RawObject {
      constructor(id) {
        this.id = id;
      }

      toString() {
        return 'test string';
      }
    }

    expect(extend({}, new RawObject(8000))).to.be.eql({
      id: 8000
    });
  });
});
