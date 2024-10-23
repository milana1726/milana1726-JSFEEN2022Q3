const toPairs = (object) => {
  if (typeof object !== 'object' && object !== undefined) {
    throw new Error('Argument should be an object!');
  }

  if (object === undefined) {
    return [];
  }

  return Object.entries(object);
};

module.exports = toPairs;
