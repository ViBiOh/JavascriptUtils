const safeHasOwnProperty = {}.hasOwnProperty;

export function getInt(value) {
  if (typeof value === 'number' && value % 1 === 0) {
    return value;
  }

  const strValue = String(value);
  if (strValue.search(/^[+-]?[0-9]+$/) !== -1) {
    return parseInt(strValue, 10);
  }

  return null;
}

export function getRandomInt(min, max) {
  const maxValue = max - min;
  return Math.floor(Math.random() * (maxValue + 1 + min));
}

export function hasValue(value) {
  return (
    typeof value !== 'undefined' && value !== null && (Array.isArray(value) || String(value) !== '')
  );
}

export function inspectValue(value) {
  if (typeof value === 'undefined' || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value;
  }

  const strValue = String(value);
  if (strValue === '' || strValue === 'true') {
    return true;
  }

  if (strValue === 'false') {
    return false;
  }

  const intValue = getInt(value);
  if (intValue !== null) {
    return intValue;
  }

  if (strValue.search(/^[+-]?[0-9]*\.[0-9]+$/) !== -1) {
    return parseFloat(strValue);
  }

  return value;
}

export function isAssociativeArray(value) {
  return (
    typeof value === 'object' &&
    value !== null &&
    !(
      value instanceof String ||
      value instanceof Boolean ||
      value instanceof Number ||
      Array.isArray(value)
    )
  );
}

export function arrayRm(array, item) {
  if (!Array.isArray(array)) {
    return false;
  }

  const index = array.indexOf(item);
  if (index > -1) {
    array.splice(index, 1);
    return true;
  }
  return false;
}

export function checkArrayOf(array, type, message) {
  if (typeof array === 'undefined') {
    return [];
  }

  if (typeof type === 'undefined') {
    throw new Error('type is undefined in checkArrayOf');
  }

  if (array instanceof type) {
    return [array];
  }

  if (
    !Array.isArray(array) ||
    array
      .map(source => source instanceof type)
      .reduce((previous, current) => !current || previous, false)
  ) {
    throw new Error(message || 'array contains objects differents than required');
  }

  return array;
}

export function extend(destination, append) {
  const destinationExtended = destination;

  if (!(isAssociativeArray(destination) && isAssociativeArray(append))) {
    throw new Error(`Invalid extend between <${destination}> and <${append}>`);
  }

  Object.keys(append).forEach(key => {
    if (!safeHasOwnProperty.apply(append, [key])) {
      return;
    }

    if (
      safeHasOwnProperty.apply(destinationExtended, [key]) &&
      isAssociativeArray(destinationExtended[key]) &&
      isAssociativeArray(append[key])
    ) {
      extend(destinationExtended[key], append[key]);
    } else {
      destinationExtended[key] = append[key];
    }
  });

  return destinationExtended;
}

export function stringify(obj, replacer, space) {
  const objectCache = [];
  const whiteList = Array.isArray(replacer) ? replacer : false;

  return JSON.stringify(
    obj,
    (key, value) => {
      if (key !== '' && whiteList && whiteList.indexOf(key) === -1) {
        return undefined;
      }
      if (typeof value === 'object' && value !== null) {
        if (objectCache.indexOf(value) !== -1) {
          return '[Circular]';
        }
        objectCache.push(value);
      }
      return value;
    },
    space,
  );
}

export function asyncifyCallback(fn, bind) {
  return (...args) =>
    new Promise((resolve, reject) => {
      args.push((err, res) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
      fn.apply(bind || null, args);
    });
}
