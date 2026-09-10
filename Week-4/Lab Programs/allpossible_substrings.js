function substrings(str) {
    let result = [];

    for (let i = 0; i < str.length; i++) {
        for (let j = i + 1; j <= str.length; j++) {
            result.push(str.substring(i, j));
        }
    }

    console.log(result.join(", "));
}

substrings("hello");