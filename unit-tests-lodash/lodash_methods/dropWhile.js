const dropWhile = (array, predicate) => {
    if (!Array.isArray(array)) {
        throw new TypeError(`First argument should be an array!`);
    }
    if (!array.length) {
        throw new Error('Array is empty!');
    }
    if (predicate === null) {
        throw new Error('Second argument should not be null!');
    }
    if (!(typeof predicate === 'function')) {
        throw new Error('Second argument should be a function!');
    }

    let result = [];

    for (let i = 0; i < array.length; i++) {
        if (!predicate(array[i], i, array)) {
            result[result.length] = array[i];
        }
    }
    return result;
}

module.exports = dropWhile;
