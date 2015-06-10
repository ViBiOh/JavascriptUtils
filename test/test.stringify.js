import {expect} from './test.common.js';
import {stringify} from '../src/jsUtils.js';

describe('stringify', () => {
  it('should stringify a basic object', () => {
    var result = stringify({
      id: 8000,
      name: 'Bob'
    });

    expect(result).to.be.eql('{"id":8000,"name":"Bob"}');
  });

  it('should stringify with given space', () => {
    var result = stringify({
      id: 8000,
      name: 'Bob'
    }, '  ');

    expect(result).to.be.eql('{\n  "id": 8000,\n  "name": "Bob"\n}');
  });

  it('should stringify with circular reference', () => {
    var circularObject = {
      id: 8000
    };
    circularObject.child = circularObject;
    var result = stringify(circularObject);

    expect(result).to.be.eql('{"id":8000,"child":"[Circular]"}');
  });
});
