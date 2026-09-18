// Program to demonstrate Promise

function checkNumber(num) {
    return new Promise((resolve, reject) => {
        if (num < 0) {
            reject("Number is negative!");
        } else {
            setTimeout(() => {
                resolve("Success! Number is valid.");
            }, 2000);
        }
    });
}

checkNumber(10)
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.log(error);
    });