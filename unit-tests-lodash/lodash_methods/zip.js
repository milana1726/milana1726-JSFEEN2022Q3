

const zip = (...arrays) => {
    let length = arrays[0].length;

    for (let array of arrays) {
        if (!Array.isArray(array)) {
          throw new Error('All arguments should be arrays!');
        }
        if (!array.length) {
          throw new Error('Array is empty!');
        }
        if (array.length != length) {
            throw new Error('The length of all arrays should be equal!');
        }
    }

    let result = [];

    for (let i = 0; i < length; i++) {
        let arr = [];
        for (let array of arrays) {
            arr[arr.length] = array[i];
        }
        result[result.length] = arr;
    }

  return result;
}

module.exports = zip;