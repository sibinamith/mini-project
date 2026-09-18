# Advice Box

A small vanilla JavaScript learning project for practicing asynchronous JavaScript in the browser. It uses the public [Advice Slip API](https://api.adviceslip.com/advice) to fetch and display random advice.

The project is intentionally being built in stages. The current implementation covers the first live API request with Promise chaining; later stages will add `async`/`await`, visible loading and error states, and sequential-versus-parallel requests.

## Current Status

**Stage 1 in progress: Promises and `fetch()` with `.then()`**

Clicking **Get Advice** sends a `GET` request to the Advice Slip API, parses the JSON response, and displays `data.slip.advice` on the page.

The current implementation logs request errors to the browser console. Visible loading and error UI are planned for Stage 3.

## Features

- Fetch one piece of live advice from the Advice Slip API
- Parse a JSON response with `response.json()`
- Display the advice in the page
- Practice Promise states and `.then()`/`.catch()` chaining
- Learn how browser code handles work that finishes later

Planned project features:

- Rewrite the request with `async`/`await` and `try`/`catch`
- Show loading and error states in the UI
- Prevent duplicate clicks while a request is in flight
- Fetch three pieces of advice sequentially and with `Promise.all()`
- Compare the timing and use cases of sequential and parallel requests

## Project Structure

```text
mini-project/
├── index.html                  # Page structure and advice output element
├── main.js                     # Button handler and API request
├── LEARNED.md                  # Concepts understood during the project
├── plan.md                     # Staged learning plan and progress checklist
└── stage-13-async-plan.md      # Original standalone project brief
```

## Technology

- HTML
- JavaScript
- Browser Fetch API
- Advice Slip API
- No framework, build tool, or third-party request library

## Running the Project

This is a static browser project. Open `index.html` in a browser, or serve the `mini-project` directory with any local static file server and open the resulting page.

The browser needs network access to reach:

```text
https://api.adviceslip.com/advice
```

## API Response

The application currently reads the `advice` property from this response shape:

```json
{
  "slip": {
    "id": 123,
    "advice": "Some advice text"
  }
}
```

## Learning Roadmap

1. Project setup and synchronous versus asynchronous execution
2. Promises and `fetch()` with `.then()`
3. `async`/`await` and `try`/`catch`
4. HTTP status codes, `response.ok`, and loading/error UI
5. Sequential versus parallel requests with `Promise.all()`
6. Wrap-up and connection to a future FastAPI backend

See [plan.md](plan.md) for stage objectives and definitions of done. See [LEARNED.md](LEARNED.md) for concepts that have been encountered and verified during implementation.

## Future Direction

> TODO: What should come next for this project after the async JavaScript learning stages are complete?
