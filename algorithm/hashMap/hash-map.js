const { DoublyLinkList } = require('./dubly-linked-list');


const ARRAY_SIZE = 16;

function hashCodePoints(key) {
    let result = 0;
    for (const character of key) {
        result += character.codePointAt(0);

    }
    return result;
}

function getArrayIndexFromHashCode(hashCode) {
    return hashCode % ARRAY_SIZE;
}

function createArray() {
    return Object.seal(
        new Array(ARRAY_SIZE).fill(undefined)
    )
}

function assertNonEmptyString(key) {
    if (typeof key !== 'string' || key.length === 0) {
        return new TypeError("Key must be a non-empty string.")
    }
}
