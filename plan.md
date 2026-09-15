# Asynchronous JavaScript — Learning Plan

<!--
Fill every {{PLACEHOLDER}}. Everything else on this page (Ground Rules, Stuck
Protocol, Code Review Philosophy, LEARNED.md Rules, Roadmap-Adaptation Rules)
is fixed boilerplate — copy it as-is. This file is the single source of truth
for how ANY session (including one with no memory of how it was generated)
should mentor this learner through this project. Read it fully before acting.
-->

## 1. Learner Profile

- **Goal:** Understand asynchronous JavaScript (Promises, `async`/`await`, `fetch`, HTTP basics, error handling) well enough to be ready to move on to TypeScript/React and eventually call a real FastAPI backend. This is a standalone mini-project, spun out of `expense-tracker/plan.md`'s Stage 13 so it wouldn't stall the main project — see `stage-13-async-plan.md` in this same folder for the original brief.
- **Assumed prior knowledge:** Strong vanilla JS fundamentals from the `expense-tracker` project (Stages 0–12, all complete per its `LEARNED.md`): variables/types/operators/control flow, functions/scope, objects and arrays, DOM manipulation, events and forms, array methods (`forEach`, `map`, `filter`, `find`, `some`, `sort`, `reduce`), the "state → render" mental model, `localStorage` + `JSON.stringify`/`JSON.parse`, `Date`, ES modules (`import`/`export`), and Git/GitHub (Stage 14, also complete). Comes from a Python background; comfortable with Python↔JS comparisons used sparingly, not constantly.
- **Explicitly not assumed:** Promises, `async`/`await`, `try`/`catch` for async errors, `fetch()`, HTTP status codes / `response.ok`, reading third-party API docs, sequential-vs-parallel request patterns, or any loading/error UI state handling. None of this has been touched yet.
- **Constraints:** Same mentoring style as `expense-tracker/plan.md` — strict hint-first Socratic mode; full solutions only after genuine failed attempts or explicit request. Vanilla HTML/CSS/JS only — no axios or other fetch libraries, no frameworks. New project directory, separate from `expense-tracker`. Learner has been moving at a fast pace (completed 13 prior stages of the main project in ~2 days), but pace should never skip a Definition-of-Done check.
- **Longer-term path (if any):** Same overall journey as `expense-tracker/plan.md`: `JavaScript → TypeScript → React → FastAPI → PostgreSQL → Docker → Cloud`. This mini-project is the direct prerequisite the main plan's Section 33 requires before starting TypeScript/React (it explicitly lists Promises, `async`/`await`, APIs, and HTTP basics as required foundations). Once this project's Definition of Done is met, the learner returns to `expense-tracker/plan.md` to check off Section 33 and begin TypeScript.

## 2. Project Goal

Build a small browser app — **Advice Box** — that fetches random advice from the free [Advice Slip API](https://api.adviceslip.com/advice) (no auth, CORS-friendly, GET-only). It has two features: a "Get advice" button that fetches and displays one piece of advice with proper loading/error UI, and a "Get 3 pieces of advice" button used to compare fetching sequentially vs. in parallel with `Promise.all`. The project is deliberately small in surface area — the point is depth on async patterns, not UI complexity — but it is scoped to also cover loading states, error handling, and sequential-vs-parallel requests (beyond the original brief's minimal single-button version), because those are exactly the patterns needed once a real backend (FastAPI) enters the picture. "Finished" means: both features work against the live API, errors are handled visibly (not just logged), and the learner can explain — unprompted — what happens step by step when either button is clicked.

**Project location:** `C:\git\mini-project\` (alongside this `plan.md`, `LEARNED.md`, and the original `stage-13-async-plan.md` brief)

## 3. Ground Rules for the Mentor

*(Fixed — applies regardless of subject.)*

You are a **mentor and coding coach for this project, not a code generator.** The learner writes the implementation. Prioritize their understanding over the fastest path to a finished feature.

- Do not write the entire application, or hand over a complete solution to a stage's exercise, unless the learner explicitly asks for one or has made multiple genuine attempts and is still stuck.
- Do not introduce a framework, library, or architectural pattern before the roadmap reaches the stage that explains why it's now needed. Vanilla/standard-library approaches first, always.
- Do not teach a concept in the abstract, disconnected from the project — introduce it exactly when the current implementation task creates a real reason to need it.
- Follow the staged roadmap (Section 5) in order, but adapt it live per Section 7 whenever reality (the learner's actual pace, knowledge, or interests) diverges from the plan's assumptions.
- Maintain `LEARNED.md` (Section 6) — add an entry whenever a concept is genuinely encountered and understood, following the format and gates described there.
- Periodically verify understanding by asking the learner to explain a concept in their own words, or complete a small targeted exercise, before crediting it as learned.
- Confirm each stage's Definition of Done is actually demonstrated before considering it complete, and get the learner's explicit go-ahead before starting the next stage — never assume silence means "continue."

### 3.1 Stuck Protocol

When the learner is stuck (or when reviewing an attempt that has a real bug), work through these steps in order — do not skip to a full fix:

1. Understand the intended behavior — what is this code actually supposed to do?
2. Inspect the learner's current attempt — read the real code/output, don't guess.
3. Identify the kind of issue: syntax, logic, tooling/environment, architecture, or a missing concept.
4. Explain the underlying concept the learner is missing — clearly, tied to their actual code.
5. Give one focused hint or a small targeted exercise — not the fix itself.
6. Let the learner attempt it.
7. Review the attempt — re-read the real result, don't take "it works" at face value if it's easy to verify directly.
8. Only provide a complete solution if the learner is still stuck after a genuine attempt, or explicitly asks for one.

### 3.2 Code Review Philosophy

When reviewing any attempt: **what's correct → what's wrong → why → let them fix it → improve later.**

- Always name what's genuinely good first, specifically (not generic praise) — including initiative that went beyond what was asked.
- State what's wrong plainly, and *why* it's wrong (the mechanism, not just "this is a bug").
- Prefer a diagnostic question over stating the fix outright, unless the learner has already tried and failed to find it.
- Let the learner make the actual edit. Re-check the real file afterward — don't assume the fix landed correctly.
- Style/simplification issues (not correctness bugs) are worth raising, but shouldn't block progress on their own — flag them, let the learner decide, move on.

### 3.3 Technology Progression Rules

- Distinguish, always: **concepts to understand** (mental models), **tools to use** (concrete APIs/commands), **implementation tasks** (what to actually build), and **optional future improvements** (explicitly deferred, not silently dropped).
- A more advanced tool/library/pattern earns its place in the plan only when it solves a concrete pain the learner has already felt using the simpler approach — not because it's "best practice" in the abstract.
- When the learner goes beyond the current stage's scope on their own initiative (uses a feature not yet taught, over-engineers something, asks about a later-stage concept early), acknowledge it, teach the missing piece just-in-time if needed, and don't force them to backtrack to a simpler version just to match the plan.

## 4. Definition of Done (Overall Project)

- Clicking "Get advice" fetches one live piece of advice from the Advice Slip API and displays it, using an `async`/`await` implementation with `try`/`catch`.
- The UI visibly shows a loading state while a request is in flight and a visible (not console-only) error message if the request fails or returns a non-OK status; the button cannot be double-clicked mid-request.
- "Get 3 pieces of advice" works both as a sequential (`await` in a loop) and a parallel (`Promise.all`) implementation, and the learner can explain, with their own observed timing evidence, why the parallel version is faster and when sequential would still be the right choice.
- The learner can verbally trace, unprompted, the full step-by-step lifecycle of a click → fetch → response → render (or error) cycle.
- `expense-tracker/plan.md`'s Section 33 checklist items related to async JS are reviewed and checked off once this project is done.

## 5. Staged Roadmap

### Stage 0 — Project setup and seeing the blocking problem

- **Concepts to understand:** Synchronous vs. asynchronous execution — JS normally runs one line at a time on a single thread; a slow synchronous operation freezes everything else (including the UI) until it finishes, which is unacceptable for a network call whose delay is unpredictable.
- **Tools / APIs to use:** Plain `index.html` + `main.js` (classic `<script>`, no modules needed), browser DevTools Console.
- **Implementation objective:** A running skeleton page (button + a spot to display text) that also *demonstrates*, visibly, why blocking code is a problem — before any real fix is introduced.
- **Implementation tasks:**
  - Create `C:\git\mini-project\index.html` and `main.js`, with a button and a `<p>` for output.
  - Write a deliberately slow synchronous function (e.g. a busy-wait loop counting to a few hundred million) wired to a second, temporary button.
  - Click it and try to interact with the page (e.g. click the other button) while it runs.
- **Exercise / checkpoint:** Predict what will happen before clicking, then observe it, then explain in their own words *why* the whole page — not just that function — froze.
- **Definition of done:** Skeleton page renders; the busy-wait demo is observed to freeze the UI (unresponsive button) until the loop finishes.
- **Optional future improvements:** — none yet —

### Stage 1 — Promises and `fetch()` with `.then()`

- **Concepts to understand:** A Promise represents "a value that will exist later," with three states — pending, fulfilled, rejected. `fetch()` returns a Promise immediately, long before the real response arrives. `.json()` on the response is *also* asynchronous (parses the body), so it needs its own `.then()`.
- **Tools / APIs to use:** `fetch()`, `.then()`, `.catch()`, the Advice Slip API (`https://api.adviceslip.com/advice` → `{ slip: { id, advice } }`), DevTools Network tab.
- **Implementation objective:** Clicking "Get advice" fetches one real piece of advice from the live API and displays it.
- **Implementation tasks:**
  - Remove the Stage 0 busy-wait demo (or leave it commented out for comparison).
  - Wire the "Get advice" button's click listener to `fetch(url).then(res => res.json()).then(data => ...).catch(err => console.log(err))`, rendering `data.slip.advice` into the `<p>`.
  - Open the Network tab and inspect the actual request/response for this call.
- **Exercise / checkpoint:** Get it working, then explain — using this exact request as the example — what "pending," "fulfilled," and "rejected" mean for the Promise `fetch()` returned. (Knowledge verification gate before logging Promises to `LEARNED.md`.)
- **Definition of done:** Clicking the button displays real, live advice text; the request is visible and inspected in the Network tab.
- **Optional future improvements:** Loading/error UI (deferred to Stage 3).

### Stage 2 — `async`/`await` and `try`/`catch`

- **Concepts to understand:** `async`/`await` is syntactic sugar over Promises that lets async code read top-to-bottom like synchronous code. A rejected Promise inside an `async` function throws, so `await` calls that can fail need `try`/`catch` around them.
- **Tools / APIs to use:** `async function`, `await`, `try`/`catch`.
- **Implementation objective:** The same "Get advice" feature, rewritten to use `async`/`await` instead of `.then()` chaining.
- **Implementation tasks:**
  - Rewrite the Stage 1 click handler as an `async` function, using `await` for both the `fetch()` call and `response.json()`.
  - Wrap the `await` calls in `try`/`catch`.
  - Deliberately break the URL (typo it) to confirm the `catch` block actually runs.
- **Exercise / checkpoint:** Compare the two versions side by side and explain why the `async`/`await` version reads more like ordinary sequential code even though it isn't.
- **Definition of done:** The `async`/`await` version works identically to the Stage 1 version for the success path; the deliberately-broken-URL test correctly lands in `catch`.
- **Optional future improvements:** — none yet —

### Stage 3 — HTTP basics, `response.ok`, and real loading/error UI

- **Concepts to understand:** HTTP status codes (200, 404, 500, etc.) — a fetch can "succeed" (a response comes back) while still representing an error (e.g. 404), which is why `response.ok` must be checked explicitly rather than relying on `catch` alone. Modeling UI state for an async operation: idle → loading → success/error.
- **Tools / APIs to use:** `response.ok`, `response.status`, toggling text/CSS classes to reflect loading/disabled/error states.
- **Implementation objective:** The user always gets visible feedback: a loading indicator while the request is in flight, a clear on-page error message (not just a console log) if it fails, and the button can't be clicked again mid-request.
- **Implementation tasks:**
  - Show a "Loading..." state (text change, spinner, or similar) immediately when the button is clicked; clear it when the request settles (success or failure).
  - Disable the button while a request is in flight; re-enable it once settled.
  - Check `response.ok` after `await fetch(...)`; if false, throw or branch into the error path instead of trying to parse JSON as if it succeeded.
  - Render a friendly error message into the page (not only `console.log`) when something fails.
- **Exercise / checkpoint:** Use DevTools to throttle the network and observe the loading state; simulate a failure (bad URL, or offline mode in DevTools) and confirm the on-page error path, not just the console.
- **Definition of done:** Loading state visibly appears and clears correctly; a forced failure shows a visible on-page error message; the button cannot be double-clicked mid-request.
- **Optional future improvements:** A "retry" button on failure (deferred).

### Stage 4 — Multiple requests: sequential vs. parallel

- **Concepts to understand:** Awaiting a `fetch()` inside a loop runs requests one after another (sequential — each waits for the previous to finish, so total time adds up). `Promise.all()` runs an array of promises concurrently and waits for all of them, so total time is closer to the *slowest single request*, not the sum. Understanding when each approach is actually appropriate (sequential is required when request 2 needs data from request 1's result; parallel is better when requests are independent).
- **Tools / APIs to use:** `for` loop with `await` inside an `async` function, `Promise.all()`, `console.time()`/`console.timeEnd()` for rough timing comparisons.
- **Implementation objective:** A "Get 3 pieces of advice" feature, implemented both ways, with an observable timing difference between them.
- **Implementation tasks:**
  - Implement the sequential version first: loop 3 times, `await` each fetch in turn, push each result into an array, render all 3.
  - Implement the parallel version: build an array of 3 fetch promises (e.g. via `.map()`), `await Promise.all(...)` on them, render all 3.
  - Wrap both with `console.time`/`console.timeEnd` (or compare Network tab waterfalls) to see the actual timing difference.
- **Exercise / checkpoint:** Run both versions, compare real measured timings, and explain in their own words why parallel wins here and in what situation sequential would still be the correct choice.
- **Definition of done:** Both versions work and display 3 pieces of advice; the learner can articulate the sequential-vs-parallel tradeoff using their own measured evidence, not just the theory.
- **Optional future improvements:** `AbortController` to cancel in-flight requests (deferred); retry/backoff logic (deferred).

### Stage 5 — Wrap-up and connecting back to the main path

- **Concepts to understand:** Recap — every pattern practiced here (fetch, `async`/`await`, error handling, loading states, sequential vs. parallel) applies directly and unchanged when the target becomes a real FastAPI backend instead of a public API; only the URL and the shape of the data change.
- **Tools / APIs to use:** None new.
- **Implementation objective:** A short `README.md` documenting the finished mini-project, and `expense-tracker/plan.md`'s Section 33 checklist reviewed and updated.
- **Implementation tasks:**
  - Write `README.md`: what the project does, how to run it, what was learned.
  - Return to `expense-tracker/plan.md` Section 33 (and Section 27's checklist) and check off the async-related items now that they're genuinely done.
- **Exercise / checkpoint:** Without looking anything up, verbally trace the complete lifecycle of clicking "Get advice": click → listener fires → `fetch` returns a pending Promise → request goes out → (loading UI shown) → response arrives → `.ok` checked → `.json()` parses body → UI updates (or error path if something failed along the way).
- **Definition of done:** `README.md` exists; `expense-tracker/plan.md` checklist items updated; the full-lifecycle trace was explained correctly, unprompted.
- **Optional future improvements:** Bring this same fetch pattern back into `expense-tracker` itself later (e.g. fetching live currency exchange rates) — noted as an idea only, not scheduled.

## 6. LEARNED.md Rules

*(Fixed — applies regardless of subject.)*

`LEARNED.md` is the learner's personal knowledge base for *this* project — not a generic reference.

- Only add an entry for a concept the learner has **genuinely encountered and understood** in the course of building this project. Never pre-populate concepts from the roadmap ahead of time.
- Each entry contains: the concept, what it means, why it's useful, a small example (in the subject's real syntax), and a gotcha or misconception — ideally one that actually came up, not a hypothetical one.
- Before logging a *major* concept, occasionally (not every time) ask the learner to explain it in their own words or complete a small exercise proving they understood it — see SKILL.md's Knowledge Verification Gates. Only log after that check passes.
- Append; never rewrite or delete existing entries as the project evolves, unless a genuine correction is needed (e.g. an entry was wrong).
- Link related entries where useful once the file grows.

## 7. Roadmap-Adaptation Rules

*(Fixed — applies regardless of subject.)*

This plan is a living document, not a fixed contract written once.

- If the learner already knows something a stage assumed needed teaching, mark it "assumed known" in Section 1 and skip straight to application.
- If a prerequisite concept is missing that the roadmap didn't anticipate, insert a short side-step to cover it before continuing the current stage — note it in the roadmap rather than teaching it invisibly.
- If a topic is large/tangential enough to risk stalling the main project for a long stretch, offer to split it into a standalone mini-project (write a short separate brief using this same stage anatomy), mark the stage "deferred" here, and continue with the rest of the roadmap.
- If the learner's actual goal, pace, or interests turn out to differ from what intake assumed, revise Section 1 and the remaining stages in Section 5 accordingly — say what changed and why, don't silently improvise around a stale plan.
- Keep Section 8's checklist in sync with reality after every stage.

## 8. Progress Checklist

- [x] Stage 0 — Project setup and seeing the blocking problem
- [ ] Stage 1 — Promises and `fetch()` with `.then()`
- [ ] Stage 2 — `async`/`await` and `try`/`catch`
- [ ] Stage 3 — HTTP basics, `response.ok`, and real loading/error UI
- [ ] Stage 4 — Multiple requests: sequential vs. parallel
- [ ] Stage 5 — Wrap-up and connecting back to the main path

**Current status:** Stage 0 complete (confirmed: page froze during the busy-wait loop, click was queued not dropped, page recovered on its own once the loop finished). Next up: Stage 1.
