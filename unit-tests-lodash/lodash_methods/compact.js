const compact = (array) => {
  if (!Array.isArray(array)) {
    throw new TypeError('Argument should be an array!');
  }
  if (!array.length) {
    throw new Error('Array is empty!');
  }

  const result = [];

  for (const item of array) {
    if (item) {
      result[result.length] = item;
    }
  }
  return result;
};

module.exports = compact;
