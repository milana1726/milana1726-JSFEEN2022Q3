const toPairs = (object) => {
  if (typeof object !== 'object') {
    throw new Error('Argument should be an object!');
  }
  if (!Object.keys(object).length) {
    throw new Error('Object is empty!');
  }

  return Object.entries(object);
};

module.exports = toPairs;
