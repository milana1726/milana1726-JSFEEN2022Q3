const includes = (collection, value, fromIndex = 0) => {
  if (!Array.isArray(collection)) {
    throw new TypeError('First argument should be an array!');
  }
  if (!collection.length) {
    throw new Error('Collection is empty!');
  }
  if (value === null) {
    throw new Error('Second argument should not be null!');
  }
  if (!Number.isInteger(fromIndex)) {
    throw new Error('Third argument should be an integer!');
  }
  if (Math.abs(fromIndex) >= collection.length) {
    throw new Error('Third argument should not be greater than or equal to the collection length!');
  }

  if (fromIndex >= 0) {
    for (let i = fromIndex; i < collection.length; i += 1) {
      if (value === collection[i]) {
        return true;
      }
    }
  } else {
    for (let i = collection.length - 1; i >= Math.abs(fromIndex); i -= 1) {
      if (value === collection[i]) {
        return true;
      }
    }
  }
  return false;
};

module.exports = includes;
