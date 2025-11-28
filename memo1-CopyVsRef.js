// For number, string, boolean..., = means COPY.
let i = 10;
let p = i;
console.log("before: i = ", i, " p=", p);
i = 20;
console.log("after: i = ", i, " p=", p);

// For array, object..., = means REFERENCE.
const arr1 = [1, 2, 3];
const arr2 = arr1;
console.log("before: arr1 = ", arr1, " arr2=", arr2);
arr1.push(4);
console.log("after: arr1 = ", arr1, " arr2=", arr2);

// = means SHADOW copy.
const obj1 = { brand: "Toyota" };
const arr3 = [1, obj1];
console.log("before: obj1 = ", obj1, " arr3=", arr3[0], arr3[1]);
obj1.color = "white";
console.log("after: obj1 = ", obj1, " arr3=", arr3[0], arr3[1]);

// Flip a linked list in js
const node = { value: 1, next: null };
let curr = node;
while (curr.value < 5) {
  curr.next = { value: curr.value + 1, next: null };
  curr = curr.next;
}
curr = node;
while (curr.next) {
  console.log(curr.value);
  curr = curr.next;
}

const flipLinkedList = (node) => {
  let prev = null;
  let curr = node;

  while (curr.next) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
};
