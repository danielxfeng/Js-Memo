# Copy or Pointer/Reference, Mutable or Immutable

### `=` means `Copy` in case of `number`, `string`, `boolean`, etc

```javascript
let i = 10;
let p = i;
console.log("before: i = ", i, " p=", p);
i = 20;
console.log("after: i = ", i, " p=", p);
```

```
before: i =  10  p= 10
after: i =  20  p= 10
```

And, we can not do this because the value is `immutable`.

```javascript
const i = 10;
i = 20; // not allowed
```

### `=` means `Reference` in case of `array`, `object`, etc

```javascript
const arr1 = [1, 2, 3];
const arr2 = arr1;
console.log("before: arr1 = ", arr1, " arr2=", arr2);
arr1.push(4);
console.log("after: arr1 = ", arr1, " arr2=", arr2);
```

```
before: arr1 =  [ 1, 2, 3 ]  arr2= [ 1, 2, 3 ]
after: arr1 =  [ 1, 2, 3, 4 ]  arr2= [ 1, 2, 3, 4 ]
```

Look, we still can modify it even if it is a `const`, though this is not allowed.

```javascript
const arr1 = [1, 2, 3];
arr1 = [2]; // not allowed.
```

### Because of this, sometimes it doesnot work as what we want

```
const obj1 = { brand: 'Toyota'};
const arr3 = [1, obj1]; // it's not a COPY, or it's just a SHADOW copy.
console.log("before: obj1 = ", obj1, " arr3=", arr3[0], arr3[1]);
obj1.color = "white"
console.log("after: obj1 = ", obj1, " arr3=", arr3[0], arr3[1]);
```

```
before: obj1 =  { brand: 'Toyota' }  arr3= 1 { brand: 'Toyota' }
after: obj1 =  { brand: 'Toyota', color: 'white' }  arr3= 1 { brand: 'Toyota', color: 'white' }
```

### In this case, we can no longer flip a linked list like this:

```c
void flip_linked_list(s_node** root)
{
    s_node* prev = NULL;
    while (*root)
    {
        s_node* next = (*root)->next;
        (*root)->next = prev;
        prev = *root;
        *root = next;
    }
    *root = prev;
}
```

I need 3 variables to solve with JS:
```javascript
const flipLinkedList = (node) => {
  let prev = null;
  let curr = node;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
};
```
