const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.question("Enter your mobile number: ", (mobile) => {

    let pattern = /^[6-9][0-9]{9}$/;

    if (pattern.test(mobile)) {
        console.log("Valid mobile number");
    } else {
        console.log("Invalid mobile number");
    }

    rl.close();
});