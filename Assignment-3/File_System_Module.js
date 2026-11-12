const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "sample.txt");

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
        filePath,
        "Hello! This is a sample text file.\nNode.js File System Module."
    );
}

console.log("\n--- Synchronous Reading ---");

console.log("1. Before synchronous read");

try {
    const data = fs.readFileSync(filePath, "utf8");

    console.log("2. File Content:");
    console.log(data);

} catch (error) {
    console.log("Error:", error.message);
}

console.log("3. After synchronous read");

console.log("\n--- Asynchronous Reading ---");

console.log("4. Before asynchronous read");

fs.readFile(filePath, "utf8", (error, data) => {

    if (error) {
        console.log("Error:", error.message);
        return;
    }

    console.log("6. Asynchronous File Content:");
    console.log(data);

    console.log("7. Inside asynchronous callback");

});

console.log("5. Immediately after starting asynchronous read");

console.log("Program continues without waiting for file reading.");
