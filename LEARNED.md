# Learned Concepts

<!--
Add one entry per concept genuinely encountered and understood while working
on this project — never pre-populate ahead of when the learner actually hits
something. Append entries at the bottom in the order they were learned.

Entry format:

## <Concept Name>

<1-3 sentences: what it means, in plain terms>

**Why useful:** <the concrete reason it matters, ideally tied to this project>

```<language>
<a small, real example — from this project if possible>
```

**Gotcha:** <a real mistake, misconception, or edge case actually hit while
learning this — not a generic textbook caveat>

Link related entries with [[concept-slug]] once the file has enough entries
that connections are worth drawing.
-->

## The call stack blocks — synchronous code freezes everything

JavaScript runs on a single thread with one call stack: only one function executes at a time, and nothing else — including responding to clicks or repainting the page — happens until the stack is empty. Events (like a click) that occur while the stack is busy don't get dropped; they queue up and wait for their handler to run once the stack clears.

**Why useful:** This is the entire reason asynchronous JavaScript (Promises, `async`/`await`) exists — a network request has an unpredictable delay, and if `fetch` blocked the call stack the way a `for` loop does, the whole page would freeze every time you made a request.

```javascript
const but2 = document.querySelector("#button2");
but2.addEventListener("click", infiniteLoop);
function infiniteLoop() {
  for (let i = 0; i < 2000000000; i++);
}
```

Clicking a *different* button while `infiniteLoop` runs does register the click — it just sits queued until the loop finishes and the stack empties.

**Gotcha:** Writing `for (i = 0; ...)` without `let`/`const` creates an implicit global variable instead of throwing an error — it silently "works" but leaks `i` into global scope, which is easy to miss since nothing complains.

## Promises and `.then()` chaining with `fetch()`

`fetch(url)` returns a Promise immediately, before the real response arrives. That Promise has three states — pending, fulfilled, rejected — and `.then(callback)` runs once it's fulfilled, receiving the resolved value. `.catch(callback)` runs if it rejects.

**Why useful:** It lets code react to something that finishes later without freezing the page while waiting (see [[the call stack blocks — synchronous code freezes everything]]).

```javascript
fetch("https://api.adviceslip.com/advice")
  .then((response) => response.json())   // response.json() is ALSO async
  .then((data) => {
    const advice = data.slip.advice;
    p_el.textContent = advice;
  })
  .catch((error) => console.log(error));
```

**Gotcha:** The first `.then()` does *not* receive the actual JSON data — it receives the raw `Response` object. `response.json()` is itself an asynchronous operation (it has to read and parse the body), so it returns its own Promise, which is why a *second* `.then()` is needed to actually get `data.slip.advice`. It's easy to assume the first `.then()` already has the usable data.

## `fetch()` doesn't reject on HTTP error statuses — check `response.ok`

`fetch()`'s Promise only rejects on a genuine network-level failure (DNS failure, no connection, CORS block). A 404 or 500 response is still a "successful" fetch as far as the Promise is concerned — the server *did* respond, just with an error status. `response.ok` (true only for 2xx statuses) is how you detect that yourself and react to it.

**Why useful:** Without this check, a broken API endpoint or bad request would silently render `undefined`/garbage into the UI instead of showing an error, because `.catch()`/`try`-`catch` alone never fires for a 404.

```javascript
const response = await fetch("https://api.adviceslip.com/advice");
if (!response.ok) {
  throw new Error("Bad Response from Server");
}
const data = await response.json();
```

**Gotcha:** Verified this by deliberately typo-ing the URL path (`/advice` → `/advicee`) on the real API — it did *not* trigger a network-level rejection; it came back as a normal (non-2xx) response, and only the manual `response.ok` check caught it, landing in `catch` with the custom thrown error rather than some generic fetch error.

## `finally` — code that runs whether `try` succeeds or `catch` fires

A `finally` block attached to `try`/`catch` always runs after either path completes, regardless of whether the code succeeded or threw. It's the right place for cleanup that must happen either way.

**Why useful:** Re-enabling a disabled button after a request needs to happen whether the request succeeded or failed — without `finally`, that line has to be duplicated in both the success path and the `catch` block.

```javascript
async function getAdvice() {
  try {
    but1.disabled = true;
    const response = await fetch(url);
    // ...
  } catch (error) {
    p_el.textContent = error.message;
  } finally {
    but1.disabled = false;
  }
}
```

**Gotcha:** Before using `finally`, `but1.disabled = false` was written twice — once at the end of `try`, once in `catch` — which is exactly the duplication `finally` exists to remove.
