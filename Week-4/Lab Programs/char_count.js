function countLetters(str) {
    let count = {};

    for (let char of str) {
        if (count[char]) {
            count[char]++;
        } else {
            count[char] = 1;
        }
    }

    for (let char in count) {
        console.log(char + ": " + count[char]);
    }
}

countLetters("programming");