# TinyUI Framework

> A lightweight frontend rendering and reactive‑state library, built from a simple todo app.



---

## Table of Contents

- [Overview](#overview)
- [Features (today)](#features-today)
- [Run (development & production)](#run-development--production)
- [Why a recent issue happened](#why-a-recent-issue-happened)
- [Roadmap — what to build next](#roadmap--what-to-build-next)
- [Important files](#important-files)
- [Notes & best practices](#notes--best-practices)

---

## Overview

This repository contains a **fully working todo list application** implemented in TypeScript and Vite.  
The app serves as the first step toward building **TinyUI Framework** — a minimal frontend framework that will provide:

- Component rendering
- Reactive state
- Simple directives

The current implementation uses plain DOM manipulation, but the upcoming migration will replace that with a lightweight reactive core.

---

## Features (today)

- ✅ Add, remove and clear todo items  
- ✅ Mark items completed via checkbox  
- ✅ Filter view by `All`, `Active`, and `Completed`  
- ✅ Persist items in `localStorage`

---

## Run (development & production)

```bash
# Install dependencies
npm install

# Start dev server (Vite)
npm run dev

# Type‑check with tsc, then build with Vite
npm run build

# Preview the production build
npm run preview
```

---

## Why a recent issue happened

During development, a **stale compiled JavaScript file** (e.g. `src/templates/listTemplate.js`) was left in the `src/` folder.  
Vite resolves files under `src/` directly, so the dev server sometimes loaded the old `.js` file instead of the updated TypeScript source.

### Fix applied

- Removed stale `.js` files from the `src/` directory.  
- Ensured the app now runs the updated `.ts` source.

> **Tip:** Always keep only source files in `src/` and never commit generated `.js` files there.

---

## Roadmap — what to build next

**Next milestone:** Implement a minimal reactive component renderer.

Planned sub‑tasks:

1. **`src/core/h.ts`** — a tiny `h()` helper to create virtual element descriptors.  
2. **`src/core/reactive.ts`** — `reactive()` or `useState()` for local component state.  
3. **`src/core/render.ts`** — `render()` which mounts a component/tree to a DOM container.  
4. **`src/components/TodoApp.ts`** — re‑implement the todo UI as a TinyUI component using the above.  
5. **Migrate or remove `src/templates/ListTemplate.ts`** after validating the framework behaviour.

**Longer‑term:**

- Add directives, event binding helpers and lifecycle hooks.  
- Add a tiny router for view transitions.  
- Package the core as a small library for reuse.

---

## Important files

| File | Purpose |
|------|---------|
| `src/main.ts` | Application bootstrap and wiring |
| `src/core/*` | Framework core (to be added) |
| `src/components/*` | Framework components (to be added) |
| `src/templates/ListTemplate.ts` | Current DOM‑based renderer (fallback) |
| `src/model/FullList.ts` | Storage and persistence logic |
| `src/css/style.css` | Styles |

---

## Notes & best practices

- **Keep only source files in `src/`** – do not commit generated `.js` files there.  
- If Vite appears to run stale code, check `src/` for leftover compiled artifacts and remove them.  
- Use **TypeScript** strictly – enable `strict: true` in `tsconfig.json`.  
- Prefer **named exports** over default exports for better tree‑shaking.  

---

## What’s next?

If you’d like to contribute or just follow along, the next step is to **scaffold the first core files** (`h`, `reactive`, `render`, `TodoApp`).  
Feel free to open an issue or a pull request!

---

**License:** MIT © TinyUI Contributors
