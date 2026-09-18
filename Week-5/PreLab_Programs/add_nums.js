function add(a, b, callback) {
    let result = a + b;
    callback(result);
}
function display(result) {
    console.log("Sum:", result);
}
add(10, 20, display);