export interface Note {
  id: string,
  title: string,
  body: string,
  updatedAt: string,
}


export default class NoteItem implements Note {
  constructor(private _id: string = '', 
    private _title: string = '', 
    private _body: string = '', 
    private _updatedAt: string = '') {}

    static fromJSON(json: string | Record<string, any>): NoteItem {
        const data = typeof json === 'string' ? JSON.parse(json) : json
        return new NoteItem(
            data.id ?? data._id ?? '',
            data.title ?? data._title ?? '',
            data.body ?? data._body ?? '',
            data.updatedAt ?? data._updatedAt ?? ''
        )
    }

    toJSON(): Record<string, string> {
        return {
            id: this._id,
            title: this._title,
            body: this._body,
            updatedAt: this._updatedAt
        }
    }

    get id(): string {
        return this._id
    }

    set id(id: string) {
        this._id = id
    }

    get title(): string {
        return this._title
    }

    set title(title: string) {
        this._title = title
    }

    get body(): string {
        return this._body
    }

    set body(body: string) {
        this._body = body
    }   

    get updatedAt(): string {
        return this._updatedAt
    }

    set updatedAt(updatedAt: string) {
        this._updatedAt = updatedAt
    }

}