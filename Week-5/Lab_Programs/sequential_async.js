function orderPlaced() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Order Placed");
            resolve();
        }, 1000);
    });
}

function orderShipped() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Order Shipped");
            resolve();
        }, 1000);
    });
}

function orderDelivered() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Order Delivered");
            resolve();
        }, 1000);
    });
}

orderPlaced()
    .then(() => orderShipped())
    .then(() => orderDelivered());