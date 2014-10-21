(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.Primitives = factory();
  }
})(this, function() {
  'use strict';

  var keyExists = {}.hasOwnProperty;

  return {
    isInt: function(value) {
      return typeof value === 'number' && (value % 1) === 0;
    },
    isArray: function(value) {
      if (Array.isArray) {
        return Array.isArray(value);
      } else {
        return Object.prototype.toString.call(value) === '[object Array]';
      }
    },
    hasValue: function(value) {
      var self = this;

      return value !== undefined && value !== null && (self.isArray(value) || String(value) !== '');
    },
    inspectValue: function(value) {
      var self = this;

      if (value !== undefined && value !== null) {
        if (self.isArray(value)) {
          return value;
        }

        var strValue = String(value);
        if (strValue === '' || strValue === 'true') {
          return true;
        }
        if (strValue === 'false') {
          return false;
        }
        if (self.isInt(value) || strValue.search(/^[+-]?[0-9]+$/) !== -1) {
          return parseInt(strValue, 10);
        }
        if (strValue.search(/^[+-]?[0-9]*\.?[0-9]+$/) !== -1) {
          return parseFloat(strValue);
        }
        return value;
      }
      return undefined;
    },
    isAssociativeArray: function(value) {
      return typeof value === 'object' && value !== null && !(value instanceof String || value instanceof Boolean || value instanceof Number || value instanceof Array);
    },
    extend: function(destination, append) {
      var self = this;

      if (!(self.isAssociativeArray(destination) && self.isAssociativeArray(append))) {
        throw 'Invalid extend between <' + destination + '> and <' + append + '>';
      }

      for (var key in append) {
        if (keyExists.call(append, key)) {
          if (keyExists.call(destination, key) && self.isAssociativeArray(append[key]) && self.isAssociativeArray(destination[key])) {
            self.extend(destination[key], append[key]);
          } else {
            destination[key] = append[key];
          }
        }
      }

      return destination;
    }
  };
});
