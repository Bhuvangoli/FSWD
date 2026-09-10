function secondSmallestLargest(arr) {
    let unique = [...new Set(arr)];

    unique.sort(function(a, b) {
        return a - b;
    });

    let secondSmallest = unique[1];
    let secondLargest = unique[unique.length - 2];

    console.log("Second Smallest:", secondSmallest);
    console.log("Second Largest:", secondLargest);
}

secondSmallestLargest([10, 5, 8, 20, 15]);