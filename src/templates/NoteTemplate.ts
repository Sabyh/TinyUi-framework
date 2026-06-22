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

            const header = document.createElement('div')
            header.className = 'note-header'

            const title = document.createElement('h3')
            title.className = "note-title"
            title.textContent = note.title?.trim() || "Untitled note"

            const deleteButton = document.createElement('button')
            deleteButton.type = 'button'
            deleteButton.className = 'button note-delete-button'
            deleteButton.dataset.noteId = note.id
            deleteButton.textContent = '✕'
            deleteButton.title = 'Delete note'
            deleteButton.setAttribute('aria-label', `Delete note ${note.title || 'untitled'}`)


            deleteButton.addEventListener('click', (event: Event) => {
                const target = event.currentTarget as HTMLButtonElement
                const noteId = target.dataset.noteId
                console.log('delete button clicked', { noteId })
                if (!noteId) return
                if (this.fullNotesList) {
                    this.fullNotesList.remove(note.id)
                    this.render(this.fullNotesList)
                }
            })

            header.append(title, deleteButton)

            const body = document.createElement('p')
            body.className = "note-body"
            body.textContent = note.body || "No content provided."

            const updated = document.createElement('span')
            updated.className = "note-updated"
            updated.textContent = note.updatedAt ? `Updated: ${note.updatedAt}` : ""

            li.append(header, body, updated)
            this.ul.appendChild(li)
        })
    }

    clear(): void {
        this.ul.innerHTML = ''
    }
}