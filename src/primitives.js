(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Primitives = factory();
  }
})(this, function() {
  'use strict';

  var keyExists = {}.hasOwnProperty;

  return {
    getInt: function(value) {
      if (typeof value === 'number' && value % 1 === 0) {
        return value;
      }

      var strValue = String(value);
      if (strValue.search(/^[\+\-]?[0-9]+$/) !== -1) {
        return parseInt(strValue, 10);
      }

      return null;
    },
    arrayRm: function(array, item) {
      if (!Array.isArray(array)) {
        return;
      }

      var index = array.indexOf(item);
      if (index > -1) {
        array.splice(index, 1);
      }
    },
    hasValue: function(value) {
      return typeof value !== 'undefined' && value !== null && (Array.isArray(value) || String(value) !== '');
    },
    inspectValue: function(value) {
      var self = this;

      if (typeof value !== 'undefined' && value !== null) {
        if (Array.isArray(value)) {
          return value;
        }

        var strValue = String(value);
        if (strValue === '' || strValue === 'true') {
          return true;
        }
        if (strValue === 'false') {
          return false;
        }
        var intValue = self.getInt(value);
        if (intValue !== null) {
          return intValue;
        }
        if (strValue.search(/^[\+\-]?[0-9]*\.[0-9]+$/) !== -1) {
          return parseFloat(strValue);
        }
        return value;
      }
    },
    isAssociativeArray: function(value) {
      return typeof value === 'object' && value !== null && !(value instanceof String || value instanceof Boolean || value instanceof Number || Array.isArray(value));
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
    },
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    asyncify: function(fn) {
      return function() {
        var args = [].slice.call(arguments, 0);
        return new Promise(function(resolve, reject) {
          try {
            resolve(fn.apply(this, args));
          } catch (e) {
            reject(e);
          }
        });
      };
    },
    asyncifyCallback: function(fn) {
      return function() {
        var args = [].slice.call(arguments, 0);
        return new Promise(function(resolve, reject) {
          args.push(function(err, res) {
            if (err) {
              reject(err);
              return;
            }
            resolve(res);
          });
          fn.apply(this, args);
        });
      };
    },
    stringify: function(obj, space) {
      var objectCache = [];

      return JSON.stringify(obj, function(key, value) {
        if (typeof value === 'object' && value !== null) {
          if (objectCache.indexOf(value) !== -1) {
            return '[Circular]';
          }
          objectCache.push(value);
        }
        return value;
      }, space);
    }
  };
});
