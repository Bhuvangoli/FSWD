function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (pattern.test(email)) {
        console.log("Valid email address");
    } else {
        console.log("Invalid email address");
    }
}

let email = "student@gmail.com";

validateEmail(email);