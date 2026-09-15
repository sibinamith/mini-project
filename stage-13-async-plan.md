# Stage 13 — Asynchronous JavaScript (deferred to a separate session)

Per plan.md, this stage is a standalone mini-project — separate from `expense-tracker` — practicing async JS before moving toward a backend. Picked up here so nothing from the earlier discussion is lost.

## Setup

New folder alongside `expense-tracker`, e.g. `C:\git\async-playground\`:
- `index.html` — a button + a spot to display text (classic `<script>`, no modules needed)
- `main.js`

Public API to use: **Advice Slip API** — `https://api.adviceslip.com/advice`. Free, no auth, CORS-friendly, GET request, returns JSON shaped like `{ "slip": { "id": 123, "advice": "Some advice text" } }`.

## Concepts to cover, in order

1. **Synchronous vs. asynchronous code** — JS normally runs line by line, blocking; a network request can't work that way (unpredictable delay) without freezing the page, so it runs in the background and reports back later.
2. **Promises** — an object representing "a value that will exist later," with three states: pending / fulfilled / rejected. `fetch()` returns one immediately, before the real response has arrived.
3. **`.then()`/`.catch()` chaining** — the original way to react to a Promise resolving or failing:
   ```javascript
   fetch("https://api.adviceslip.com/advice")
     .then((response) => response.json())   // .json() is ALSO async — parses the body
     .then((data) => console.log(data))
     .catch((error) => console.log(error));
   ```
4. **`async`/`await`** — syntactic sugar over Promises, making async code read top-to-bottom like sync code. Rewrite the `.then()` chain above using `async function` + `await`.
5. **`try`/`catch`** — needed with `await`, since a rejected Promise throws inside an `async` function; wrap the `await` calls to handle network errors gracefully.
6. **JSON** — already familiar from `localStorage` (`JSON.stringify`/`JSON.parse`); now seen in the context of API request/response bodies via `response.json()`.
7. **HTTP basics** — request/response cycle, status codes (200 OK, 404, 500, etc.), checking `response.ok` before trusting the body.
8. **APIs** — what a public API endpoint is, GET requests, reading documentation for a shape you didn't design yourself.

## First exercise (as given, not yet started)

Using the `.then()` chain style first (then immediately rewritten with `async`/`await` for comparison):

1. Add a button (e.g. "Get Advice") and a `<p>` to `index.html`.
2. In `main.js`, click listener → `fetch(...)` → `.then()` chain to parse JSON and pull out `data.slip.advice` → set it as the `<p>`'s text.
3. Add `.catch()` to log any error.
4. Test it, check the Network tab in dev tools to see the actual request/response.
5. Once working, rewrite the same logic as an `async function` with `await` and `try`/`catch`.

## Status

Not started. Pick up from "Setup" above whenever ready, in a separate session/project directory from `expense-tracker`.
