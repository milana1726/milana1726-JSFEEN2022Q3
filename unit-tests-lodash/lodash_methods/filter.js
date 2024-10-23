const filter = (collection, predicate) => {
  if (!Array.isArray(collection)) {
    throw new Error('First argument should be an array!');
  }
  if (!collection.length) {
    throw new Error('Collection is empty!');
  }
  if (predicate === null) {
    throw new Error('Second argument should not be null!');
  }
  if (!(typeof predicate === 'function')) {
    throw new Error('Second argument should be a function!');
  }

  const result = [];

  for (let i = 0; i < collection.length; i += 1) {
    const value = collection[i];
    if (predicate(value, i, collection)) {
      result[result.length] = value;
    }
  }
  return result;
};

module.exports = filter;
