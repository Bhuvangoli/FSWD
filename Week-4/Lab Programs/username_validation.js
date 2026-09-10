function validateUsername(username) {
    let pattern = /^[0-9].{8}[A-Za-z]$/;

    if (pattern.test(username)) {
        console.log("Valid Username");
    } else {
        console.log("Invalid Username");
    }
}

validateUsername("1abcdefghi");