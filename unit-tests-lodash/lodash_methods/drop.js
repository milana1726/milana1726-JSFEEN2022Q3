const drop = (array, n = 1) => {
  if (!Array.isArray(array)) {
    throw new Error('First argument should be an array!');
  }
  if (!array.length) {
    throw new Error('Array is empty!');
  }
  if (!Number.isInteger(n)) {
    throw new Error('Second argument should be an integer!');
  }
  if (n < 0) {
    throw new Error('Second argument should be >= 0!');
  }

  const result = [];

  for (let i = n; i < array.length; i += 1) {
    result[result.length] = array[i];
  }
  return result;
};

module.exports = drop;
