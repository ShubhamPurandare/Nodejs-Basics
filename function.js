var _ = require("lodash");

function square(n) {
  return n * n;
}
 
console.log(_.map([4, 8], square));
// => [16, 64]

