console.log("Callback Hell:");

setTimeout(() => {
    console.log("First task");

    setTimeout(() => {
        console.log("Second task");

        setTimeout(() => {
            console.log("Third task");

            runTasks();
        }, 1000);

    }, 1000);
}, 1000);


function task(message) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(message);
            resolve();
        }, 1000);
    });
}

async function runTasks() {
    console.log("\nUsing Async/Await:");

    await task("First task");
    await task("Second task");
    await task("Third task");
}