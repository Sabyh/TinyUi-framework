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

        notesList.list.forEach((note: NoteItem) => {
            const li = document.createElement('li')
            li.className = "note-item"
            
            const title = document.createElement('span')
            title.className = "note-title"
            title.textContent = note.title || "(untitled)"
            
            const body = document.createElement('span')
            body.className = "note-body"
            body.textContent = note.body
            
            const updated = document.createElement('span')
            updated.className = "note-updated"
            updated.textContent = note.updatedAt
            
            li.append(title, body, updated)
            this.ul.appendChild(li)
        })
    }

    clear(): void {
        this.ul.innerHTML = ''
    }
}