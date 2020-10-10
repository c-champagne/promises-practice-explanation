function add (x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function higherOrderFunction(x, y, callback) { // x is a number, and addReference is a function
    return callback(x, y);
}

console.log(higherOrderFunction(5, 5, add)); // Should return 10
//console.log(higherOrderFunction(20, 15, subtract)); // Should return 5



/*
let me = add;
let you = add;
let someoneElse = add;

console.log(me(2, 3));
console.log(you(2, 3));
console.log(someoneElse(2,3));
*/

