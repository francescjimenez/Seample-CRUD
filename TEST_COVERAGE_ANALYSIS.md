# Test Coverage Analysis

## Current State

### Existing Tests (8 files, client-side only)

| Test File | What It Tests | Assertions |
|-----------|--------------|------------|
| `App.test.js` | App renders without crashing | 1 (DOM render) |
| `home.container.test.js` | Home renders | 1 (shallow length check; snapshot commented out) |
| `users.container.test.js` | Users renders | 1 (shallow length check; snapshot commented out) |
| `usersForm.container.test.js` | UsersForm renders | 1 (snapshot only) |
| `about.container.test.js` | About renders | 1 (shallow length check; snapshot commented out) |
| `notFound.controller.test.js` | PageNotFound renders | 2 (length check + snapshot) |
| `FieldInput.test.js` | FieldInput renders | 2 (length check + snapshot) |
| `SelectInput.test.js` | SelectInput renders | 1 (length check; snapshot commented out) |

**Total assertions across all tests: ~10**

### What the Tests Actually Verify

Every existing test follows the same minimal pattern: shallow-render a component and check that it produces output (`wrapper.length === 1`). Some include snapshot tests, but 4 out of 7 snapshot assertions are **commented out**. No test verifies:

- User interactions (clicks, form input, submissions)
- State changes or side effects
- API calls or data fetching
- Error handling
- Conditional rendering logic
- Navigation/routing behavior

---

## Coverage Gaps — Ranked by Priority

### 1. CRITICAL: Server/Backend Has Zero Tests

The entire Express backend has **no test files at all**. This is the most significant gap. The following modules are completely untested:

#### a. User Controller (`server/routes/api/users/controller.js`)
- 5 async handler functions: `get`, `getOne`, `insert`, `edit`, `delete`
- Each contains database queries, error handling, and HTTP response logic
- The `get` handler has a bug: `new Error({...})` passes an object to `Error()`, which will produce `[object Object]` as the message rather than the intended string
- **Recommended tests:** Unit tests with mocked Mongoose models verifying:
  - Successful CRUD operations return correct status codes and data
  - Missing users trigger error paths
  - Database errors are forwarded via `next()`

#### b. Validation Schemas (`server/routes/api/users/validation.js`)
- Joi schemas for `idValidation` and `userValidation`
- **Recommended tests:** Verify valid payloads pass, invalid payloads are rejected, required fields are enforced

#### c. Error Middleware (`server/middlewares/error.js`)
- 3 middleware functions: `handler`, `converter`, `notFound`
- `converter` has branching logic for `ValidationError` vs generic errors
- `handler` conditionally includes/excludes stack traces based on environment
- **Recommended tests:** Unit tests covering each branch (validation error, generic error, dev vs prod environment)

#### d. API Response Utilities (`server/utils/api-response.js`)
- `ApiError` class and `success()` function with switch/case logic
- **Recommended tests:** Verify each success type (`FETCH`, `UPDATE`, `DELETE`, custom) and error class properties

#### e. User Model (`server/routes/api/users/model.js`)
- Mongoose schema with a custom `roundMinutesHour` getter/setter on `created_at`
- **Recommended tests:** Verify the time-rounding logic produces correct output for edge cases

#### f. Route Definitions (`server/routes/api/users/index.js`)
- Integration tests verifying that routes are wired to the correct controller methods and validation middleware

#### g. Express Server Setup (`server/server.js`)
- Middleware pipeline (CORS, Helmet, DDoS, body-parser, error handling)
- **Recommended tests:** Supertest-based integration tests verifying middleware behavior

---

### 2. HIGH: Client Container Logic Is Untested

The existing container tests only verify that components render. The actual business logic inside them is not tested at all.

#### a. `users.container.js` — Critical logic gaps:
- `useEffect` fetching users via `ApiUsers.getUsers()` — not tested
- `deleteUser()` function with `window.confirm` and API call — not tested
- `editUser()` and `newUser()` navigation — not tested
- `capitalizedFormatter` formatting function — not tested
- `actionFormatter` rendering Delete/Edit buttons — not tested

#### b. `usersForm.container.js` — Critical logic gaps:
- `useEffect` conditional fetch (new vs edit mode) — not tested
- `handleInputChange` state updates — not tested
- `handleSubmit` form submission with API call — not tested
- `handleCancel` navigation — not tested
- Error state display — not tested
- Loading state behavior — not tested
- Distinguishing create vs edit mode (`params.id === 'new'`) — not tested

---

### 3. HIGH: Client API Layer Has Zero Tests

#### a. `apiService.js`
- Axios instance with interceptors, error handling with status-code-based redirects
- `get`, `patch`, `post`, `remove` methods constructing URLs
- **Recommended tests:** Mock axios, verify correct URLs are constructed, verify interceptors handle 401/404/default errors

#### b. `api/users/index.js`
- `getUsers(id)` — conditional URL construction (with/without ID)
- `submitUsers(user)` — conditional PATCH vs POST based on `user._id`
- `deleteUsers(id)` — delegates to `ApiService.remove`
- **Recommended tests:** Mock ApiService, verify correct method calls and URL construction for each code path

---

### 4. MEDIUM: Client Components Missing Behavioral Tests

#### a. Layout Component (`layout.component.js`)
- Conditional rendering: shows `<Loading />` when `loading=true`, shows `children` otherwise
- **Recommended tests:** Verify loading state shows spinner, non-loading state shows children

#### b. Header Component (`header.component.js`)
- Navigation links to `/`, `/users`, `/about`
- **Recommended tests:** Verify NavLink components render with correct `to` props

#### c. Loading Component (`loading.component.js`)
- Simple presentational component
- **Recommended tests:** Verify the spinner renders with correct classes/role

#### d. FieldInput and SelectInput
- Tests exist but only check render — no tests for `onChange` callbacks or prop variations

---

### 5. MEDIUM: No Integration or E2E Tests

- No tests verify that the full client-server flow works end-to-end
- No tests verify that the API routes, validation, controller, and database work together
- **Recommended:** Add supertest-based API integration tests at minimum

---

### 6. LOW: No Test Infrastructure

- **No coverage reporting** — No Jest coverage configuration exists. Add `--coverage` flag and configure thresholds.
- **No server test runner** — The `test` script only runs `test:client`. A `test:server` script using Jest or Mocha is needed.
- **No CI/CD test pipeline** — No configuration for automated test execution.

---

## Summary Table

| Area | Files | Existing Tests | Coverage Level |
|------|-------|---------------|----------------|
| Server Controller | 1 | 0 | **None** |
| Server Validation | 1 | 0 | **None** |
| Server Error Middleware | 1 | 0 | **None** |
| Server API Response Utils | 1 | 0 | **None** |
| Server Model | 1 | 0 | **None** |
| Server Routes | 4 | 0 | **None** |
| Server Config/DB/Socket | 4 | 0 | **None** |
| Client API Service | 2 | 0 | **None** |
| Client Containers (logic) | 6 | 6 | **Render-only** |
| Client Form Components | 2 | 2 | **Render-only** |
| Client Layout/Loading | 3 | 0 | **None** |

---

## Recommended Action Plan

### Phase 1 — Highest Impact
1. **Add server-side unit tests for the User Controller** — This is the core business logic and has zero coverage
2. **Add server-side tests for error middleware** — Multiple code branches handle errors differently
3. **Add tests for API response utilities** — Pure functions, easy to test, used everywhere

### Phase 2 — Business Logic Coverage
4. **Add tests for client API service layer** — Mock axios, test URL construction and error interceptors
5. **Add behavioral tests for `users.container.js`** — Test data fetching, delete confirmation, navigation
6. **Add behavioral tests for `usersForm.container.js`** — Test form submission, validation, create vs edit modes

### Phase 3 — Integration & Infrastructure
7. **Add supertest integration tests for API endpoints** — Verify full request/response cycle
8. **Add validation schema tests** — Verify Joi schemas accept/reject correct payloads
9. **Configure Jest coverage reporting** with thresholds (target: 70%+ line coverage)
10. **Add a `test:server` npm script** and update the `test` script to run both client and server tests
