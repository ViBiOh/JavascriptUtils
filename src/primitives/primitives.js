(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define('Primitives', factory);
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
      if(Array.isArray) {
        return Array.isArray(value);
      } else {
        return Object.prototype.toString.call(value) === '[object Array]';
      }
    },
    hasValue: function(value) {
      return value !== undefined && value !== null && String(value) !== '';
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
    isAnAssociativeArray: function(value) {
      var retour = typeof value === 'object' && value !== null;

      if (retour) {
        retour = !(value instanceof String);
      } else if (retour) {
        retour = !(value instanceof Boolean);
      } else if (retour) {
        retour = !(value instanceof Number);
      } else if (retour) {
        retour = !(value instanceof Array);
      }

      return retour;
    },
    extend: function(destination, append) {
      var self = this;

      for (var key in append) {
        if (keyExists.call(append, key)) {
          if (keyExists.call(destination, key) && self.isAnAssociativeArray(append[key]) && self.isAnAssociativeArray(destination[key])) {
            self.extend(destination[key], append[key]);
          } else {
            destination[key] = append[key];
          }
        }
      }
    }
  };
});