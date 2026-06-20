# KodeCamp 6.0 — Stage 4: Student Enrollment Portal with Routing

An extension of the Stage 3 Student Enrollment Portal, now with full client-side routing via **React Router v6**.


# KodeCamp 6.0 — Stage 3: Student Enrollment Portal

A React app that fetches a student roster from an external API and lets you enroll new students via a form demonstrating both **controlled** and **uncontrolled** input patterns.

---

## Tech Stack

- React 18 + Vite
- React Router DOM v6
- Plain CSS (no framework)
- [RandomUser API](https://randomuser.me/api/?results=6&nat=us,gb) for roster data

---

## Project Structure

```
src/
├── App.jsx               ← Routes + lifted roster state
├── App.css               ← All styles
├── main.jsx              ← BrowserRouter wraps <App />
├── components/
│   ├── Navbar.jsx        ← NavLink nav, shows on every page
│   ├── Badge.jsx
│   ├── Button.jsx        ← Functional component
│   ├── ClassButton.jsx   ← Class component (refresh button)
│   ├── EnrollForm.jsx    ← Controlled + uncontrolled inputs
│   ├── StatBar.jsx
│   ├── StatusMessage.jsx
│   ├── StudentCard.jsx   ← Name links to /students/:id
│   └── StudentList.jsx
└── pages/
    ├── HomePage.jsx          → /
    ├── StudentDetailPage.jsx → /students/:id
    ├── EnrollPage.jsx        → /enroll
    └── NotFoundPage.jsx      → * (catch-all 404)
```

---

## Routing

| Route | Component | Description |
|---|---|---|
| `/` | `HomePage` | Roster grid + refresh button |
| `/students/:id` | `StudentDetailPage` | Full profile for one student |
| `/enroll` | `EnrollPage` | Enroll form; redirects to `/` on success |
| `*` | `NotFoundPage` | Friendly 404 catch-all |

**Key decisions:**
- `<BrowserRouter>` wraps `<App />` in `main.jsx` — the app never sees a HashRouter.
- `<Navbar />` is rendered **outside** `<Routes>` so it persists across every route.
- Roster state lives in `App.jsx` so a student enrolled on `/enroll` immediately appears on `/` after `useNavigate("/")` fires.
- `<NavLink>` with an `isActive` callback applies `.nav-link--active` on the current route; the `end` prop on the Home link prevents it staying active when on child routes.
- `<Link>` (never `<a href>`) is used for all internal navigation — no full-page reloads.




---

## Component-Based Architecture & the Virtual DOM

**Component-based architecture** means splitting a UI into isolated, reusable pieces — each component owns its own markup, logic, and style. Instead of one giant HTML file, you build small units (`Header`, `StudentCard`, `EnrollForm` and `StatusMessage`) and compose them like LEGO bricks. This makes code easier to read, test, debug and maintain because a change to `StudentCard` only affects cards, nowhere else. These components can be reused across different parts of the application, making development faster and reducing code duplication.

**The Virtual DOM** is React's internal copy of the real DOM, stored in memory as a plain JavaScript object tree. When state changes, React re-renders the component into this virtual tree, diffs it against the previous version (reconciliation), and only patches the *actual* DOM nodes that changed. This avoids expensive full-page repaints and keeps the UI fast even with many updates. Selective updating minimizes expensive DOM operations, improves rendering performance, and provides a smoother user experience, particularly in applications with frequent state changes or large datasets.

---

## API & Loading/Error Handling

**API used:** `https://randomuser.me/api/?results=6&nat=us,gb`

Each user object supplies `name.first`, `name.last`, `email`, `picture.medium`, and `login.uuid` (used as the unique `id`). Each result is assigned a random score (40–100) and a track from the `TRACKS` array by index.

**Loading and Error Handling Strategy:**
- `useState(true)` for `loading` — shows a `<StatusMessage type="loading" />` spinner while the fetch is in flight.
- `try/catch/finally` around the `fetch` call — if the response is not OK (`!response.ok`) an error is thrown and caught; the `error` state is set and `<StatusMessage type="error" />` is shown.
- `finally` always sets `loading` to `false` so the app never stays stuck in a loading state.
- On failure, `SEED_STUDENTS` is still shown — the app never crashes.
- This approach improves resilience, fault tolerance, and overall user experience by ensuring the application continues functioning even when external services are unavailable.

---

## Controlled vs Uncontrolled Forms

| | Controlled | Uncontrolled |
|---|---|---|
| **Value stored in** | React state (`useState`) | The DOM itself |
| **How to read value** | From state variable | Via `ref.current.value` |
| **React directive** | `value` + `onChange` | `defaultValue` + `ref` |
| **Live reactivity** | Yes — every keystroke updates state | No — React doesn't know until you read the ref |
| **Best for** | Live validation, preview text, dependent fields | Simple one-off reads (e.g. a file input, a one-time form) |

**In this app:**
- `firstName`, `lastName`, `track`, and `score` are **controlled** — they power the live "Preview:" line that updates as you type, proving React owns these values.
- `email` and the `isActive` checkbox are **uncontrolled** — their values are read from `emailRef.current.value` and `isActiveRef.current.checked` only at submit time.

By combining both controlled and uncontrolled inputs, the application demonstrates practical use cases for each pattern while balancing responsiveness and simplicity.

---

## Getting Started

```bash
npm install
npm install react-router-dom
npm run dev
```

---

## Submission

- **GitHub:** _(https://github.com/Ladunnitegbe/Student-Enrollment-Portal.git)_
- **Live:** _(https://student-enrollment-portal-alpha.vercel.app/)_
