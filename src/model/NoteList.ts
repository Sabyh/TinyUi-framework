import NoteItem from "./NoteItem";

interface noteList {
    list: NoteItem[],
    push(note: NoteItem): void,
    remove(id: string): void,
    clear(): void,
    save(): void,
    load(): void,
}


export default class NoteList implements noteList {

    list: NoteItem[] = []
    static instance: NoteList = new NoteList()

    push(note: NoteItem): void {
        NoteList.instance.list.push(note)
        NoteList.instance.save()
    }

    remove(id: string): void {
        NoteList.instance.list = NoteList.instance.list.filter(note => note.id !== id)
        NoteList.instance.save()
    }

    clear(): void {
        NoteList.instance.list = []
        NoteList.instance.save()
    }

    save(): void {
        localStorage.setItem("myNotes", JSON.stringify(NoteList.instance.list))
    }

    load(): void {
        const notes = localStorage.getItem("myNotes")
        if (notes) {
            NoteList.instance.list = JSON.parse(notes)
        }
    }

}