# TinyUI Framework Plan

## Next feature: reactive component renderer

### Goal
Build the first TinyUI framework feature: a minimal reactive renderer that can mount a component tree and update the DOM when state changes.

### Why this next
This app already has a simple todo list. The next step is to separate behavior from the DOM and create a simple framework layer that can:
- render JSX-like or template-based UI
- update only changed nodes
- keep state and UI in sync

### What we will build
1. `src/core/render.ts`
   - a `render()` function that mounts a component or element tree into a DOM container.
   - supports plain HTML tags and simple component functions.
   - handles initial DOM creation and replacements.

2. `src/core/reactive.ts`
   - a tiny reactive store: `reactive()` or `useState()`.
   - tracks state and notifies render when data changes.

3. `src/core/h.ts`
   - a helper to create virtual DOM nodes or element descriptors.
   - interface: `h(tag, props, ...children)`.

4. `src/main.ts`
   - replace manual DOM list rendering with a `TodoApp` component.
   - use `render()` to mount the app.
   - use `useState()` or `reactive()` for list state.

5. `src/components/TodoApp.ts`
   - a component that renders the todo input, list, filters, and item controls.
   - uses reactive state and event callbacks.

### What to change in source files
- `src/main.ts`
  - move page bootstrap logic into component rendering.
  - keep app initialization, but replace direct `ListTemplate` rendering with framework rendering.

- `src/templates/ListTemplate.ts`
  - eventually convert this to framework-based components or remove it.
  - for now, keep it as a fallback if you want to compare native DOM rendering vs TinyUI.

- `src/model/FullList.ts` and `src/model/ListItem.ts`
  - keep storage and model classes, but make them compatible with reactive state if needed.
  - you can also add a `toJSON()` helper for persistence.

- `src/css/style.css`
  - keep current styles and add new classes for component layout if needed.

### Milestones
1. create the core renderer and reactive module
2. create component helpers and TodoApp component
3. wire the app through `src/main.ts`
4. test the todo list and filter UI in the new framework
5. refactor old `ListTemplate.ts` into framework components or remove it

### How to start
1. create `src/core/render.ts`
2. create `src/core/reactive.ts`
3. create `src/core/h.ts`
4. create `src/components/TodoApp.ts`
5. update `src/main.ts`

### Why this helps
This will turn your todo list into a real framework project:
- `TinyUI` becomes the renderer and state layer
- the app becomes a set of components
- future features like directives, lifecycle, and routing can build on this core
