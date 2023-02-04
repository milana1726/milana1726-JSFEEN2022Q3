const includes = (collection, value, fromIndex = 0) => {
    if (!Array.isArray(collection)) {
        throw new TypeError(`First argument should be an array!`);
    }
    if (!collection.length) {
        throw new Error('Array is empty!');
    }
    if (value === null) {
        throw new Error('Second argument should not be null!');
    }
    if (!Number.isInteger(fromIndex)) {
        throw new Error('Third argument should be an integer!');
    }
    if (fromIndex < 0) {
        throw new Error('FromIndex should be > 0!');
    }

    for (let i = fromIndex; i < collection.length; i++) {
        if (value === collection[i]) {
            return true;
        }
    }
    return false;
}

module.exports = includes;