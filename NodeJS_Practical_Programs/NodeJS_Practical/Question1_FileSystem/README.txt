QUESTION 1 - NODE.JS FILE SYSTEM

Run:
  node app.js

The program creates sample.txt automatically, then reads it in two ways:
1. readFileSync(): synchronous/blocking. The next statement waits until reading finishes.
2. readFile(): asynchronous/non-blocking. Node.js continues to the next statement; the callback runs when reading finishes.

Expected order:
- The synchronous read and its content appear before "After synchronous read".
- "Immediately after starting asynchronous read" appears before the asynchronous callback output.
The exact timing of the callback depends on the system, but it should appear after the immediate log in this example.
