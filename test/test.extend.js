import {expect} from './test.common.js';
import {extend} from '../src/jsUtils.js';

describe('extend', function() {
  it('should throw exception when undefined params', function() {
    var failed = false;
    try {
      extend(undefined, undefined);
    } catch (err) {
      failed = true;
    }
    expect(failed).to.be.true;
  });

  it('should throw exception when first undefined param', function() {
    var failed = false;
    try {
      extend({}, null);
    } catch (err) {
      failed = true;
    }
    expect(failed).to.be.true;
  });

  it('should throw exception when second undefined param', function() {
    var failed = false;
    try {
      extend(true, {});
    } catch (err) {
      failed = true;
    }
    expect(failed).to.be.true;
  });

  it('should extend two empty object', function() {
    expect(extend({}, {})).to.be.eql({});
  });

  it('should extend two simple objects', function() {
    expect(extend({
      id: 1, name: 'Test'
    }, {
      id: 2, mail: 'test@localhost'
    })).to.be.eql({
      id: 2, name: 'Test', mail: 'test@localhost'
    });
  });

  it('should extend two objects with one sub-objects', function() {
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

  it('should extend two objects with undefined force', function() {
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

  it('should extend two objects with sub-objects', function() {
    expect(extend({
      id: 1,
      name: 'Test',
      contact: {
        mail: 'test@localhost'
      }
    }, {
      id: 2,
      contact: {
        event: function() {
          'test';
        }
      }
    }).toString()).to.be.eql({
      id: 2,
      name: 'Test',
      contact: {
        mail: 'test@localhost',
        event: function() {
          'test';
        }
      }
    }.toString());
  });

  it('should ignore prototype property', function() {
    var RawObject = function() {
      this.id = 8000;
    };

    RawObject.prototype.toString = function() {
      return 'test string';
    };

    expect(extend({}, new RawObject())).to.be.eql({
      id: 8000
    });
  });
});
