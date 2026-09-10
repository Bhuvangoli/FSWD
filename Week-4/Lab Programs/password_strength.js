function checkPassword(password) {

    let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&*!]).{8,}$/;

    if (pattern.test(password)) {
        console.log("Strong Password");
    } else {
        console.log("Not a Strong Password");
    }
}

checkPassword("Hello@123");