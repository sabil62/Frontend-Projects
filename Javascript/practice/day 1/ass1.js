// Write a function to render the following pattern in the console:
// * * * * *
// * * * *
// * * *
// * *
// *
// The function needs to take a number as a parameter which represents how many asterisks are rendered on the first row.

function asterisks(total) {
  let arr = [];
  for (let i = total; i > 0; i--) {
    let ast = "*";
    for (let j = 1; j <= i; j++) {
      ast = ast + "*";
    }
    arr.push(ast);
  }
  return arr;
}

let disp = asterisks(5);
console.log(disp);
