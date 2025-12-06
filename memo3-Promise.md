# Promise, Event Loop, and Concurrency

## What is Promise

We have different `concurrency` tools.

In `C`/`C++`, we call `fork` to create a new `process`. A `process` provides the abstraction of a private `virtual computer`, (as described by Prof. Robert Morris, [Operation System Engineering, MIT](https://pdos.csail.mit.edu/6.828/)), since each `process` has its own `pc`, `registers`, `stack` and `heap`.

In `C++`/`Java`, we more commonly use `thread`, which is mostly a lightweight `process` inside a `process`. All `thread`s inside a `process` have their own `stack` but share the `process`’s heap.

In `Go`/`Java`(new), we have `routine`, which are even more lightweight and are no longer scheduled by the `os`. They are super fast because they avoid `user space`/`system call` switching.

All these tools share the similar underlying idea, they are based on `stack`, `heap` and etc....

However in `JavaScript` we have a fully different concept called `event loop`, which is a `concurrency` tool built on a **single** `thread`.

So:

- It provides `concurrency`, but cannot run `in parallel`. Plz note even `processes` may not run `in parallel`. `concurrency !== parallel`.
- However, it is efficient and suited for `io` heavy tasks.
- About how it works, I always like [Greg](https://www.linkedin.com/in/gregorypellechi/)'s example: think about how 1 waiter can serve 10 tables in a restaurant.

## `Sleep`

In `C`, it's very simple to `sleep`, while the story behind `sleep` is very complex.

```c
sleep(10); // We sleep for 10 seconds.
```

```
// The story behind sleep.
When receives the sleep:
1 sets up a hardware timeout.
2 moves the thread to "waiting" queue.
3 switches to other threads.
When receives a interrupt from hardware:
1 moves the thread to "runnable" queue.
2 picks a proper time to switch back to this thread.
```

**`sleep(10)` means sleep at least 10 seconds, not exactly 10 seconds.**
**In fact, implementing `sleep exactly 10s` can be extremely expensive, at least idk how to do that on common os**

In js we use `Promise` like this:

```JavaScript
const timeout = (wait: number): Promise<void> =>
  new Promise<void>((resolve: () => void) => { // resolve is a high order function as call back.
    setTimeout(resolve, wait);
  });

timeout(10);
```

```
// The story behind.
When receives the sleep request:
1 Sets up a timer event.
2 runs other tasks
When timer event is fired:
1 sends the callback function to "task queue".
2 picks a time to run that callback.
```

## `fetch`

Let make things more complicated

```JavaScript
// A mock of fetch implemented with Promise.
const fakeFetch = (request) =>
  new Promise((resolve, reject) => {
    sendRequestToNetworkLayer(request, (response) => {
      if (response.ok) {
        resolve(response); // High-order callback from Promise
      } else {
        reject(new Error("Network error")); // Also a high-order callback
      }
    });
  });

fakeFetch("https://chatgpt.com/give-me-a-joke")
  .then((data) => console.log(data))
  .then(() => console.log("I am B, which one will be executed first"))
  .catch((error) => console.error(error));

console.log("I am A, which one will be executed first");
```

```
// The story behind.
When receives the function call:
1. Sends the http request.
2. Registers an event to wait for the network response.
3. !!Execute the next task: Prints: "I am A, which one will be executed first".
4. Runs other tasks.

When the response event is fired:
1. Pushes the callback into the task queue.
2. Picks a time to run that callback:
  2.1 If ok: prints the data, then "I am B, which one will be executed first"
  2.2 If fails: prints the error ONLY
```

We can use `async`/`await` to make it easy to understand

```JavaScript
// A mock of fetch implemented with Promise.
const fakeFetch = async (request) => {
  const response = await new Promise((resolve, reject) => {
    sendRequestToNetworkLayer(request, (response) => {
      response.ok ? resolve(response) : reject(new Error("error"));
    });
  });

  return response;
};

try {
  const response = await fakeFetch("https://chatgpt.com/give-me-a-joke");
  console.log(response);
  console.log("I am B, which one will be executed first");
} catch (err) {
  console.log(err);
}
console.log("I am A, which one will be executed first");
```

```
They are just different syntax, So the execution order is almost the same as using `.then()`.
EXCEPT: "I am A, which one will be executed first" wil be printed in the end.
```

Be careful of this:

```JavaScript
const response = fakeFetch("https://chatgpt.com/give-me-a-joke");
console.log(response);
console.log("I am B, which one will be executed first");
```

If we don't use `await`, the response is a `Promise` when printing.
And when the response comes, the callbacks are fired, and then be ignored by us.
So it outputs:

```
Promise { <pending> }
I am B, which one will be executed first
```

Play with a real example:

```JavaScript
const f = async () => await fetch('https://google.com');
await f()
console.log('who is executed at first?');
```
