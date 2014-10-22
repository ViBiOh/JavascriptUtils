(function(root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.Dichotomic = factory();
  }
})(this, function() {
  'use strict';

  function defaultCompareFn(a, b) {
    if (a < b) {
      return -1;
    }
    if (a === b) {
      return 0;
    }
    return 1;
  }

  function getCompareFn(compareFn) {
    if (typeof compareFn === 'function') {
      return compareFn;
    }
    return defaultCompareFn;
  }

  function findIndex(element, array, compareFn) {
    if (!array) {
      return undefined;
    }
    var compare = getCompareFn(compareFn);
    var min = 0;
    var max = array.length - 1;
    var compareResult;
    var current;

    if (max >= 0) {
      while (min <= max) {
        current = Math.floor((min + max) / 2);
        compareResult = compare(element, array[current]);

        if (compareResult === 0) {
          return {
            found: true,
            index: current
          };
        } else if (compareResult < 0) {
          max = current - 1;
        } else {
          min = current + 1;
        }
      }
    }

    return {
      found: false,
      index: min
    };
  }

  return {
    checkSort: function(array, compareFn) {
      if (!array) {
        return undefined;
      }
      var compare = getCompareFn(compareFn);

      for (var i = array.length - 2; i >= 0; i -= 1) {
        if (compare(array[i], array[i + 1]) > 0) {
          return false;
        }
      }

      return true;
    },
    insert: function(element, array, compareFn) {
      var result = findIndex(element, array, compareFn);

      if (result) {
        array.splice(result.index, 0, element);
        return result.index;
      }
      return undefined;
    },
    search: function(element, array, compareFn) {
      var result = findIndex(element, array, compareFn);

      if (result && result.found) {
        return array[result.index];
      }
      return undefined;
    }
  };
});
