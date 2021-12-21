// Write a function that searches for an object by a specific key value in an array of objects:
// var fruits = [
//     {id: 1, name: 'Banana', color: 'Yellow'},
//     {id: 2, name: 'Apple', color: 'Red'}
// ]

// searchByName(fruits, 'apple');
// Should return: {id: 2, name: 'Apple', color: 'Red'}

// Also try searchByKey(fruits, 'name', 'apple');

var fruits = [
  { id: 1, name: "Banana", color: "Yellow" },
  { id: 2, name: "Apple", color: "Red" },
];

//----------------------Long Form------------------
// function searchByName(arr, name) {
//   let newArr = arr.filter((c, index) => {
//     let cname = c.name;
//     if (cname.toLowerCase() == name.toLowerCase()) {
//       return true;
//     } else {
//       return false;
//     }
//   });
//   return newArr;
// }

function searchByName(arr, name) {
  let newArr = arr.filter((c) => c.name.toLowerCase() == name.toLowerCase());
  return newArr;
}

console.log(searchByName(fruits, "apple"));
