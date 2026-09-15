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
