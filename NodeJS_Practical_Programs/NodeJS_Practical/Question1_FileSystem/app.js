const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "sample.txt");

// Create a sample file so the program runs without any manual preparation.
fs.writeFileSync(filePath, "Hello! This is a sample text file.\nNode.js File System module demo.");

// 1. Synchronous (blocking) read
console.log("\n--- Synchronous read ---");
console.log("1. Before synchronous read");

try {
  const data = fs.readFileSync(filePath, "utf8");
  console.log("2. Synchronous file content:");
  console.log(data);
} catch (error) {
  console.error("Synchronous read failed:", error.message);
}

console.log("3. After synchronous read");

// 2. Asynchronous (non-blocking) read
console.log("\n--- Asynchronous read ---");
console.log("4. Before asynchronous read");

fs.readFile(filePath, "utf8", (error, data) => {
  if (error) {
    console.error("Asynchronous read failed:", error.message);
    return;
  }

  console.log("6. Asynchronous file content:");
  console.log(data);
  console.log("7. Inside asynchronous callback");
});

console.log("5. Immediately after starting asynchronous read");
console.log("The program can continue while the asynchronous read is in progress.");
