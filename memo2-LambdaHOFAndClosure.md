# Lambda functions, High order functions, and Closures

Yup, they’re the most interesting parts of js imo, because I rarely see them used so widely in other languages.

### Lambda functions

In `C++`, we use lambda function in this way:

```C++
auto lower_bound = std::lower_bound(arr.begin(), arr.end(), to_find,
            [](const Obj& a, const Obj& b) { return a.value < b.value });
```

In `JavaScript`, lambda is more common, all the arrow functions are lambda functions.

The 2 examples are almost the same:

```JavaScript
function sum(a, b) { return a + b };
const sumLambda = (a, b) => { return a + b }; // Lambda function.
```

But, be careful of this, it is executed immediately:
```JavaScript
(() => {console.log("We define a lambda func, then call it.")})();
```
```
We define a lambda func, then call it.
```

### High order functions - function as a parameter

We still use `std::lower_bound` as the example.
```C++
auto lower_bound = std::lower_bound(arr.begin(), arr.end(), to_find,
            [](const Obj& a, const Obj& b) {return a.value < b.value});
```

This can be re-written in js like this.

```JavaScript
const lowerBound = lowerBoundFunc(arr, toFind, (a, b) => a.value - b.value);
//or
const comp = (a, b) => a.value - b.value;
const lowerBound2 = lowerBoundFunc(arr, toFind, comp);
```

However, the most common use of HOF in js is to replace the `for` loop.
```JavaScript
const arr = [1, 2, 3, 4, 5];
const filtered = arr.filter(n => n > 2); // [3, 4, 5]
// Or
const added = arr.map(n => n + 3); // [4, 5, 6, 7, 8]
```

`n => n + 3` is a lambda function, that equals `function plus3 (n) { return n + 3; }`

Yup, and this:
```JavaScript
const arr = [1, 2, 3, 4, 5]
const sum = arr.reduce((total, n) => total + n ); // 15.
```

But, be careful of `Mutable` and `Immutable`:
```JavaScript
const obj1 = { value: 1 };
const obj2 = { value: 3 };
const comp = (a, b) => { a.value += 1; return a.value - b.value };
const lowerBound2 = lowerBoundFunc(arr, toFind, comp);
console.log(obj1, obj2); // obj1 is modified.
```
```
obj1: { value: 2 }, obj2: { value: 3}
```

### High order functions - function as a return value

It becomes very abstract
```JavaScript
const multiply = (a) => {
  return (b) => a * b;
};

const double = multiply(2);
const triple = multiply(3);

console.log(double(10)); // We got 20
console.log(triple(10)); // We got 30
```

### And it can become a very danger but powerful toy - Closure
```JavaScript
const funcA = () => {
  let a = 2;

  const getA = () => a;
  const setA = (v) => a = v;

  return { getA, setA };
}
```
We defined a `class` without using `class`.

### The big boss, let's solve this ONLY with `Pencil and Paper`:

```JavaScript
function horse(mask) {
  let horse = mask;
  function mask(horse) {
    return horse;
  } 
  return horse(mask);
}
const mask = (horse) => horse(2);
horse(mask);
```
This is not from me, it's my favorite exercise from [CS61A](https://cs61a.org/) at UC Berkeley.
The original version is in Python; this js version was rewritten by me (and reviewed by chatgpt 😅).
