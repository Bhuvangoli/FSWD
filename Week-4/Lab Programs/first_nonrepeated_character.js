function firstNonRepeated(str) {
    let count = {};

    // Count characters
    for (let char of str) {
        if (count[char]) {
            count[char]++;
        } else {
            count[char] = 1;
        }
    }
    for (let char of str) {
        if (count[char] === 1) {
            return char;
        }
    }

    return "No non-repeated character";
}

console.log(firstNonRepeated("abacddbec"));