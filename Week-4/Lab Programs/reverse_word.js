function reverseWords(str) {
    let words = str.split(" ");

    let result = words.map(function(word) {
        return word.split("").reverse().join("");
    });

    return result.join(" ");
}

console.log(reverseWords("hello world javascript"));