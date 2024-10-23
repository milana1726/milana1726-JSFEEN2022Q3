const map = (collection, iteratee) => {
  if (!Array.isArray(collection)) {
    throw new TypeError('First argument should be an array!');
  }
  if (!collection.length) {
    throw new Error('Collection is empty!');
  }
  if (iteratee === null) {
    throw new Error('Second argument should not be null!');
  }
  if (!(typeof iteratee === 'function') && !(iteratee === undefined)) {
    throw new Error('Second argument should be a function!');
  }
  if (iteratee === undefined) {
    return collection;
  }

  const result = [];

  for (let i = 0; i < collection.length; i += 1) {
    const value = collection[i];
    result[result.length] = iteratee(value, i, collection);
  }
  return result;
};

module.exports = map;
