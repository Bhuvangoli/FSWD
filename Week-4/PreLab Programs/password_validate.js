function validatePassword(password) {

    let pattern = /^[A-Z](?=.*[0-9]).{7,}$/;

    if (pattern.test(password)) {
        console.log("Valid Password");
    } else {
        console.log("Invalid Password");
    }
}

validatePassword("Password123");