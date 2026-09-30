# TutorDesk frontend

React + Vite + Tailwind. See `../docs/PRD.md` at the repo root for the full
product plan this is built against.

## Backend / WhatsApp integration

This frontend expects a Django backend and doesn't fake one — see
`src/lib/api.js` for the exact endpoint contract (auth, students, classes)
and `src/lib/auth.js` / `src/context/AuthContext.jsx` for how the session
token is stored and attached to requests. Nothing under `/portal` is
reachable until that backend exists and `/api/auth/login/` actually
succeeds — that's deliberate, not a bug.

Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to wherever the
Django backend is running. `VITE_SKIP_AUTH=true` is a local-only escape
hatch to walk the portal screens before auth is wired up on the backend —
never set it outside your own machine.

The Add Student form (`src/pages/Generated/AddEditStudentDesktop.jsx`) is
the seam that matters most: submitting it is what's meant to trigger the
parent's WhatsApp onboarding on the backend/WhatsApp side.

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
