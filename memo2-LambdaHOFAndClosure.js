// They are almost same.
function sum(a, b) {
  return a + b;
}
const sumLambda = (a, b) => {
  return a + b;
}; // Lambda function.

(() => {console.log("We defined a lambda func, then called it.")})();
