import {expect} from './test.common.js';
import {arrayRm} from '../src/jsUtils.js';

describe('arrayRm', function() {
  it('should deal with undefined array', function() {
    var array;
    arrayRm(array, undefined);

    expect(array).to.be.undefined;
  });
  it('should deal with null array', function() {
    var array = null;
    arrayRm(array, undefined);

    expect(array).to.be.null;
  });
  it('should not remove content undefined', function() {
    var array = [1];
    arrayRm(array, undefined);

    expect(array).to.be.eql([1]);
  });
  it('should not remove content not present', function() {
    var array = [1];
    arrayRm(array, 0);

    expect(array).to.be.eql([1]);
  });
  it('should remove content of one row', function() {
    var array = [1];
    arrayRm(array, 1);

    expect(array).to.be.eql([]);
  });
  it('should remove object content', function() {
    var variable = {
      id: 4
    };
    var array = [variable];
    arrayRm(array, variable);

    expect(array).to.be.eql([]);
  });
  it('should remove object content on multiple row', function() {
    var array = [];
    for (var i = 0; i < 10; i += 1) {
      array.push({
        id: i,
        name: 'John Doe Number ' + i,
        contact: [1, 2, 3, 4],
        address: {
          city: 'Paris',
          country: 'France'
        }
      });
    }

    expect(array[5].id).to.be.equal(5);

    arrayRm(array, array[5]);

    expect(array.length).to.be.equal(9);
    expect(array[5].id).to.be.equal(6);
  });
  it('should not remove similar object', function() {
    var array = [];
    for (var i = 0; i < 10; i += 1) {
      array.push({
        id: i,
        name: 'John Doe Number ' + i,
        contact: [1, 2, 3, 4],
        address: {
          city: 'Paris',
          country: 'France'
        }
      });
    }

    arrayRm(array, {
        id: 5,
        name: 'John Doe Number ' + 5,
        contact: [1, 2, 3, 4],
        address: {
          city: 'Paris',
          country: 'France'
        }
      });

    expect(array.length).to.be.equal(10);
  });
});
