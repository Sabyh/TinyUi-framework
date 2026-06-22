// @ts-ignore
import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'
import NoteList from './model/NoteList'
import NoteItem from './model/NoteItem'
import NoteTemplate from './templates/NoteTemplate'
import { setupCounter } from './counter';

const initApp = (): void => {
  const fullList = FullList.instance
  const template = ListTemplate.instance
  const noteList = NoteList.instance
  const noteTemplate = NoteTemplate.instance
  let currentFilter: 'all' | 'active' | 'completed' = 'all'

  const itemCount = document.getElementById("itemCount") as HTMLElement
  const showAll = document.getElementById("showAll") as HTMLButtonElement
  const showActive = document.getElementById("showActive") as HTMLButtonElement
  const showCompleted = document.getElementById("showCompleted") as HTMLButtonElement
  const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement
  const clearItems = document.getElementById("clearItemsButton") as HTMLButtonElement
  const noteEntryForm = document.getElementById("noteEntryForm") as HTMLFormElement

  console.log('initApp started')

  const renderList = (): void => {
    console.log('renderList', { currentFilter, totalItems: fullList.list.length })
    template.render(fullList, currentFilter)
    updateItemCount()
  }

  const renderNotes = (): void => {
    console.log('renderNotes', { totalNotes: noteList.list.length })
    noteTemplate.render(noteList)
  }

  const updateItemCount = (): void => {
    const totalItems = fullList.list.length
    itemCount.textContent = `${totalItems} items`
  }

  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault()

    const input = document.getElementById("newItem") as HTMLInputElement
    const newEntryText: string = input.value.trim()
    if (!newEntryText.length) return

    console.log('submit add item', { newEntryText })

    const itemId: number = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1

    const newItem = new ListItem(itemId.toString(), newEntryText)
    fullList.addItem(newItem)
    renderList()
  })

  clearItems.addEventListener('click', (): void => {
    fullList.clearList()
    renderList()
  })

  noteEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault()

    const titleInput = document.getElementById("newNoteTitle") as HTMLInputElement
    const bodyInput = document.getElementById("newNoteBody") as HTMLTextAreaElement
    const noteTitle: string = titleInput.value.trim()
    const noteBody: string = bodyInput.value.trim()
    
    if (!noteTitle.length && !noteBody.length) return

    console.log('submit add note', { noteTitle, noteBody })

    const noteId: number = noteList.list.length
      ? parseInt(noteList.list[noteList.list.length - 1].id) + 1
      : 1

    const updatedAt = new Date().toLocaleString()
    const newNote = new NoteItem(noteId.toString(), noteTitle, noteBody, updatedAt)
    noteList.push(newNote)
    
    // Clear form
    titleInput.value = ''
    bodyInput.value = ''
    
    renderNotes()
  })

  showAll.addEventListener("click", () => {
    currentFilter = 'all'
    renderList()
  })

  showActive.addEventListener("click", () => {
    currentFilter = 'active'
    renderList()
  })

  showCompleted.addEventListener("click", () => {
    currentFilter = 'completed'
    renderList()
  })

  fullList.load()
  renderList()

  noteList.load()
  renderNotes()

  // Example usage of setupCounter
  const counterButton: HTMLButtonElement | null = document.getElementById("counterButton") as HTMLButtonElement
  if (counterButton) {
    setupCounter(counterButton)
  }
  else{
    console.warn('Counter button not found in the DOM')
  }
}


document.addEventListener("DOMContentLoaded", initApp) 