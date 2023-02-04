const find = (collection, predicate, fromIndex = 0) => {
    if (!Array.isArray(collection)) {
        throw new TypeError(`First argument should be an array!`);
    }
    if (!collection.length) {
        throw new Error('Array is empty!');
    }
    if (predicate === null) {
        throw new Error('Second argument should not be null!');
    }
    if (!(typeof predicate === 'function')) {
        throw new Error('Second argument should be a function!');
    }
    if (!Number.isInteger(fromIndex)) {
        throw new Error('Third argument should be an integer!');
    }
    if (fromIndex < 0) {
        throw new Error('FromIndex should be > 0!');
    }

    for (let i = fromIndex; i < collection.length; i++) {
        const value = collection[i];
        if (predicate(value, i, collection)) {
            return value;
        }
    }
}

module.exports = find;