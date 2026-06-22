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
        this.list.push(note)
        this.save()
    } 

    remove(id: string): void {
        this.list = this.list.filter(note => note.id !== id)
        this.save()
    }

    clear(): void {
        this.list = []
        this.save()
    }

    save(): void {
        localStorage.setItem("myNotes", JSON.stringify(this.list))
        console.log('NoteList.save', { storedNotes: this.list.length })
    }

    load(): void {
        const notes = localStorage.getItem("myNotes")
        if (notes) {
            try {
                const parsed = JSON.parse(notes)
                this.list = parsed.map((item: any) => {
                    const value = typeof item === 'string' ? JSON.parse(item) : item
                    return NoteItem.fromJSON(value)
                })
            } catch (error) {
                console.warn('NoteList.load failed to parse stored notes', error)
                this.list = []
            }
        }
    }

}