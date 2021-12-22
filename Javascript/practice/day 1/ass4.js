// Write a function that transforms an array of inputs into a new array based on a provided transformation function.
// var numbers = [1, 2, 3, 4];

// function transform(collection, tranFunc) { …TODO }

// var output = transform(numbers, function(num) {
//     return num * 2;
// });
// // output should be [2, 4, 6, 8]

var numbers = [1, 2, 3, 4];

function transform(arr, howmuch) {
  let newArr = arr.map((c) => c ** howmuch);
  return newArr;
}

console.log(transform(numbers, 3));
