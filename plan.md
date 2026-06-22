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


Great — here are four small, unrelated feature ideas you can add, with the model + template/component names and brief implementation steps. Pick one and I’ll implement it.

1) Theme toggle (light/dark)
- Model: `src/model/Prefs.ts` (stores `{ theme: 'light'|'dark' }`, load/save to localStorage)
- Template/comp: `src/components/ThemeToggle.ts`
- Steps: expose `toggleTheme()` on `Prefs`, render a button that calls it, add `.theme-light` / `.theme-dark` classes to `body`, persist choice.

2) Small Notes panel (mini editor)
- Model: `src/model/Note.ts` (id, title, body, updatedAt) and `src/model/Notes.ts` (array + save/load)
- Template/comp: `src/components/NotesPanel.ts`
- Steps: list notes, add/edit/delete note, persist to localStorage, provide a compact UI panel.

3) Clipboard/snippet manager
- Model: `src/model/Snippet.ts` and `src/model/Snippets.ts`
- Template/comp: `src/components/SnippetManager.ts`
- Steps: add snippet, copy-to-clipboard button, quick-search filter, save to localStorage.

4) Undo/Redo history for UI actions
- Model: `src/model/History.ts` (stack of serialized app states + pointer)
- Template/comp: `src/components/HistoryControls.ts`
- Steps: push state after add/remove/toggle, expose `undo()`/`redo()` methods, wire two buttons to call them and re-render.

Which one do you want me to add now?