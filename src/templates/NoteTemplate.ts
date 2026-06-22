import NoteList from "../model/NoteList";
import NoteItem from "../model/NoteItem";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: NoteList): void,
}

export default class NoteTemplate implements DOMList {
    
    ul: HTMLUListElement
    fullNotesList: NoteList | null = null;

    static instance: NoteTemplate = new NoteTemplate()
    
    private constructor() {
        this.ul = document.getElementById("noteItems") as HTMLUListElement
    }

    render(notesList: NoteList): void {
        this.fullNotesList = notesList
        this.clear()

        if (notesList.list.length === 0) {
            const empty = document.createElement('li')
            empty.className = 'note-item note-item--empty'
            empty.textContent = 'No notes yet. Add one above.'
            this.ul.appendChild(empty)
            return
        }

        notesList.list.forEach((note: NoteItem) => {
            const li = document.createElement('li')
            li.className = "note-item"

            const title = document.createElement('h3')
            title.className = "note-title"
            title.textContent = note.title?.trim() || "Untitled note"

            const body = document.createElement('p')
            body.className = "note-body"
            body.textContent = note.body || "No content provided."

            const updated = document.createElement('span')
            updated.className = "note-updated"
            updated.textContent = note.updatedAt ? `Updated: ${note.updatedAt}` : ""

            li.append(title, body, updated)
            this.ul.appendChild(li)
        })
    }

    clear(): void {
        this.ul.innerHTML = ''
    }
}