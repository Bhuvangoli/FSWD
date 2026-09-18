// Program to demonstrate async/await

function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data fetched successfully!");
        }, 3000);
    });
}

async function getData() {
    console.log("Fetching data...");

    const data = await fetchData();

    console.log(data);
}

getData();