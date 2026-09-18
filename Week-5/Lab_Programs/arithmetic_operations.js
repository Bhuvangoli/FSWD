const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculate(a, b, operator, callback) {
    let result;

    if (operator === "+") {
        result = a + b;
    }
    else if (operator === "-") {
        result = a - b;
    }
    else if (operator === "*") {
        result = a * b;
    }
    else if (operator === "/") {
        if (b === 0) {
            result = "Cannot divide by zero";
        } else {
            result = a / b;
        }
    }
    else {
        result = "Invalid operator";
    }

    callback(result);
}

function display(result) {
    console.log("Result:", result);
}

rl.question("Enter first number: ", (input1) => {

    rl.question("Enter second number: ", (input2) => {

        rl.question("Enter operator (+, -, *, /): ", (operator) => {

            let a = Number(input1);
            let b = Number(input2);

            calculate(a, b, operator, display);

            rl.close();
        });
    });
});