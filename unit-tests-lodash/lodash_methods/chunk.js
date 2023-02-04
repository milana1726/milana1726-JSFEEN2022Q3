const chunk = (array, size = 1) => {
    if (!Array.isArray(array)) {
        throw new TypeError(`First argument should be an array!`);
    }
    if (!array.length) {
        throw new Error('Array is empty!');
    }
    if (Number.isInteger(!size)) {
        throw new Error('Second argument should be an integer!');
    }
    if (size <= 0) {
        throw new Error('Second argument should be > 0!');
    }

    const result = [];

    for (let i = 0; i < array.length; i++) {
        const last = result[result.length - 1];
        if (!last || last.length === size) {
            result[result.length] = [array[i]];
        } else {
            last[last.length] = array[i];
        }
    }
    return result;
}

module.exports = chunk;