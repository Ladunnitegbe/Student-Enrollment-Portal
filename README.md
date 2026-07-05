# KodeCamp 6.0 — Stage 5: Styling, Hooks & Context API

An upgrade of the Stage 4 Student Enrollment Portal. The routing, roster
fetch, and enrollment flow from Stage 4 all still work — this stage adds
professional styling (one distinct method per component), a theme system,
global state via Context + `useReducer`, memoization, and two custom hooks.

---

## Tech Stack

- React 18 + Vite
- React Router DOM v6
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Styled-Components
- Material UI (MUI) + Emotion
- CSS Modules
- [RandomUser API](https://randomuser.me/api/?results=6&nat=us,gb) for roster data

---

## Project Structure

```
src/
├── App.jsx                    ← Routes only — no more roster state here
├── App.css                    ← Shared classes for non-demo components
├── index.css                  ← Tailwind entry + theme CSS variables
├── main.jsx                   ← BrowserRouter + StudentProvider wrap <App />
├── context/
│   └── StudentContext.jsx     ← useReducer store + useStudents() hook
├── hooks/
│   ├── useFetch.js            ← generic fetch-on-mount hook
│   └── useLocalStorage.js     ← useState that persists to localStorage
├── styles/
│   ├── theme.js                ← color + spacing tokens
│   └── StudentCard.module.css  ← CSS Modules for StudentCard
├── components/
│   ├── Navbar.jsx              ← Tailwind CSS
│   ├── Header.jsx              ← Styled-Components
│   ├── StudentCard.jsx         ← CSS Modules
│   ├── EnrollForm.jsx          ← Material UI
│   ├── Badge.jsx, StatBar.jsx, Button.jsx, ClassButton.jsx,
│   │   StatusMessage.jsx, StudentList.jsx   ← shared App.css classes
└── pages/
    ├── HomePage.jsx             → /            (the "roster page")
    ├── StudentDetailPage.jsx    → /students/:id (Plain/External CSS)
    ├── StudentDetailPage.css
    ├── EnrollPage.jsx           → /enroll
    └── NotFoundPage.jsx         → *            (Inline styles)
```

---

## Step 1 — Styling Methods (one per component, why)

| Component | Method | Why this one |
|---|---|---|
| `Navbar.jsx` | **Tailwind CSS** | Nav bars are mostly layout + state-driven classes (active link, hamburger open/closed). Tailwind's utility classes let the active/inactive/responsive variants live right next to the markup with no separate stylesheet to keep in sync. |
| `StudentCard.jsx` | **CSS Modules** (`styles/StudentCard.module.css`) | Cards are repeated many times per page, so scoping matters — `.card`, `.body`, `.name` can't leak into or clash with any other component's classes. CSS Modules also let the score-based border color be a data-driven class swap (`.borderGreen` / `.borderYellow` / `.borderRed`) instead of inline calculations. |
| `Header.jsx` | **Styled-Components** | The header is themeable (colors come from `theme.js` via a `ThemeProvider`), and styled-components' `${({ theme }) => theme.colors.primary}` pattern is the most direct way to bind a component's look to a shared JS theme object. |
| `EnrollForm.jsx` | **Material UI** | A form with selects, checkboxes, validation states, and responsive stacking benefits from MUI's built-in accessibility and `Grid`/`TextField`/`Select` components — far less boilerplate than hand-rolling the same behavior. |
| `NotFoundPage.jsx` | **Inline styles** | A single, static, never-reused layout (centered 404 message). It's not worth a CSS file or module for one component that never changes shape — a plain style object keeps everything in one place. |
| `StudentDetailPage.jsx` | **Plain/External CSS** (`StudentDetailPage.css`) | A one-off detail layout (avatar column + info column + table) that's easiest to reason about as a normal stylesheet with plain class names, imported only here. |

Everything else (`Badge`, `StatBar`, `Button`, `ClassButton`, `StatusMessage`,
`StudentList`) keeps using the shared classes in `App.css`, since the brief
only requires the six components above to each demonstrate a **different**
method.

---

## Step 2 — Responsive Design

- **Roster grid** (`StudentList.jsx`): `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5` — 1 column on mobile, 2 on tablet, 3 on desktop.
- **Navbar** (`Navbar.jsx`): links are `hidden md:flex`; below `md` a hamburger button (`☰` / `✕`) toggles a stacked mobile menu.
- **EnrollForm** (`EnrollForm.jsx`): every MUI `Grid` item uses `size={{ xs: 12, md: 6 }}` (or `size={12}` for full-width fields), so the form stacks to one column on mobile and pairs up on `md` and above.

---

## Step 3 — Theme Support

`src/styles/theme.js` exports `colors` (primary, secondary, danger, success,
warning, background, surface, text, textMuted) and `spacing` tokens
(xs → xl). It's consumed two ways so every styling method can share one
palette:

1. **Styled-Components** — `Header.jsx` wraps its markup in a
   `<ThemeProvider theme={theme}>` and reads `theme.colors.primary` /
   `theme.colors.text` directly inside its `styled.*` templates.
2. **CSS variables** — the same values are duplicated as `--color-primary`,
   `--color-text`, etc. in `index.css`, so plain CSS, CSS Modules, and
   Tailwind (via `bg-[var(--color-primary)]`-style arbitrary values) can
   all reference the identical colors without importing a JS file.

---

## Step 4 — Context API (replacing prop drilling)

**Before (Stage 4):** `App.jsx` held `students`, `loading`, `error` in
`useState`, fetched data in a `useEffect`, and passed `students` /
`onEnroll` down through `Navbar`, `HomePage` → `StudentList` → `StudentCard`,
`EnrollPage` → `EnrollForm`, and `StudentDetailPage` as props — a student
enrolled on `/enroll` only reached the roster because `onEnroll` had been
threaded through three separate components.

**After (Stage 5):** `src/context/StudentContext.jsx` holds all of that in
a `useReducer` store (`SET_STUDENTS`, `ADD_STUDENT`, `REMOVE_STUDENT`,
`SET_LOADING`, `SET_ERROR`). `<StudentProvider>` wraps `<App />` in
`main.jsx`, and every component that needs roster data calls the
`useStudents()` custom hook directly — `Header`, `HomePage`, `EnrollForm`,
and `StudentDetailPage` no longer receive `students`/`onEnroll` as props at
all. No component calls `useContext(StudentContext)` directly; they all go
through `useStudents()`.

---

## Step 5 — useMemo & useCallback

Both live in `HomePage.jsx` (the roster page):

- **`averageScore`** — `useMemo(() => getAverage(students), [students])`.
  Depends only on `students`, so typing in the filter box (which doesn't
  change the roster) never re-triggers it. A `console.log` inside proves it.
- **`filteredStudents`** — `useMemo(() => …, [students, filter])`. Filters
  by name/track and attaches each student's letter grade; recalculates only
  when the roster or the filter text changes.
- **`handleEnroll`** — `useCallback((student) => dispatch(...), [dispatch])`.
  Since `dispatch` from `useReducer` is a stable reference, this callback
  keeps the same identity across re-renders instead of being recreated
  every time `HomePage` renders.

---

## Step 6 — Custom Hooks

- **`useFetch(url)`** (`src/hooks/useFetch.js`) — fetches on mount, returns
  `{ data, loading, error, refetch }`. `HomePage.jsx` uses it against the
  RandomUser API instead of the raw `useEffect` + `fetch` that used to live
  in `App.jsx`, then dispatches the result into `StudentContext`.
- **`useLocalStorage(key, initialValue)`** (`src/hooks/useLocalStorage.js`)
  — behaves like `useState` but reads/writes to `localStorage`. `HomePage.jsx`
  uses it to persist the roster filter text (`studentFilter`) so it survives
  a page refresh.

---

## Step 7 — useRef: Focus & Scroll

- **Auto-focus:** `EnrollForm.jsx` holds a `useRef` on the First Name
  `TextField` and focuses it in a `useEffect` that runs once on mount.
- **Scroll to top:** `HomePage.jsx` holds a `useRef` on a sentinel `<div>`
  at the very top of the roster page and calls `scrollIntoView` in a
  mount-time `useEffect` — so navigating back from `/enroll` after a
  successful enrollment lands the user at the top of the roster.

---

## Routing (unchanged from Stage 4)

| Route | Component | Description |
|---|---|---|
| `/` | `HomePage` | Roster grid, filter box, refresh + quick-add buttons |
| `/students/:id` | `StudentDetailPage` | Full profile for one student, with a Remove button |
| `/enroll` | `EnrollPage` | Enroll form; redirects to `/` on success |
| `*` | `NotFoundPage` | Friendly 404 catch-all |

---

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
